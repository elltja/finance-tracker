package models

import (
	"database/sql"
	"time"
)

type User struct {
	Id             string         `json:"id"`
	Name           string         `json:"name"`
	Email          string         `json:"email"`
	HashedPassword sql.NullString `json:"password_hash"`
	Provider       sql.NullString `json:"provider"`
	ProviderId     sql.NullString `json:"provider_id"`
	CreatedAt      time.Time      `json:"created_at"`
}
