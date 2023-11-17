-- Using subqueries, find the names of the cats whose owners are either George Beatty or Melynda Abshire
-- Your code here
(SELECT id FROM owners WHERE first_name = 'George' AND last_name = 'Beatty') AS george_id,
(SELECT id FROM owners WHERE first_name = 'Melynda' AND last_name = 'Abshire') AS melynda_id

(
  SELECT cat_id
  FROM cat_owners
  WHERE owner_id = (SELECT id FROM owners WHERE first_name = 'George' AND last_name = 'Beatty')
  UNION
  SELECT cat_id
  FROM cat_owners
  WHERE owner_id = (SELECT id FROM owners WHERE first_name = 'Melynda' AND last_name = 'Abshire')
) AS cats_of_interest

SELECT DISTINCT name
FROM cats
WHERE id IN (
  SELECT cat_id
  FROM cat_owners
  WHERE owner_id = (SELECT id FROM owners WHERE first_name = 'George' AND last_name = 'Beatty')
  UNION
  SELECT cat_id
  FROM cat_owners
  WHERE owner_id = (SELECT id FROM owners WHERE first_name = 'Melynda' AND last_name = 'Abshire')
);
