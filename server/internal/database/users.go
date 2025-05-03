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

func CreateUser(credentials models.RegisterCredentials) error {
	_, err := DB.Exec(`INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)`, credentials.Name, credentials.Email, credentials.Password)
	if err != nil {
		return err
	}
	return nil
}
