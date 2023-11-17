-- Find Hermione's cats Write a query to find all the cats' names for the owner with the first name of "Hermione".
-- Your code here

SELECT cats.name AS cat_name
FROM cats
JOIN cat_owners ON cats.id = cat_owners.cat_id
JOIN owners ON cat_owners.owner_id = owners.id
WHERE owners.first_name = 'Hermione';

