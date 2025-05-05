package auth

import (
	"fmt"
	"net/http"
	"os"

	"github.com/elltja/finance-tracker/internal/database"
	"github.com/elltja/finance-tracker/internal/models"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/github"
)

func init() {
	baseUrl := os.Getenv("BASE_URL")
	githubClientId := os.Getenv("GITHUB_CLIENT_ID")
	githubClientSecret := os.Getenv("GITHUB_CLIENT_SECRET")
	goth.UseProviders(
		github.New(githubClientId, githubClientSecret, fmt.Sprintf("%s/auth/github/callback", baseUrl), "user:email"),
	)
	gothic.Store = Store

}

func RegisterOAuth(r *http.Request, w http.ResponseWriter, gothUser goth.User) error {
	existingUser, err := database.GetUserByEmail(gothUser.Email)

	if err != nil {
		fmt.Println("Error getting user", err)
		return err
	}

	if existingUser == nil {
		name := gothUser.Name
		if name == "" {
			name = gothUser.NickName
		}
		user, err := database.CreateOAuthUser(models.OAuthCredentials{
			Name:       name,
			Email:      gothUser.Email,
			Provider:   gothUser.Provider,
			ProviderId: gothUser.UserID,
		})
		if err != nil {
			fmt.Println("Error creating user", err)
			return err
		}
		session, _ := Store.Get(r, cookieSessionKey)

		session.Values["user_id"] = user.Id

		session.Save(r, w)
	}

	session, _ := Store.Get(r, cookieSessionKey)

	session.Values["user_id"] = existingUser.Id

	session.Save(r, w)

	return nil
}
