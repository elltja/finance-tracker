package database

import (
	"database/sql"

	"github.com/elltja/finance-tracker/internal/models"
)

func GetUserByEmail(email string) (*models.User, error) {
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

func CreateUser(credentials models.RegisterCredentials) (*models.User, error) {
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

func CreateOAuthUser(credentials models.OAuthCredentials) (*models.User, error) {
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
