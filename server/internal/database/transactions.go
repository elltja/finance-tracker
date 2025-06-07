package database

import (
	"database/sql"

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
