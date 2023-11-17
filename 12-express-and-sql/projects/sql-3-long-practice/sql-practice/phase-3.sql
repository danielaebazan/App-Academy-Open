-- Find the name of the cats co-owned by both George Beatty and Melynda Abshire
-- Your code here
(SELECT id FROM owners WHERE first_name = 'George' AND last_name = 'Beatty') AS george_id,
(SELECT id FROM owners WHERE first_name = 'Melynda' AND last_name = 'Abshire') AS melynda_id

SELECT DISTINCT name
FROM cats
WHERE id IN (
  SELECT cat_id
  FROM cat_owners
  WHERE owner_id = (SELECT id FROM owners WHERE first_name = 'George' AND last_name = 'Beatty')
  INTERSECT
  SELECT cat_id
  FROM cat_owners
  WHERE owner_id = (SELECT id FROM owners WHERE first_name = 'Melynda' AND last_name = 'Abshire')
);
