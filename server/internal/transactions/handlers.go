package transactions

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/elltja/finance-tracker/internal/auth"
	"github.com/elltja/finance-tracker/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
)

type TransactionHandler struct {
	DB    *sql.DB
	Store *sessions.CookieStore
}

func NewHandler(DB *sql.DB, Store *sessions.CookieStore) *TransactionHandler {
	return &TransactionHandler{DB: DB, Store: Store}
}

func (h *TransactionHandler) GetAll(c *gin.Context) {
	userId, ok := auth.GetCurrentUserId(c.Request, h.Store)

	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
	}

	transactions, err := database.GetTransactionsByUserId(h.DB, userId)

	if err != nil {
		fmt.Println("Error getting transactions", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	c.JSON(http.StatusOK, transactions)
}
