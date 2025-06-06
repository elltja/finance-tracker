package models

type Transaction struct {
	Id          string  `json:"id"`
	Name        string  `json:"name"`
	Description *string `json:"description"`
	CreatedAt   string  `json:"created_at"`
	Amount      float64 `json:"amount"`
	Category    string  `json:"category"`
	Type        string  `json:"type"`
}
