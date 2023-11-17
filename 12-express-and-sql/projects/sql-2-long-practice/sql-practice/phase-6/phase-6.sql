-- Update the toy with the name of "Cheetos" to have a name of "Pooky"
-- Your code here
UPDATE toys
SET name = 'Pooky'
WHERE cat_id = (
    SELECT id
    FROM cats
    WHERE name = 'Garfield'
) AND name = 'Cheetos';
