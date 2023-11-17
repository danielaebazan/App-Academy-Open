-- Give "Red" the cat one of every toy the other cats have
-- Your code here
INSERT INTO toys (cat_id, name)
SELECT (SELECT id FROM cats WHERE name = 'Red'), name
FROM toys
WHERE cat_id <> (SELECT id FROM cats WHERE name = 'Red');


-- Query spoiled cats reporting the most spoiled first
-- Your code here
SELECT cats.name AS cat_name, COUNT(toys.id) AS toy_count
FROM cats
JOIN toys ON cats.id = toys.cat_id
GROUP BY cats.id
HAVING toy_count >= 2
ORDER BY toy_count DESC;
