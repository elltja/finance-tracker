-- +goose Up
-- +goose StatementBegin
ALTER TABLE transactions
    ADD COLUMN category TEXT NOT NULL DEFAULT 'other';
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE transactions
    DROP COLUMN category;
-- +goose StatementEnd
