package models

type RegisterCredentials struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginCredentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type OAuthCredentials struct {
	Name       string `json:"name"`
	Email      string `json:"email"`
	Provider   string `json:"provider"`
	ProviderId string `json:"provider_id"`
}
