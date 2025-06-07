package database

import (
	"database/sql"
	"fmt"

	"github.com/elltja/finance-tracker/internal/models"
)

type TransactionData struct {
	Name        string
	Description string
	Amount      int
	Type        string
	Category    string
}

func GetTransactionsByUserId(db *sql.DB, userId string) ([]*models.Transaction, error) {
	query := `SELECT id, name, description, created_at, amount, type, category FROM transactions 
				WHERE user_id = $1 
				AND created_at >= date_trunc('month', CURRENT_DATE) 
				AND created_at < date_trunc('month', CURRENT_DATE + INTERVAL '1 month');`

	rows, err := db.Query(query, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var transactions []*models.Transaction
	for rows.Next() {
		var t models.Transaction
		var description sql.NullString

		if err := rows.Scan(&t.Id, &t.Name, &description, &t.CreatedAt, &t.Amount, &t.Type, &t.Category); err != nil {
			return nil, err
		}
		if description.Valid {
			t.Description = &description.String
		} else {
			t.Description = nil
		}

		transactions = append(transactions, &t)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return transactions, nil
}

func CreateTransaction(db *sql.DB, userId string, data TransactionData) error {
	query := `INSERT INTO transactions (user_id, name, description, amount, type, category)
				VALUES ($1, $2, $3, $4, $5, $6)`
	_, err := db.Exec(query, userId, data.Name, data.Description, data.Amount, data.Type, data.Category)
	if err != nil {
		return err
	}

	return nil
}

func UpdateTransaction(db *sql.DB, id string, data TransactionData) error {
	query := `UPDATE transactions 
				SET name = $1, description = $2, amount = $3, type = $4, category = $5
				WHERE id = $6`
	_, err := db.Exec(query, data.Name, data.Description, data.Amount, data.Type, data.Category, id)
	if err != nil {
		return err
	}

	return nil
}

func DeleteTransaction(db *sql.DB, id string) error {
	query := `DELETE FROM transactions WHERE id = $1`
	_, err := db.Exec(query, id)
	return err
}

func CanMutateTransaction(db *sql.DB, userId string, transactionId string) bool {
	if transactionId == "" {
		fmt.Println("Empty transaction ID")
		return false
	}

	query := `SELECT user_id FROM transactions WHERE id = $1`
	row := db.QueryRow(query, transactionId)

	var ownerId string
	if err := row.Scan(&ownerId); err != nil {
		fmt.Println("Query error:", err)
		return false
	}

	return ownerId == userId
}
