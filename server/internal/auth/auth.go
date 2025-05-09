package auth

import (
	"fmt"
	"log"
	"os"

	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/github"
	"github.com/markbates/goth/providers/google"
)

const (
	CookieSessionKey = "session-id"
)

var (
	Store *sessions.CookieStore
)

func NewAuth() {
	sessionSecret := os.Getenv("SESSION_SECRET")
	if sessionSecret == "" {
		log.Fatal("SESSION_SECRET environment variable is required")
	}
	Store = sessions.NewCookieStore([]byte(sessionSecret))

	Store.Options.Path = "/"
	Store.Options.HttpOnly = true
	Store.Options.Secure = getIsProd()
	Store.MaxAge(86400)

	initOAuthProviders()
	gothic.Store = Store
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
			"user:email",
		),
		google.New(
			googleClientId,
			googleClientSecret,
			fmt.Sprintf("%s/auth/google/callback", baseUrl),
		),
	)
}
