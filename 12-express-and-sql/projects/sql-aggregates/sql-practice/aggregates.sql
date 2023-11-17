-- Write a query to determine the number of cats stored in the database.
SELECT COUNT(*) AS num_cats
FROM cats;

--Write a query for the oldest cat, and the year it was born.
--Write a query for the youngest cat, and the year it was born.

SELECT 
  MIN(birth_year) AS oldest_birth_year,
  MAX(birth_year) AS youngest_birth_year
FROM cats;

-- Step 1: GROUP BY - Number of toys per cat
SELECT cats.name AS cat_name, COUNT(toys.id) AS num_toys
FROM cats
LEFT JOIN toys ON cats.id = toys.cat_id
GROUP BY cats.name;

-- Step 2: HAVING - Cats with two or more toys (spoiled cats)
SELECT cats.name AS cat_name, COUNT(toys.id) AS num_toys
FROM cats
LEFT JOIN toys ON cats.id = toys.cat_id
GROUP BY cats.name
HAVING COUNT(toys.id) >= 2;
