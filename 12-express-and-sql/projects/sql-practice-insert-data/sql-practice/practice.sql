-- Step 1: Create table
CREATE TABLE friends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);

-- Step 2: Insert one row
INSERT INTO friends (first_name, last_name) VALUES ('Amy', 'Pond');

-- Step 3: Insert multiple rows
INSERT INTO friends (first_name, last_name) VALUES 
    ('Rose', 'Tyler'),
    ('Martha', 'Jones'),
    ('Donna', 'Noble'),
    ('River', 'Song');
