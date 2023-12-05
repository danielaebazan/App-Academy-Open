// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

// Error handling, env variables, and json middleware - DO NOT MODIFY
require('express-async-errors');
require('dotenv').config();
app.use(express.json());

// Import the models used in these routes - DO NOT MODIFY
const { Puppy } = require('./db/models');

// Index of all puppies - DO NOT MODIFY
app.get('/puppies', async (req, res, next) => {
    const allPuppies = await Puppy.findAll({order: [['name', 'ASC']]});

    res.json(allPuppies);
});


// STEP 1: Update a puppy by id
app.put('/puppies/:puppyId', async (req, res, next) => {
    // Your code here
    let id = req.params.puppyId;    
    let puppyToUpdateById = await Puppy.findByPk(id);
    if (req.body.age_yrs) puppyToUpdateById.age_yrs = req.body.age_yrs;
    if (req.body.weight_lbs) puppyToUpdateById.weight_lbs = req.body.weight_lbs;
    if (req.body.microchipped) puppyToUpdateById.microchipped = req.body.microchipped;
    await puppyToUpdateById.save();
    let updatedPuppy = await Puppy.findByPk(id);
    res.json({
        message: 'Puppy succesfully updated, rereading new value:',
        puppy: updatedPuppy
    });

})


// STEP 2: Delete a puppy by id
app.delete('/puppies/:puppyId', async (req, res, next) => {
    // Your code here
    let id = req.params.puppyId;    
    let puppyToDeleteById = await Puppy.findByPk(id);
        puppyToDeleteById.destroy();
    let deletedPuppy = await Puppy.findByPk(id);
    if (!deletedPuppy) {
        res.json({
            message: 'Puppy id #' + id + ' succesfully deleted',
            puppy: puppyToDeleteById
        });
    } else {
        throw new Error ('Puppy id #' + id + ' did not deleted');
        //res.json({
        //    message: 'Puppy id #' + id + ' did not deleted'
        //})
    };

})


// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));