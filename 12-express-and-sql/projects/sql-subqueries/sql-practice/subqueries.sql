--original
SELECT toys.name AS toy_name
FROM toys
JOIN cats ON cats.id = toys.cat_id
WHERE cats.name = 'Garfield';

--subquery
SELECT name AS toy_name
FROM toys
WHERE cat_id = (SELECT id FROM cats WHERE name = 'Garfield');

--phase2
INSERT INTO toys (cat_id, name)
SELECT id, 'Pepperoni' AS name
FROM cats
WHERE name = 'Garfield';

--verify the insertion worked, you can use a query to check if "Pepperoni" was added for Garfield:

SELECT cats.name AS cat_name, toys.name AS toy_name
FROM cats
JOIN toys ON cats.id = toys.cat_id
WHERE cats.name = 'Garfield' AND toys.name = 'Pepperoni';

--BONUS
-- Insert "Cat Bed" toy for cats born before 2013
INSERT INTO toys (cat_id, name)
SELECT id, 'Cat Bed' AS name
FROM cats
WHERE birth_year < 2013;

-- Verify insertion for "Cat Bed" toy for specific cats
SELECT cats.name AS cat_name, toys.name AS toy_name
FROM cats
JOIN toys ON cats.id = toys.cat_id
WHERE cats.name IN ('Tiger', 'Oscar', 'Garfield') AND toys.name = 'Cat Bed';

--phase2
-- Backup cats table into cats_backup
INSERT INTO cats_backup (id, name, birth_year)
SELECT id, name, birth_year
FROM cats;

-- Verify cats_backup has the same rows as cats table
SELECT COUNT(*) AS count_matches
FROM cats_backup
WHERE EXISTS (
    SELECT 1
    FROM cats
    WHERE cats.id = cats_backup.id
);

-- Backup toys table into toys_backup
INSERT INTO toys_backup (id, name, cat_id)
SELECT id, name, cat_id
FROM toys;

-- Verify toys_backup has the same rows as toys table
SELECT COUNT(*) AS count_matches
FROM toys_backup
WHERE EXISTS (
    SELECT 1
    FROM toys
    WHERE toys.id = toys_backup.id
);


