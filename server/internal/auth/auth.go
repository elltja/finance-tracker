package auth

type RegisterCredentials struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Register(credentials RegisterCredentials) {

}
