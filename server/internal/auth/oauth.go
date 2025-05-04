package auth

import (
	"fmt"
	"os"

	"github.com/markbates/goth"
	"github.com/markbates/goth/providers/github"
)

func init() {
	baseUrl := os.Getenv("BASE_URL")
	githubClientId := os.Getenv("GITHUB_CLIENT_ID")
	githubClientSecret := os.Getenv("GITHUB_CLIENT_SECRET")
	goth.UseProviders(
		github.New(githubClientId, githubClientSecret, fmt.Sprintf("%s/auth/github/callback", baseUrl), "user:email"),
	)
}
