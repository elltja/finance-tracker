-- +goose Up
-- +goose StatementBegin

ALTER TABLE users
    ADD COLUMN preferred_currency VARCHAR(3) NOT NULL DEFAULT 'usd',
    ADD COLUMN preferred_language VARCHAR(5) NOT NULL DEFAULT 'en';

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

ALTER TABLE users
    DROP COLUMN preferred_currency,
    DROP COLUMN preferred_language;
-- +goose StatementEnd
