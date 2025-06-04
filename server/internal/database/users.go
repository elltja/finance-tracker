package database

import (
	"database/sql"

	"github.com/elltja/finance-tracker/internal/models"
)

func FindUserForAuth(email string) (*models.User, error) {
	row := DB.QueryRow(`SELECT id, name, email, password_hash, provider, provider_id, created_at FROM users WHERE email = $1`, email)
	var user models.User

	if err := row.Scan(&user.Id, &user.Name, &user.Email, &user.HashedPassword, &user.Provider, &user.ProviderId, &user.CreatedAt); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

func GetUser(id string) (*models.PublicUser, error) {
	row := DB.QueryRow(`SELECT id, name, email, created_at FROM users WHERE id = $1`, id)
	var user models.PublicUser
	if err := row.Scan(&user.Id, &user.Name, &user.Email, &user.CreatedAt); err != nil {
		return nil, err
	}
	return &user, nil
}

func CreateUser(credentials struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}) (*models.User, error) {
	row := DB.QueryRow(
		`INSERT INTO users (name, email, password_hash) 
		 VALUES ($1, $2, $3) 
		 RETURNING id, name, email, password_hash, provider, provider_id, created_at`,
		credentials.Name, credentials.Email, credentials.Password,
	)

	var user models.User
	if err := row.Scan(&user.Id, &user.Name, &user.Email, &user.HashedPassword, &user.Provider, &user.ProviderId, &user.CreatedAt); err != nil {
		return nil, err
	}
	return &user, nil
}

func CreateOAuthUser(credentials struct {
	Name       string `json:"name"`
	Email      string `json:"email"`
	Provider   string `json:"provider"`
	ProviderId string `json:"provider_id"`
}) (*models.User, error) {
	row := DB.QueryRow(
		`INSERT INTO users (name, email, provider, provider_id) 
		 VALUES ($1, $2, $3, $4) 
		 RETURNING id, name, email, password_hash, provider, provider_id, created_at`,
		credentials.Name, credentials.Email, credentials.Provider, credentials.ProviderId,
	)

	var user models.User
	if err := row.Scan(&user.Id, &user.Name, &user.Email, &user.HashedPassword, &user.Provider, &user.ProviderId, &user.CreatedAt); err != nil {
		return nil, err
	}
	return &user, nil
}
