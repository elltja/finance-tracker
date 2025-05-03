-- +goose Up
-- +goose StatementBegin
CREATE TYPE provider_type AS ENUM ('google', 'github');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(320) UNIQUE,
    password_hash TEXT,
    provider  provider_type,
    provider_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(provider, provider_id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE users;
DROP TYPE provider_type;
-- +goose StatementEnd
