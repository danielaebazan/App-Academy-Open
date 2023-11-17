----------
-- Step 0 - Create a Query 
----------
-- Query: Select all cats that have a toy with an id of 5

SELECT cats.*
FROM cats
JOIN cat_toys ON cats.id = cat_toys.cat_id
WHERE cat_toys.toy_id = 5;

-- Paste your results below (as a comment):
--4002|Rachele|Maroon|Foldex Cat
--31|Rodger|Lavender|Oregon Rex
--77|Jamal|Orange|Sam Sawet
--sqlite> 

----------
-- Step 1 - Analyze the Query
----------
-- Query:

EXPLAIN QUERY PLAN
SELECT cats.*
FROM cats
JOIN cat_toys ON cats.id = cat_toys.cat_id
WHERE cat_toys.toy_id = 5;

-- Paste your results below (as a comment):
--QUERY PLAN
|--SCAN cat_toys
--SEARCH cats USING INTEGER PRIMARY KEY (rowid=?)

-- What do your results mean?

    -- Was this a SEARCH or SCAN? 
    -- What does that mean?


----------
-- Step 2 - Time the Query to get a baseline
----------
-- Query (to be used in the sqlite CLI):
.timer on
SELECT cats.*
FROM cats
JOIN cat_toys ON cats.id = cat_toys.cat_id
WHERE cat_toys.toy_id = 5;

-- Paste your results below (as a comment):

----------
-- Step 3 - Add an index and analyze how the query is executing
----------

-- Create index:

    CREATE INDEX idx_toy_id ON cat_toys(toy_id);

    EXPLAIN QUERY PLAN
    SELECT cats.*
    FROM cats
    JOIN cat_toys ON cats.id = cat_toys.cat_id
    WHERE cat_toys.toy_id = 5;


-- Analyze Query:
    -- Your code here

-- Paste your results below (as a comment):


-- Analyze Results:

    -- Is the new index being applied in this query?


----------
-- Step 4 - Re-time the query using the new index
----------
-- Query (to be used in the sqlite CLI):

.timer on
SELECT cats.*
FROM cats
JOIN cat_toys ON cats.id = cat_toys.cat_id
WHERE cat_toys.toy_id = 5;


-- Paste your results below (as a comment):


-- Analyze Results:
    -- Are you still getting the correct query results?


    -- Did the execution time improve (decrease)?


    -- Do you see any other opportunities for making this query more efficient?


---------------------------------
-- Notes From Further Exploration
---------------------------------