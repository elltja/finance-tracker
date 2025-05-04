package server

import (
	"errors"
	"net/http"

	"github.com/elltja/finance-tracker/internal/auth"
	"github.com/elltja/finance-tracker/internal/models"
	"github.com/gin-gonic/gin"
)

func RegisterHandler(ctx *gin.Context) {
	var credentials models.RegisterCredentials

	if err := ctx.ShouldBindJSON(&credentials); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid input data",
		})
		return
	}

	err := auth.Register(credentials)

	if err != nil {
		if errors.Is(err, auth.ErrUserAlreadyExit) {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"message": "User already exist",
			})
			return
		}
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Account successfully created",
	})
}

func LoginHandler(ctx *gin.Context) {
	var credentials models.LoginCredentials
	if err := ctx.ShouldBindJSON(&credentials); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid input data",
		})
		return
	}

	err := auth.Login(credentials)

	if err != nil {
		if errors.Is(err, auth.ErrUserNotFound) {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"message": "User does not exist",
			})
			return
		}
		if errors.Is(err, auth.ErrNoPassword) {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"message": "User does not have a password",
			})
			return
		}
		if errors.Is(err, auth.ErrInvalidPassword) {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"message": "Invalid password",
			})
			return
		}
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Successfully logged in",
	})
}
