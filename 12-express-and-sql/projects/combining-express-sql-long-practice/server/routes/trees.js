// Instantiate router - DO NOT MODIFY
const express = require('express');
const router = express.Router();

/**
 * BASIC PHASE 2, Step A - Instantiate SQLite and database
 *   - Database file: "data_source" environment variable
 *   - Database permissions: read/write records in tables
 */
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(DATA_SOURCE, sqlite3.OPEN_READWRITE);

/**
 * BASIC PHASE 2, Step B - List of all trees in the database
 *
 * Protocol: GET
 * Path: /
 * Parameters: None
 * Response: JSON array of objects
 *   - Object properties: height-ft, tree, id
 *   - Ordered by the height_ft from tallest to shortest
 */
// Your code here
router.get('/', (req, res, next) => {
    const sql = 'SELECT id, tree, height_ft FROM trees ORDER BY height_ft DESC';
    const params = [];

    db.all(sql, params, (err, rows) => {
        if (err) {
            next(err); // Pass the error to the error handling middleware
            return;
        }

        res.json(rows); // Respond with the list of trees ordered by height
    });
});

/**
 * BASIC PHASE 3 - Retrieve one tree with the matching id
 *
 * Path: /:id
 * Protocol: GET
 * Parameter: id
 * Response: JSON Object
 *   - Properties: id, tree, location, height_ft, ground_circumference_ft
 */
router.get('/:id', (req, res, next) => {
    const treeId = req.params.id; // Get the ID from the request parameters
    const sql = 'SELECT * FROM trees WHERE id = ?'; // SQL statement to retrieve one row based on ID
    const params = [treeId]; // Parameters for the SQL statement

    db.get(sql, params, (err, row) => {
        if (err) {
            next(err); // Pass the error to the error handling middleware
            return;
        }

        if (!row) {
            res.status(404).json({ error: 'Tree not found' }); // If no tree with the given ID is found
            return;
        }

        res.json(row); // Respond with the retrieved tree data in JSON format
    });
});

/**
 * INTERMEDIATE PHASE 4 - INSERT tree row into the database
 *
 * Path: /trees
 * Protocol: POST
 * Parameters: None
 * Response: JSON Object
 *   - Property: message
 *   - Value: success
 */
router.post('/', (req, res, next) => {
    const { name, location, height, size } = req.body; // Destructure values from request body
    const sql = 'INSERT INTO trees (tree, location, height_ft, ground_circumference_ft) VALUES (?, ?, ?, ?)';
    const params = [name, location, height, size]; // Parameters for the SQL statement

    db.run(sql, params, function (err) {
        if (err) {
            next(err); // Pass the error to the error handling middleware
            return;
        }

        res.json({ message: 'success' }); // Respond with success message in JSON format
    });
});

/**
 * INTERMEDIATE PHASE 5 - DELETE a tree row from the database
 *
 * Path: /trees/:id
 * Protocol: DELETE
 * Parameter: id
 * Response: JSON Object
 *   - Property: message
 *   - Value: success
 */
// Your code here
router.delete('/:id', (req, res, next) => {
    const treeId = req.params.id; // Get the ID from the request parameters
    const sql = 'DELETE FROM trees WHERE id = ?'; // SQL statement to delete a row based on ID
    const params = [treeId]; // Parameters for the SQL statement

    db.run(sql, params, function (err) {
        if (err) {
            next(err); // Pass the error to the error handling middleware
            return;
        }

        res.json({ message: 'success' }); // Respond with success message in JSON format
    });
});

/**
 * INTERMEDIATE PHASE 6 - UPDATE a tree row in the database
 *
 * Path: /trees/:id
 * Protocol: PUT
 * Parameter: id
 * Response: JSON Object
 *   - Property: message
 *   - Value: success
 */
// Your code here
router.put('/:id', (req, res, next) => {
    const { id, name, location, height, size } = req.body; // Destructure values from request body
    const treeId = req.params.id; // Get the ID from the request parameters

    // Check if the IDs match
    if (id != treeId) {
        res.status(400).json({ error: 'ids do not match' });
        return;
    }

    const sql = 'UPDATE trees SET tree = ?, location = ?, height_ft = ?, ground_circumference_ft = ? WHERE id = ?';
    const params = [name, location, height, size, treeId]; // Parameters for the SQL statement

    db.run(sql, params, function (err) {
        if (err) {
            next(err); // Pass the error to the error handling middleware
            return;
        }

        res.json({ message: 'success' }); // Respond with success message in JSON format
    });
});

// Export class - DO NOT MODIFY
module.exports = router;