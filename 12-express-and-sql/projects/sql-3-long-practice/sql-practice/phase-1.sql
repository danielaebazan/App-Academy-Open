-- Insert new cat named "Red" born this year
INSERT INTO cats (name, birth_year)
VALUES ('Red', strftime('%Y', 'now'));

-- Assign ownership of new cat to George Beatty using subqueries
INSERT INTO cat_owners (cat_id, owner_id)
VALUES (
  (SELECT id FROM cats WHERE name = 'Red'),
  (SELECT id FROM owners WHERE first_name = 'George' AND last_name = 'Beatty')
);

-- Query to verify INSERTs worked properly
--SELECT * FROM cats WHERE name = 'Red';

--SELECT * FROM cat_owners WHERE cat_id = (SELECT id FROM cats WHERE name = 'Red');
