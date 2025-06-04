package database

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

func Init() *sql.DB {
	dsn := os.Getenv("DATABASE_URL")
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatalf("Error opening DB: %v", err)
	}

	if err := db.Ping(); err != nil {
		log.Fatalf("Error pinging DB: %v", err)
	}

	return db
}
