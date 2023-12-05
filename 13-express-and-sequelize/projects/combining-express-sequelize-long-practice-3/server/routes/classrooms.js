// Instantiate router - DO NOT MODIFY
const express = require('express');
const router = express.Router();

// Import model(s)
const { Classroom, Supply, Student, StudentClassroom, Sequelize } = require('../db/models');
const { Op } = require('sequelize');

// List of classrooms
router.get('/', async (req, res, next) => {
    let errorResult = { errors: [], count: 0, pageCount: 0 };

    // Phase 6AB: Classroom Search Filters
    /*
        name filter:
            If the name query parameter exists, set the name query
                filter to find a similar match to the name query parameter.
            For example, if name query parameter is 'Ms.', then the
                query should match with classrooms whose name includes 'Ms.'

        studentLimit filter:
            If the studentLimit query parameter includes a comma
                And if the studentLimit query parameter is two numbers separated
                    by a comma, set the studentLimit query filter to be between
                    the first number (min) and the second number (max)
                But if the studentLimit query parameter is NOT two integers
                    separated by a comma, or if min is greater than max, add an
                    error message of 'Student Limit should be two integers:
                    min,max' to errorResult.errors
            If the studentLimit query parameter has no commas
                And if the studentLimit query parameter is a single integer, set
                    the studentLimit query parameter to equal the number
                But if the studentLimit query parameter is NOT an integer, add
                    an error message of 'Student Limit should be a integer' to
                    errorResult.errors 
    */
    const where = {};

    // Your code here
    if (req.query.name) {
        where.name = {[Op.like]: '%' + req.query.name + '%'}
    }
    if (req.query.studentLimit) {
        
        let limits = req.query.studentLimit.split(',');
        console.log(limits.length);
        if (limits.length > 1 && Number.isInteger(+ limits[0]) && Number.isInteger(+ limits[1])
            && (+ limits[0] <= + limits[1]) ) {
                // all good
            where.studentLimit = {[Op.between]: [+ limits[0], + limits[1]] }    

        } else if (limits.length > 1) {
            errorResult.errors.push("Student Limit should be two numbers: min,max")
        } else if (Number.isInteger(+ req.query.studentLimit)) {
            where.studentLimit = + req.query.studentLimit;
        } else  {
            errorResult.errors.push("Student Limit should be an integer");
        }   
    }

    const classrooms = await Classroom.findAll({
        attributes: [ 'id', 'name', 'studentLimit' ],
        // Phase 9A
        include: {
            model: StudentClassroom,
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('grade')), 'avgGrade'],
                [Sequelize.fn('COUNT', Sequelize.col('classroomId')), 'numStudents']
            ],
            
        },
        group: ['Classroom.id'],

        where,
        // Phase 1B: Order the Classroom search results
        order: ['name'],          
    });

  if (errorResult.errors.length > 0) {
        errorResult.count = await Classroom.count({
            where
        });
        let err = {};
        err.status = 400;
        err.errors = errorResult;
        next(err);
    }
    res.json(classrooms);
});

// Single classroom
router.get('/:id', async (req, res, next) => {
    
    let classroom = await Classroom.findByPk(req.params.id, {
        attributes: ['id', 'name', 'studentLimit'],        
        
        // Phase 7:
            // Include classroom supplies and order supplies by category then
                // name (both in ascending order)
            // Include students of the classroom and order students by lastName
                // then firstName (both in ascending order)
                // (Optional): No need to include the StudentClassrooms
        // Your code here   
       raw:true //this option allow includes properties directly? gives pojo clean
    });
    if (!classroom) {
        res.status(404);
        res.send({ message: 'Classroom Not Found' });
    }
    let supplies = await Supply.findAll({        
        attributes: ['id', 'name', 'category', 'handed'],
        where: {classroomId: classroom.id},
        order: [['category'], ['name']],
    });
    classroom.supplies = supplies; 

    let students = await Student.findAll({        
        attributes: ['id', 'firstName', 'lastName', 'leftHanded'],
        include: {
            model: StudentClassroom,
            attributes:[],
            where: {classroomId: classroom.id}
        },
        
        order: [['lastName'], ['firstName']],
    });
    classroom.students = students;       

    

    // Phase 5: Supply and Student counts, Overloaded classroom
        // Phase 5A: Find the number of supplies the classroom has and set it as
            // a property of supplyCount on the response
        // Phase 5B: Find the number of students in the classroom and set it as
            // a property of studentCount on the response
        // Phase 5C: Calculate if the classroom is overloaded by comparing the
            // studentLimit of the classroom to the number of students in the
            // classroom
        // Optional Phase 5D: Calculate the average grade of the classroom 
    // Your code here 
   
   
        let supplyCount = await Supply.count({where:{classroomId: req.params.id}})        
        classroom.supplyCount = supplyCount // returns 16 not 19 on classroom=1

        let studentCount = await StudentClassroom.count({where:{classroomId: req.params.id}}) 
        classroom.studentCount = studentCount;

        classroom.overloaded = studentCount > classroom.studentLimit ? true : false;

        let avgGrade = await StudentClassroom.findOne({
            attributes: [[Sequelize.fn("AVG", Sequelize.col("grade")), "avgGrade"]],
            where:{classroomId: req.params.id}
        })
        console.log(avgGrade);
        classroom = Object.assign(classroom, avgGrade.toJSON())
    res.json(classroom);
});

// Export class - DO NOT MODIFY
module.exports = router;