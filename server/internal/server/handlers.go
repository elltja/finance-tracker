package server

import (
	"errors"
	"fmt"
	"net/http"
	"os"

	"github.com/elltja/finance-tracker/internal/auth"
	"github.com/elltja/finance-tracker/internal/database"
	"github.com/elltja/finance-tracker/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/markbates/goth/gothic"
)

func RegisterHandler(ctx *gin.Context) {
	var credentials models.RegisterCredentials

	if err := ctx.ShouldBindJSON(&credentials); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid input data",
		})
		return
	}

	err := auth.Register(credentials)

	if err != nil {
		if errors.Is(err, auth.ErrUserAlreadyExit) {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"message": "User already exist",
			})
			return
		}
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Account successfully created",
	})
}

func LoginHandler(ctx *gin.Context) {
	var credentials models.LoginCredentials
	if err := ctx.ShouldBindJSON(&credentials); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid input data",
		})
		return
	}

	err := auth.Login(credentials)

	if err != nil {
		if errors.Is(err, auth.ErrUserNotFound) {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"message": "User does not exist",
			})
			return
		}
		if errors.Is(err, auth.ErrNoPassword) {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"message": "User does not have a password",
			})
			return
		}
		if errors.Is(err, auth.ErrInvalidPassword) {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"message": "Invalid password",
			})
			return
		}
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Successfully logged in",
	})
}

func OAuthHandler(ctx *gin.Context) {
	provider := ctx.Param("provider")

	q := ctx.Request.URL.Query()
	q.Set("provider", provider)
	ctx.Request.URL.RawQuery = q.Encode()

	gothic.BeginAuthHandler(ctx.Writer, ctx.Request)
}
func OAuthCallbackHandler(ctx *gin.Context) {
	user, err := gothic.CompleteUserAuth(ctx.Writer, ctx.Request)
	if err != nil {
		fmt.Println("Error: ", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}

	frontEndUrl := os.Getenv("FRONTEND_URL")
	name := user.Name
	if name == "" {
		name = user.NickName
	}
	if err = database.CreateOAuthUser(models.OAuthCredentials{
		Name:       name,
		Email:      user.Email,
		Provider:   user.Provider,
		ProviderId: user.UserID,
	}); err != nil {
		fmt.Println("Error: ", err)
		http.Redirect(ctx.Writer, ctx.Request, fmt.Sprintf("%s/", frontEndUrl), http.StatusInternalServerError)
		return
	}

	fmt.Println("Frontend url: ", frontEndUrl)
	http.Redirect(ctx.Writer, ctx.Request, fmt.Sprintf("%s/", frontEndUrl), http.StatusFound)
}
