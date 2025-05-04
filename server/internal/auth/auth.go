package auth

import (
	"errors"
	"fmt"

	"github.com/elltja/finance-tracker/internal/database"
	"github.com/elltja/finance-tracker/internal/models"
)

func Register(credentials models.RegisterCredentials) error {

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

	if err := database.CreateUser(newUser); err != nil {
		fmt.Println("Error creating user")
		return err
	}

	// TODO: Create session

	return nil
}

func Login(credentials models.LoginCredentials) error {
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

	// TODO: Create session

	return nil

}
