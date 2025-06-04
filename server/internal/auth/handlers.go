package auth

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"

	"github.com/elltja/finance-tracker/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
	"github.com/markbates/goth/gothic"
)

type RegisterCredentials struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginCredentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type OAuthCredentials struct {
	Name       string `json:"name"`
	Email      string `json:"email"`
	Provider   string `json:"provider"`
	ProviderId string `json:"provider_id"`
}

type AuthHandler struct {
	DB    *sql.DB
	Store *sessions.CookieStore
}

func NewHandler(DB *sql.DB, Store *sessions.CookieStore) *AuthHandler {
	return &AuthHandler{DB: DB, Store: Store}
}

func (h *AuthHandler) RegisterHandler(ctx *gin.Context) {
	var credentials RegisterCredentials

	if err := ctx.ShouldBindJSON(&credentials); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid input data",
		})
		return
	}

	existingUser, err := database.FindUserForAuth(h.DB, credentials.Email)

	if err != nil {
		fmt.Println("Error getting user", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}

	if existingUser != nil {
		ctx.JSON(http.StatusConflict, gin.H{
			"message": "User already exist",
		})
		return
	}

	passwordHash, err := HashPassword(credentials.Password)
	if err != nil {
		fmt.Println("Error hashing password", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}

	newUser := RegisterCredentials{
		Email:    credentials.Email,
		Password: passwordHash,
		Name:     credentials.Name,
	}

	user, err := database.CreateUser(h.DB, newUser)

	if err != nil {
		fmt.Println("Error creating user")
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}

	session, err := h.Store.Get(ctx.Request, CookieSessionKey)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to get session",
		})
		return
	}

	session.Values["user_id"] = user.Id

	if err := session.Save(ctx.Request, ctx.Writer); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Account successfully created",
	})
}

func (h *AuthHandler) LoginHandler(ctx *gin.Context) {
	var credentials LoginCredentials
	if err := ctx.ShouldBindJSON(&credentials); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid input data",
		})
		return
	}

	existingUser, err := database.FindUserForAuth(h.DB, credentials.Email)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}

	if existingUser == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "User does not exist",
		})
		return
	}

	if !existingUser.HashedPassword.Valid {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "User does not have a password",
		})
		return
	}

	if err := ComparePasswords(existingUser.HashedPassword.String, credentials.Password); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid password",
		})
		return
	}

	session, _ := h.Store.Get(ctx.Request, CookieSessionKey)

	session.Values["user_id"] = existingUser.Id

	if err := session.Save(ctx.Request, ctx.Writer); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Successfully logged in",
	})
}

func (h *AuthHandler) OAuthHandler(ctx *gin.Context) {
	provider := ctx.Param("provider")

	q := ctx.Request.URL.Query()
	q.Set("provider", provider)
	ctx.Request.URL.RawQuery = q.Encode()

	gothic.BeginAuthHandler(ctx.Writer, ctx.Request)
}

func (h *AuthHandler) OAuthCallbackHandler(ctx *gin.Context) {
	gothUser, err := gothic.CompleteUserAuth(ctx.Writer, ctx.Request)
	if err != nil {
		fmt.Println("Error: ", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}

	frontEndUrl := os.Getenv("FRONTEND_URL")

	existingUser, err := database.FindUserForAuth(h.DB, gothUser.Email)

	if err != nil {
		fmt.Println("Error getting user", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}
	fmt.Println(gothUser)
	if existingUser == nil {
		name := gothUser.Name
		if name == "" {
			name = gothUser.NickName
		}
		user, err := database.CreateOAuthUser(h.DB, OAuthCredentials{
			Name:       name,
			Email:      gothUser.Email,
			Provider:   gothUser.Provider,
			ProviderId: gothUser.UserID,
		})
		if err != nil {
			fmt.Println("Error creating user", err)
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"message": "Internal server error",
			})
			return
		}
		session, err := h.Store.Get(ctx.Request, CookieSessionKey)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"message": "Failed to get session",
			})
			return
		}
		session.Values["user_id"] = user.Id

		session.Save(ctx.Request, ctx.Writer)
		ctx.Redirect(http.StatusFound, frontEndUrl)
		return
	}

	session, _ := h.Store.Get(ctx.Request, CookieSessionKey)

	session.Values["user_id"] = existingUser.Id

	session.Save(ctx.Request, ctx.Writer)

	fmt.Println("Frontend url: ", frontEndUrl)
	ctx.Redirect(http.StatusFound, frontEndUrl)
}

func (h *AuthHandler) MeHandler(ctx *gin.Context) {
	session, _ := h.Store.Get(ctx.Request, CookieSessionKey)

	userId, ok := session.Values["user_id"].(string)
	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"message": "Unauthorized",
		})
		return
	}

	user, err := database.GetUser(h.DB, userId)

	if err != nil {
		fmt.Println("Error getting user: ", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}
	ctx.JSON(http.StatusOK, user)
}
