-- +goose Up
-- +goose StatementBegin
CREATE EXTENSION "uuid-ossp";

CREATE TYPE transaction_type AS ENUM ('fixed', 'recurring');

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    description VARCHAR(250),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL NOT NULL,
    type transaction_type NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

DROP TABLE transactions;
DROP TYPE transaction_type;
DROP EXTENSION "uuid-ossp";

-- +goose StatementEnd
