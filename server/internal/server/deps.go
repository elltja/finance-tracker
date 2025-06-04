package server

import (
	"database/sql"

	"github.com/gorilla/sessions"
)

type Dependencies struct {
	DB    *sql.DB
	Store *sessions.CookieStore
}
