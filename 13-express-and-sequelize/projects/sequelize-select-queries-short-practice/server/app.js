// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

// Import environment variables in order to connect to database - DO NOT MODIFY
require('dotenv').config();

// Import the models used in these routes - DO NOT MODIFY
const { Puppy } = require('./db/models');

// Import Op to perform comparison operations in WHERE clauses - DO NOT MODIFY
const { Op } = require("sequelize");

// Express using json - DO NOT MODIFY
app.use(express.json());


// STEP 1
// All puppies in the database
// No WHERE clause
app.get('/puppies', async (req, res) => {
    try {
        // Query the database using Sequelize to retrieve all puppies ordered by name
        const allPuppies = await Puppy.findAll({
            order: [['name', 'ASC']] // Ordering the results by the 'name' column in ascending order
        });

        // Send the retrieved puppies as a response
        res.json(allPuppies);
    } catch (error) {
        // Handle errors if the database query fails
        console.error('Error fetching puppies:', error);
        res.status(500).json({ error: 'Failed to fetch puppies' });
    }
});


// STEP 2
// All puppies that have been microchipped
// WHERE clause with one exact value
app.get('/puppies/chipped', async (req, res) => {
    try {
        // Query the database using Sequelize to retrieve chipped puppies
        const chippedPuppies = await Puppy.findAll({
            where: { microchipped: true }, // Filtering by microchipped attribute being true
            order: [['age_yrs', 'DESC'], ['name', 'ASC']] // Ordering by age in descending order and name in ascending order
        });

        // Send the retrieved chipped puppies as a response
        res.json(chippedPuppies);
    } catch (error) {
        // Handle errors if the database query fails
        console.error('Error fetching chipped puppies:', error);
        res.status(500).json({ error: 'Failed to fetch chipped puppies' });
    }
});


// STEP 3
// One puppy matching a name param
// Finding one record by attribute
app.get('/puppies/name/:name', async (req, res) => {
    const { name } = req.params; // Extract the name parameter from the request URL

    try {
        // Query the database using Sequelize to find the puppy by name
        const puppy = await Puppy.findOne({
            where: { name } // Finding the puppy with the specified name
        });

        if (!puppy) {
            // If no puppy is found with the given name, return a 404 Not Found response
            return res.status(404).json({ error: 'Puppy not found' });
        }

        // Send the retrieved puppy as a response
        res.json(puppy);
    } catch (error) {
        // Handle errors if the database query fails
        console.error('Error fetching puppy by name:', error);
        res.status(500).json({ error: 'Failed to fetch puppy by name' });
    }
});


// BONUS STEP 5
// All puppies with breed ending in 'Shepherd'
// WHERE clause with a comparison
app.get('/puppies/shepherds', async (req, res, next) => {
    let shepherds;
    
    // Your code here

    res.json(shepherds);
})


// BONUS STEP 6
// All puppies with ageYrs <= 1yr and weightLbs <= 20lbs
// WHERE clause with multiple attributes and comparisons
app.get('/puppies/tinybabies', async (req, res, next) => {
    let tinyBabyPuppies;
    
    // Your code here

    res.json(tinyBabyPuppies);
})


// STEP 4
// One puppy matching an id param
// Finding one record by primary key
app.get('/puppies/:id', async (req, res) => {
    const { id } = req.params; // Extract the id parameter from the request URL

    try {
        // Query the database using Sequelize to find the puppy by id
        const puppy = await Puppy.findByPk(id); // Using findByPk to find by primary key (id)

        if (!puppy) {
            // If no puppy is found with the given id, return a 404 Not Found response
            return res.status(404).json({ error: 'Puppy not found' });
        }

        // Send the retrieved puppy as a response
        res.json(puppy);
    } catch (error) {
        // Handle errors if the database query fails
        console.error('Error fetching puppy by id:', error);
        res.status(500).json({ error: 'Failed to fetch puppy by id' });
    }
});


// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));