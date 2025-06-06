-- +goose Up
-- +goose StatementBegin


ALTER TABLE transactions
    ADD COLUMN user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE;
    
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

ALTER TABLE transactions
    DROP COLUMN user_id;

-- +goose StatementEnd
