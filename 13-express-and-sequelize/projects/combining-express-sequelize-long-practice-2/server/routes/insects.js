// Instantiate router - DO NOT MODIFY
const express = require('express');
const router = express.Router();

/**
 * INTERMEDIATE BONUS PHASE 2 (OPTIONAL) - Code routes for the insects
 *   by mirroring the functionality of the trees
 */
// Your code here
const { Op } = require("sequelize");
const { Insect } = require('../db/models');
//List of insects returning id, name, and millimeters ordered by millimeters from smallest to largest
router.get('/', async (req, res, next) => {
    let insects = [];

    // Your code here
    insects = await Insect.findAll({
        attributes: ['id', 'name', 'millimeters'],
        order: [['millimeters', 'asc']]
    })

    res.json(insects);
});

// Fetch an insect by id
router.get('/:id', async (req, res, next) => {
    let insect;

    let id = req.params.id;
    insect = await Insect.findByPk(id)

    if (insect) {
        res.json(insect);
    } else {
        next({
            status: "not-found",
            message: `Could not find insect ${req.params.id}`,
            details: 'Insect not found'
        });
    }
});

// Create an insect

router.post('/', async (req, res, next) => {
    try {
        const newInsect = await Insect.create(
            {
                name: req.body.name,
                description: req.body.description,
                fact: req.body.fact,
                territory: req.body.territory,
                millimeters: req.body.millimeters
            }
        )

        res.json({
            status: "success",
            message: "Successfully created new insect",
            data_used: newInsect,
            data_new: await Insect.findByPk(newInsect.id)
        });
    } catch (err) {
        next({
            status: "error",
            message: 'Could not create new insect',
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }
});

// DELETE an insect:
router.delete('/:id', async (req, res, next) => {
    let insectToDeleteById = {};

    insectToDeleteById = await Insect.findByPk(req.params.id);
    if (!insectToDeleteById) {
        next({
            status: "error",
            message: `Could not remove insect ${req.params.id}`,
            details: 'Insect not found'
        });
    }

    try {
        await insectToDeleteById.destroy();

        res.json({
            status: "success",
            message: `Successfully removed insect ${req.params.id}`,
        });
    } catch (err) {
        next({
            status: "error",
            message: `Could not remove insect ${req.params.id}`,
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }
});

// update an insect:

router.put('/:id', async (req, res, next) => {
    let insectToUpdateById = {};
    try {
        // Your code here     

        insectToUpdateById = await Insect.findByPk(req.params.id);
        if (!insectToUpdateById) {
            next({
                status: "error",
                message: `Could not update insect ${req.params.id}`,
                details: 'Insect not found'
            });
        } else if (req.body.id.toString() !== req.params.id.toString()) {
            res.json({
                status: 'error',
                message: 'Could not update insect',
                details: '<params id> does not match <body id>'
            })
        } else {
            insectToUpdateById.set({
                name: req.body.name,
                description: req.body.description,
                fact: req.body.fact,
                territory: req.body.territory,
                millimeters: req.body.millimeters
            })
            insectToUpdateById.save();
            res.json({
                status: 'success',
                message: 'Successfully updated insect',
                data: insectToUpdateById
            })
        }
    } catch (err) {
        next({
            status: "error",
            message: 'Could not update new insect',
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }

})

//Search for an insect by name
router.get('/search/:value', async (req, res, next) => {
    let insects = [];
    try {

        insects = await Insect.findAll({
            attributes: ['millimeters', 'name', 'id'],
            where: {
                name: {
                    [Op.substring]: req.params.value
                }
            },
            order: ['name']
        });
        
        if (insects.length === 0) {
            next({
                status: "error",
                message: `Could not find insect like ${req.params.value}`,
                details: 'Insect not found'
            });
        } else {
            res.json(insects);
        }
    } catch (err) {
        next({
            status: "error",
            message: 'Could not find insect',
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }

    
});


// Export class - DO NOT MODIFY
module.exports = router;