-- Find names of the cats whose owners are both George Beatty and Melynda Abshire, or just George Beatty, or just Melynda Abshire
-- Your code here
SELECT cats.name AS cat_name
FROM cats
JOIN cat_owners co1 ON cats.id = co1.cat_id
JOIN owners o1 ON co1.owner_id = o1.id
JOIN cat_owners co2 ON cats.id = co2.cat_id
JOIN owners o2 ON co2.owner_id = o2.id
WHERE o1.first_name = 'George' AND o1.last_name = 'Beatty'
  AND o2.first_name = 'Melynda' AND o2.last_name = 'Abshire';
