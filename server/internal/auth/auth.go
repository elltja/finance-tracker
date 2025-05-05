package auth

import (
	"errors"
	"fmt"
	"net/http"
	"os"

	"github.com/elltja/finance-tracker/internal/database"
	"github.com/elltja/finance-tracker/internal/models"
	"github.com/gorilla/sessions"
)

const isProd = false

var Store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))

func init() {
	Store.Options.Path = "/"
	Store.Options.HttpOnly = true
	Store.Options.Secure = isProd
}

const cookieSessionKey = "session-id"

func Register(r *http.Request, w http.ResponseWriter, credentials models.RegisterCredentials) error {

	existingUser, err := database.GetUserByEmail(credentials.Email)

	if err != nil {
		fmt.Println("Error getting user", err)
		return err
	}

	if existingUser != nil {
		return ErrUserAlreadyExit
	}

	passwordHash, err := HashPassword(credentials.Password)
	if err != nil {
		fmt.Println("Error hashing password", err)
		return err
	}

	newUser := models.RegisterCredentials{
		Email:    credentials.Email,
		Password: passwordHash,
		Name:     credentials.Name,
	}

	user, err := database.CreateUser(newUser)

	if err != nil {
		fmt.Println("Error creating user")
		return err
	}

	session, _ := Store.Get(r, cookieSessionKey)

	session.Values["user_id"] = user.Id

	session.Save(r, w)

	return nil
}

func Login(r *http.Request, w http.ResponseWriter, credentials models.LoginCredentials) error {
	existingUser, err := database.GetUserByEmail(credentials.Email)

	if err != nil {
		fmt.Println("Error getting user", err)
		return errors.New("error getting user")
	}

	if existingUser == nil {
		return ErrUserNotFound
	}

	if !existingUser.HashedPassword.Valid {
		return ErrNoPassword
	}

	if err := ComparePasswords(existingUser.HashedPassword.String, credentials.Password); err != nil {
		return ErrInvalidPassword
	}

	session, _ := Store.Get(r, cookieSessionKey)

	session.Values["user_id"] = existingUser.Id

	session.Save(r, w)

	return nil

}
