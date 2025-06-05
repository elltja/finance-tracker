package database

import (
	"database/sql"
	"strings"

	"github.com/elltja/finance-tracker/internal/models"
)

type CreateUserCredentials struct {
	Name              string `json:"name"`
	Email             string `json:"email"`
	Password          string `json:"password"`
	PreferredCurrency string `json:"preferred_currency"`
	PreferredLanguage string `json:"preferred_language"`
}

type CreateOAuthCredentials struct {
	Name              string `json:"name"`
	Email             string `json:"email"`
	Provider          string `json:"provider"`
	ProviderId        string `json:"provider_id"`
	PreferredCurrency string `json:"preferred_currency"`
	PreferredLanguage string `json:"preferred_language"`
}

func FindUserForAuth(db *sql.DB, email string) (*models.User, error) {
	row := db.QueryRow(`SELECT id, name, email, password_hash, provider, provider_id, created_at FROM users WHERE email = $1`, email)
	var user models.User

	if err := row.Scan(&user.Id, &user.Name, &user.Email, &user.HashedPassword, &user.Provider, &user.ProviderId, &user.CreatedAt); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

func GetUser(db *sql.DB, id string) (*models.PublicUser, error) {
	row := db.QueryRow(`SELECT id, name, email, created_at, preferred_currency, preferred_language FROM users WHERE id = $1`, id)
	var user models.PublicUser
	if err := row.Scan(&user.Id, &user.Name, &user.Email, &user.CreatedAt, &user.PreferredCurrency, &user.PreferredLanguage); err != nil {
		return nil, err
	}
	return &user, nil
}

func CreateUser(db *sql.DB, credentials CreateUserCredentials) (*models.User, error) {
	row := db.QueryRow(
		`INSERT INTO users (name, email, password_hash, preferred_currency, preferred_language) 
		 VALUES ($1, $2, $3, $4, $5) 
		 RETURNING id, name, email, password_hash, provider, provider_id, created_at, preferred_currency, preferred_language`,
		credentials.Name, credentials.Email, credentials.Password, credentials.PreferredCurrency, credentials.PreferredLanguage,
	)

	var user models.User
	if err := row.Scan(&user.Id, &user.Name, &user.Email, &user.HashedPassword, &user.Provider, &user.ProviderId, &user.CreatedAt, &user.PreferredCurrency, &user.PreferredLanguage); err != nil {
		return nil, err
	}
	return &user, nil
}

func CreateOAuthUser(db *sql.DB, credentials CreateOAuthCredentials) (*models.User, error) {
	if credentials.PreferredCurrency == "" {
		credentials.PreferredCurrency = "usd"
	}
	if credentials.PreferredLanguage == "" {
		credentials.PreferredLanguage = "en"
	}

	row := db.QueryRow(
		`INSERT INTO users (name, email, provider, provider_id, preferred_currency, preferred_language) 
		 VALUES ($1, $2, $3, $4, $5, $6) 
		 RETURNING id, name, email, password_hash, provider, provider_id, created_at, preferred_currency, preferred_language`,
		credentials.Name, credentials.Email, credentials.Provider, credentials.ProviderId, credentials.PreferredCurrency, parseLocaleCode(credentials.PreferredLanguage),
	)

	var user models.User
	if err := row.Scan(&user.Id, &user.Name, &user.Email, &user.HashedPassword, &user.Provider, &user.ProviderId, &user.CreatedAt, &user.PreferredCurrency, &user.PreferredLanguage); err != nil {
		return nil, err
	}
	return &user, nil
}

func parseLocaleCode(code string) string {
	if parts := strings.Split(code, "-"); len(parts) > 1 {
		return parts[0]
	}
	return code
}
