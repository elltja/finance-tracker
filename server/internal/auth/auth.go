package auth

import (
	"fmt"
	"os"

	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/github"
)

const isProd = false // TODO: Make enviroment variable
const CookieSessionKey = "session-id"

var Store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))

func init() {
	Store.Options.Path = "/"
	Store.Options.HttpOnly = true
	Store.Options.Secure = isProd

	baseUrl := os.Getenv("BASE_URL")
	githubClientId := os.Getenv("GITHUB_CLIENT_ID")
	githubClientSecret := os.Getenv("GITHUB_CLIENT_SECRET")
	goth.UseProviders(
		github.New(githubClientId, githubClientSecret, fmt.Sprintf("%s/auth/github/callback", baseUrl), "user:email"),
	)
	gothic.Store = Store
}

// TODO: NewAuth function
