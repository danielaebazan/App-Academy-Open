-- Your code here
-- A new customer joined the loyalty program
INSERT INTO customers (name, phone) VALUES ('Rachel', '111-111-1111');

-- Rachel purchases a coffee
BEGIN;
    UPDATE customers SET points = points - 1 WHERE name = 'Rachel';
    INSERT INTO coffee_orders (is_redeemed) VALUES (0);
COMMIT;

-- Two new customers joined the loyalty program
INSERT INTO customers (name, email, phone) VALUES ('Monica', 'monica@friends.show', '222-222-2222');
INSERT INTO customers (name, email, phone) VALUES ('Phoebe', 'phoebe@friends.show', '333-333-3333');

-- Phoebe purchases three coffees
BEGIN;
    UPDATE customers SET points = points - 3 WHERE name = 'Phoebe';
    INSERT INTO coffee_orders (is_redeemed) VALUES (0), (0), (0);
COMMIT;

-- Rachel and Monica each purchase four coffees
BEGIN;
    UPDATE customers SET points = points - 4 WHERE name = 'Rachel';
    INSERT INTO coffee_orders (is_redeemed) VALUES (0), (0), (0), (0);
    UPDATE customers SET points = points - 4 WHERE name = 'Monica';
    INSERT INTO coffee_orders (is_redeemed) VALUES (0), (0), (0), (0);
COMMIT;

-- Monica wants to know her new point total
SELECT points FROM customers WHERE name = 'Monica';

-- Three new customers joined the loyalty program
INSERT INTO customers (name, email) VALUES ('Joey', 'joey@friends.show');
INSERT INTO customers (name, email) VALUES ('Chandler', 'chandler@friends.show');
INSERT INTO customers (name, email) VALUES ('Ross', 'ross@friends.show');

-- Ross purchases six coffees
BEGIN;
    UPDATE customers SET points = points - 6 WHERE name = 'Ross';
    INSERT INTO coffee_orders (is_redeemed) VALUES (0), (0), (0), (0), (0), (0);
COMMIT;
-- Ross demands a refund for the last two coffees
BEGIN;
    DELETE FROM coffee_orders WHERE id IN (
        SELECT id FROM coffee_orders WHERE is_redeemed = 0 AND id IN (
            SELECT id FROM coffee_orders WHERE id NOT IN (
                SELECT MAX(id) FROM coffee_orders WHERE is_redeemed = 0 GROUP BY is_redeemed
            )
        )
    );
    UPDATE customers SET points = points + 2 WHERE name = 'Ross';
COMMIT;

-- Joey purchases two coffees
BEGIN;
    UPDATE customers SET points = points - 2 WHERE name = 'Joey';
    INSERT INTO coffee_orders (is_redeemed) VALUES (0), (0);
COMMIT;

-- Chandler wants to delete his loyalty program account
DELETE FROM customers WHERE name = 'Chandler';

-- Phoebe wants to change her email
UPDATE customers SET email = 'p_as_in_phoebe@friends.show' WHERE name = 'Phoebe';