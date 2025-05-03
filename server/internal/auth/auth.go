package auth

import (
	"fmt"

	"github.com/elltja/finance-tracker/internal/database"
	"github.com/elltja/finance-tracker/internal/models"
)

func Register(credentials models.RegisterCredentials) error {

	existingUser, err := database.GetUserByEmail(credentials.Email)

	if err != nil {
		fmt.Println("Error getting user")
		return err
	}

	if existingUser != nil {
		return fmt.Errorf("user already exist")
	}

	passwordHash, err := HashPassword(credentials.Password)
	if err != nil {
		fmt.Println("Error hashing password")
		return err
	}

	newUser := models.RegisterCredentials{
		Email:    credentials.Email,
		Password: passwordHash,
		Name:     credentials.Name,
	}

	err = database.CreateUser(newUser)

	if err != nil {
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
		return err
	}

	if !existingUser.HashedPassword.Valid {
		return fmt.Errorf("user does not have a password")
	}

	err = ComparePasswords(existingUser.HashedPassword.String, credentials.Password)

	if err != nil {
		return err
	}

	// TODO: Create session

	return nil

}
