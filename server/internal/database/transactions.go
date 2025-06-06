package database

import (
	"database/sql"

	"github.com/elltja/finance-tracker/internal/models"
)

func GetTransactionsByUserId(db *sql.DB, userId string) ([]*models.Transaction, error) {
	query := `SELECT id, name, description, created_at, amount, type FROM transactions WHERE user_id = $1`

	rows, err := db.Query(query, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var transactions []*models.Transaction
	for rows.Next() {
		var t models.Transaction
		var description sql.NullString

		if err := rows.Scan(&t.Id, &t.Name, &description, &t.CreatedAt, &t.Amount, &t.Type); err != nil {
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
