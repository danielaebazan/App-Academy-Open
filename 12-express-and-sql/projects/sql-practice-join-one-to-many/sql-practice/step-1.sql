-- Step 1
-- JOIN the tables, matching FOREIGN KEYs to the corresponding PRIMARY KEY.
-- Your code here
SELECT bands.name AS band_name, albums.title AS album_title
FROM bands
JOIN albums ON bands.id = albums.band_id;
