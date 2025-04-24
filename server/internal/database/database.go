package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func Init() {
	dsn := os.Getenv("DATABASE_URL")
	conn, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatalf("Error opening DB: %v", err)
	}

	if err := conn.Ping(); err != nil {
		log.Fatalf("Error pinging DB: %v", err)
	}

	DB = conn
	fmt.Println("Connected to Postgres!")
}
