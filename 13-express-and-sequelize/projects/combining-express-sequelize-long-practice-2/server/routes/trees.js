// Instantiate router - DO NOT MODIFY
const express = require('express');
const router = express.Router();

/**
 * BASIC PHASE 1, Step A - Import model
 */
// Your code here
const { Tree } = require('../db/models')
console.log('Tree', Tree);
/**
 * INTERMEDIATE BONUS PHASE 1 (OPTIONAL), Step A:
 *   Import Op to perform comparison operations in WHERE clauses
 **/
// Your code here
const { Op } = require("sequelize");

/**
 * BASIC PHASE 1, Step B - List of all trees in the database
 *
 * Path: /
 * Protocol: GET
 * Parameters: None
 * Response: JSON array of objects
 *   - Object properties: heightFt, tree, id
 *   - Ordered by the heightFt from tallest to shortest
 */
router.get('/', async (req, res, next) => {
    let trees = [];

    // Your code here
    trees = await Tree.findAll({
        attributes: ['heightFt', 'tree', 'id'],
        order: [['heightFt', 'desc']]
    })

    res.json(trees);
});

/**
 * BASIC PHASE 1, Step C - Retrieve one tree with the matching id
 *
 * Path: /:id
 * Protocol: GET
 * Parameter: id
 * Response: JSON Object
 *   - Properties: id, tree, location, heightFt, groundCircumferenceFt
 */
router.get('/:id', async (req, res, next) => {
    let tree;

    try {
        // Your code here
        let id = req.params.id;
        tree = await Tree.findByPk(id)

        if (tree) {
            res.json(tree);
        } else {
            next({
                status: "not-found",
                message: `Could not find tree ${req.params.id}`,
                details: 'Tree not found'
            });
        }
    } catch (err) {
        next({
            status: "error",
            message: `Could not find tree ${req.params.id}`,
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }
});

/**
 * BASIC PHASE 2 - INSERT tree row into the database
 *
 * Path: /trees
 * Protocol: POST
 * Parameters: None
 * Request Body: JSON Object
 *   - Properties: name, location, height, size
 * Response: JSON Object
 *   - Property: status
 *     - Value: success
 *   - Property: message
 *     - Value: Successfully created new tree
 *   - Property: data
 *     - Value: object (the new tree)
 */
router.post('/', async (req, res, next) => {
    try {
        const newTree = await Tree.create(
            {
                tree: req.body.name,
                location: req.body.location,
                heightFt: req.body.height,
                groundCircumferenceFt: req.body.size
            }
        )

        res.json({
            status: "success",
            message: "Successfully created new tree",
            data_used: newTree,
            data_new: await Tree.findByPk(newTree.id)
        });
    } catch (err) {
        next({
            status: "error",
            message: 'Could not create new tree',
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }
});

/**
 * BASIC PHASE 3 - DELETE a tree row from the database
 *
 * Path: /trees/:id
 * Protocol: DELETE
 * Parameter: id
 * Response: JSON Object
 *   - Property: status
 *     - Value: success
 *   - Property: message
 *     - Value: Successfully removed tree <id>
 * Custom Error Handling:
 *   If tree is not in database, call next() with error object
 *   - Property: status
 *     - Value: not-found
 *   - Property: message
 *     - Value: Could not remove tree <id>
 *   - Property: details
 *     - Value: Tree not found
 */
router.delete('/:id', async (req, res, next) => {
    let treeToDeleteById = {};

    treeToDeleteById = await Tree.findByPk(req.params.id);
    if (!treeToDeleteById) {
        next({
            status: "error",
            message: `Could not remove tree ${req.params.id}`,
            details: 'Tree not found'
        });
    }

    try {
        await treeToDeleteById.destroy();

        res.json({
            status: "success",
            message: `Successfully removed tree ${req.params.id}`,
        });
    } catch (err) {
        next({
            status: "error",
            message: `Could not remove tree ${req.params.id}`,
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }
});

/**
 * INTERMEDIATE PHASE 4 - UPDATE a tree row in the database
 *   Only assign values if they are defined on the request body
 *
 * Path: /trees/:id
 * Protocol: PUT
 * Parameter: id
 * Request Body: JSON Object
 *   - Properties: id, name, location, height, size
 * 
 * Response: JSON Object
 *   - Property: status
 *     - Value: success
 *   - Property: message
 *     - Value: Successfully updated tree
 *   - Property: data
 *     - Value: object (the updated tree)
 * Custom Error Handling 1/2:
 *   If id in request params does not match id in request body,
 *   call next() with error object
 *   - Property: status
 *     - Value: error
 *   - Property: message
 *     - Value: Could not update tree <id>
 *   - Property: details
 *     - Value: <params id> does not match <body id>
 * Custom Error Handling 2/2:
 *   If tree is not in database, call next() with error object
 *   - Property: status
 *     - Value: not-found
 *   - Property: message
 *     - Value: Could not update tree <id>
 *   - Property: details
 *     - Value: Tree not found
 */
router.put('/:id', async (req, res, next) => {
    let treeToUpdateById = {};
    try {
        // Your code here     

        treeToUpdateById = await Tree.findByPk(req.params.id);
        if (!treeToUpdateById) {
            next({
                status: "error",
                message: `Could not update tree ${req.params.id}`,
                details: 'Tree not found'
            });
        } else if (req.body.id !== req.params.id) {
            res.json({
                status: 'error',
                message: 'Could not update tree',
                details: '<params id> does not match <body id>'
            })
        } else {
            treeToUpdateById.set({
                tree: req.body.name,
                location: req.body.location,
                heightFt: req.body.height,
                groundCircumferenceFt: req.body.size
            })
            treeToUpdateById.save();
            res.json({
                status: 'success',
                message: 'Successfully updated tree',
                data: treeToUpdateById
            })
        }
    } catch (err) {
        next({
            status: "error",
            message: 'Could not update new tree',
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }

})
/**
 * INTERMEDIATE BONUS PHASE 1 (OPTIONAL), Step B:
 *   List of all trees with tree name like route parameter
 *
 * Path: /search/:value
 * Protocol: GET
 * Parameters: value
 * Response: JSON array of objects
 *   - Object properties: heightFt, tree, id
 *   - Ordered by the heightFt from tallest to shortest
 */
router.get('/search/:value', async (req, res, next) => {
    let trees = [];
    try {

        trees = await Tree.findAll({
            attributes: ['heightFt', 'tree', 'id'],
            where: {
                tree: {
                    [Op.substring]: req.params.value
                }
            },
            order: ['tree']
        });
        
        if (trees.length === 0) {
            next({
                status: "error",
                message: `Could not find tree like ${req.params.value}`,
                details: 'Tree not found'
            });
        } else {
            res.json(trees);
        }
    } catch (err) {
        next({
            status: "error",
            message: 'Could not find tree',
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }

    
});

// Export class - DO NOT MODIFY
module.exports = router;