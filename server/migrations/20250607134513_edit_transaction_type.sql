-- +goose Up
-- +goose StatementBegin

ALTER TABLE transactions ALTER COLUMN type TYPE text;

UPDATE transactions SET type = 'income' WHERE type NOT IN ('income', 'expense');

DROP TYPE transaction_type;

CREATE TYPE transaction_type AS ENUM ('income', 'expense');

ALTER TABLE transactions 
ALTER COLUMN type TYPE transaction_type 
USING type::transaction_type;


-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

ALTER TABLE transactions ALTER COLUMN type TYPE text;

UPDATE transactions SET type = 'fixed' WHERE type NOT IN ('fixed', 'recurring');

DROP TYPE transaction_type;

CREATE TYPE transaction_type AS ENUM ('fixed', 'recurring');

ALTER TABLE transactions 
ALTER COLUMN type TYPE transaction_type 
USING type::transaction_type;

-- +goose StatementEnd
