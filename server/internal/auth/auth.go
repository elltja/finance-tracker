package auth

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/elltja/finance-tracker/internal/database"
	"github.com/elltja/finance-tracker/internal/models"
	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/github"
	"github.com/markbates/goth/providers/google"
)

const (
	CookieSessionKey = "session-id"
)

func Init() *sessions.CookieStore {
	sessionSecret := os.Getenv("SESSION_SECRET")
	if sessionSecret == "" {
		log.Fatal("SESSION_SECRET environment variable is required")
	}
	store := sessions.NewCookieStore([]byte(sessionSecret))

	store.Options.Path = "/"
	store.Options.HttpOnly = true
	store.Options.Secure = getIsProd()
	store.MaxAge(86400)

	initOAuthProviders()
	gothic.Store = store
	return store
}

func getIsProd() bool {
	env := os.Getenv("ENV")
	return env == "production"
}

func initOAuthProviders() {
	baseUrl := os.Getenv("BASE_URL")
	if baseUrl == "" {
		log.Fatal("BASE_URL environment variable is required")
	}

	githubClientId := os.Getenv("GITHUB_CLIENT_ID")
	githubClientSecret := os.Getenv("GITHUB_CLIENT_SECRET")

	if githubClientId == "" || githubClientSecret == "" {
		log.Fatal("GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET environment variables are required")
	}

	googleClientId := os.Getenv("GOOGLE_CLIENT_ID")
	googleClientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")

	if googleClientId == "" || googleClientSecret == "" {
		log.Fatal("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables are required")
	}

	goth.UseProviders(
		github.New(
			githubClientId,
			githubClientSecret,
			fmt.Sprintf("%s/auth/github/callback", baseUrl),
			"user:email", "read:user",
		),
		google.New(
			googleClientId,
			googleClientSecret,
			fmt.Sprintf("%s/auth/google/callback", baseUrl),
			"profile", "email",
		),
	)
}

func GetCurrentUserId(r *http.Request, Store *sessions.CookieStore) (string, bool) {
	session, _ := Store.Get(r, CookieSessionKey)

	userId, ok := session.Values["user_id"].(string)

	return userId, ok
}

var ErrUserUnauthenticated = errors.New("user unauthenticated")

func GetCurrentUser(r *http.Request, Store *sessions.CookieStore, db *sql.DB) (*models.PublicUser, error) {

	userId, ok := GetCurrentUserId(r, Store)
	if !ok {
		return nil, ErrUserUnauthenticated
	}

	user, err := database.GetUser(db, userId)

	if err != nil {
		return nil, err
	}
	return user, nil
}
