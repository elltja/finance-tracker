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
		c.JSON(http.StatusUnauthorized, gin.H{"message": "User not authenticated", "isError": true})
	}

	transactions, err := database.GetTransactionsByUserId(h.DB, userId)

	if err != nil {
		fmt.Println("Error getting transactions", err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Internal server error", "isError": true})
		return
	}

	c.JSON(http.StatusOK, transactions)
}

type TransactionData struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Amount      int    `json:"amount"`
	Type        string `json:"type"`
	Category    string `json:"category"`
}

func (h *TransactionHandler) Create(ctx *gin.Context) {
	var data TransactionData

	if err := ctx.ShouldBindJSON(&data); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid input data",
			"isError": true,
		})
		return
	}

	userId, ok := auth.GetCurrentUserId(ctx.Request, h.Store)
	if !ok {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"message": "User not authenticated",
			"isError": true,
		})
		return
	}

	txData := database.TransactionData{
		Name:        data.Name,
		Description: data.Description,
		Amount:      data.Amount,
		Type:        data.Type,
		Category:    data.Category,
	}

	err := database.CreateTransaction(h.DB, userId, txData)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to create transaction",
			"isError": true,
		})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"message": "Successfully created transaction",
		"isError": false,
	})
}

type UpdateTransactionData struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Amount      int    `json:"amount"`
	Type        string `json:"type"`
	Category    string `json:"category"`
}

func (h *TransactionHandler) Update(ctx *gin.Context) {
	var data UpdateTransactionData

	if err := ctx.ShouldBindJSON(&data); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid input data",
			"isError": true,
		})
		return
	}

	userId, ok := auth.GetCurrentUserId(ctx.Request, h.Store)
	if !ok || !database.CanMutateTransaction(h.DB, userId, data.Id) {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"message": "Not allowed",
			"isError": true,
		})
		return
	}
	txData := database.TransactionData{
		Name:        data.Name,
		Description: data.Description,
		Amount:      data.Amount,
		Type:        data.Type,
		Category:    data.Category,
	}

	if err := database.UpdateTransaction(h.DB, data.Id, txData); err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"isError": true,
			"message": "Error updating transaction",
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"isError": false,
		"message": "Successfully updated transaction",
	})
}

func (h *TransactionHandler) Delete(ctx *gin.Context) {
	var req struct {
		Id string `json:"id"`
	}
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid input data",
			"isError": true,
		})
		return
	}

	if err := database.DeleteTransaction(h.DB, req.Id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Error deleting transaction",
			"isError": true,
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"isError": false,
		"message": "Successfully deleted transaction",
	})
}
