// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

// Import environment variables in order to connect to database - DO NOT MODIFY
require('dotenv').config();
require('express-async-errors');

// Import the models used in these routes - DO NOT MODIFY
const { Author, Book, Review, Reviewer, sequelize } = require('./db/models');
const { Op } = require("sequelize");


// Express using json - DO NOT MODIFY
app.use(express.json());




// STEP #Ob: Test logging behavior - DO NOT MODIFY
app.get('/test-benchmark-logging', async (req, res) => {   // > 100 ms execution time
    const books = await Book.findAll({
        include: [
            { model: Author }, 
            { model: Review },
            { model: Reviewer }
        ],
        // Uncomment the lines below to see the data structure more clearly
        // limit: 100,
        // offset: 2000
    });
    res.json(books);
});


// STEP #1: Benchmark a Frequently-Used Query
app.get('/books', async (req, res) => {

    let books = await Book.findAll({
        include: Author,        
    });

    // Filter by price if there is a maxPrice defined in the query params
    if (req.query.maxPrice) {
        books = books.filter(book => book.price < parseInt(req.query.maxPrice));
    };
    res.json(books);
});

    // 1a. Analyze:

        // Record Executed Query and Baseline Benchmark Below:
        /*Executed (default): SELECT `Book`.`id`, 
        `Book`.`authorId`, `Book`.`title`, `Book`.`description`,
         `Book`.`date`, `Book`.`price`, `Book`.`createdAt`,
          `Book`.`updatedAt`, `Book`.`AuthorId`, `Author`.`id` 
          AS `Author.id`, `Author`.`firstName` AS `Author.firstName`,
           `Author`.`lastName` AS `Author.lastName`, `Author`.`email` 
           AS `Author.email`, `Author`.`birthdate` AS `Author.birthdate`,
            `Author`.`createdAt` AS `Author.createdAt`, `Author`.`updatedAt` AS
             `Author.updatedAt` 
        FROM `Books` AS `Book` LEFT OUTER JOIN `Authors` AS
              `Author` ON `Book`.`AuthorId` = `Author`.`id`; 
              Elapsed time: 214ms
        */

        // - What is happening in the code of the query itself?
            // loading all books and authors

        // - What exactly is happening as SQL executes this query? 
            // loading all then filtering with js
 



// 1b. Identify Opportunities to Make Query More Efficient

    // - What could make this query more efficient?
        //filter in query
        // index on price


// 1c. Refactor the Query in GET /books
app.get('/books-refactored', async (req, res) => {
    const maxPrice = parseInt(req.query.maxPrice)
    let books = await Book.findAll({
        include: Author, 
        where: {
            price: {
                [Op.lt]: maxPrice
            }
        }       
    });

   
    res.json(books);
});



// 1d. Benchmark the Query after Refactoring

    // Record Executed Query and Baseline Benchmark Below:
    /*Executed (default): 
    SELECT `Book`.`id`, `Book`.`authorId`, `Book`.`title`, `Book`.`description`, `Book`.`date`, `Book`.`price`, `Book`.`createdAt`, `Book`.`updatedAt`, `Book`.`AuthorId`, `Author`.`id` AS `Author.id`, `Author`.`firstName` AS `Author.firstName`, `Author`.`lastName` AS `Author.lastName`, `Author`.`email` AS `Author.email`, `Author`.`birthdate` AS `Author.birthdate`, `Author`.`createdAt` AS `Author.createdAt`, `Author`.`updatedAt` AS `Author.updatedAt` FROM `Books` AS `Book` 
    LEFT OUTER JOIN `Authors` AS `Author` ON `Book`.`AuthorId` = `Author`.`id` 
    WHERE `Book`.`price` < 50; 
    Elapsed time: 75ms
*/
    // Is the refactored query more efficient than the original? Why or Why Not?
    // yes, because filter on sql
// Creating INDEX on price doesn't change speed.
// Probably in filtering by value it is not helps much on such size...
// Removing 'include after refactoring doubles speed.
 



// STEP #2: Benchmark and Refactor Another Query
app.patch('/authors/:authorId/books', async (req, res) => {
    const author = await Author.findOne({
        include: { model: Book },
        where: {
            id: req.params.authorId
        }
    });

    if (!author) {
        res.status(404);
        return res.json({
            message: 'Unable to find an author with the specified authorId'
        });
    }

    for (let book of author.Books) {
        book.price = req.body.price;
        await book.save();
    }

    const books = await Book.findAll({
        where: {
            authorId: author.id
        }
    });

    res.json({
        message: `Successfully updated all authors.`,
        books
    });
});
/*
Executed (default): SELECT `Author`.`id`, `Author`.`firstName`, `Author`.`lastName`, `Author`.`email`, `Author`.`birthdate`, `Author`.`createdAt`, `Author`.`updatedAt`, `Books`.`id` AS `Books.id`, `Books`.`authorId` AS `Books.authorId`, `Books`.`title` AS `Books.title`, `Books`.`description` AS `Books.description`, `Books`.`date` AS `Books.date`, `Books`.`price` AS `Books.price`, `Books`.`createdAt` AS `Books.createdAt`, `Books`.`updatedAt` AS `Books.updatedAt`, `Books`.`AuthorId` AS `Books.AuthorId` FROM `Authors` AS `Author` LEFT OUTER JOIN `Books` AS `Books` ON `Author`.`id` = `Books`.`AuthorId` WHERE `Author`.`id` = '3'; Elapsed time: 13ms
Executed (default): UPDATE `Books` SET `price`=$1,`updatedAt`=$2 WHERE `id` = $3; {"$1":19.99,"$2":"2023-03-16 21:49:38.005 +00:00","$3":3} Elapsed time: 10ms
Executed (default): UPDATE `Books` SET `price`=$1,`updatedAt`=$2 WHERE `id` = $3; {"$1":19.99,"$2":"2023-03-16 21:49:38.024 +00:00","$3":1003} Elapsed time: 6ms
Executed (default): UPDATE `Books` SET `price`=$1,`updatedAt`=$2 WHERE `id` = $3; {"$1":19.99,"$2":"2023-03-16 21:49:38.033 +00:00","$3":2003} Elapsed time: 9ms
Executed (default): UPDATE `Books` SET `price`=$1,`updatedAt`=$2 WHERE `id` = $3; {"$1":19.99,"$2":"2023-03-16 21:49:38.044 +00:00","$3":3003} Elapsed time: 7ms
Executed (default): UPDATE `Books` SET `price`=$1,`updatedAt`=$2 WHERE `id` = $3; {"$1":19.99,"$2":"2023-03-16 21:49:38.052 +00:00","$3":4003} Elapsed time: 8ms
Executed (default): UPDATE `Books` SET `price`=$1,`updatedAt`=$2 WHERE `id` = $3; {"$1":19.99,"$2":"2023-03-16 21:49:38.062 +00:00","$3":5003} Elapsed time: 6ms
Executed (default): UPDATE `Books` SET `price`=$1,`updatedAt`=$2 WHERE `id` = $3; {"$1":19.99,"$2":"2023-03-16 21:49:38.071 +00:00","$3":6003} Elapsed time: 10ms
Executed (default): UPDATE `Books` SET `price`=$1,`updatedAt`=$2 WHERE `id` = $3; {"$1":19.99,"$2":"2023-03-16 21:49:38.083 +00:00","$3":7003} Elapsed time: 8ms
Executed (default): UPDATE `Books` SET `price`=$1,`updatedAt`=$2 WHERE `id` = $3; {"$1":19.99,"$2":"2023-03-16 21:49:38.093 +00:00","$3":8003} Elapsed time: 7ms
Executed (default): UPDATE `Books` SET `price`=$1,`updatedAt`=$2 WHERE `id` = $3; {"$1":19.99,"$2":"2023-03-16 21:49:38.104 +00:00","$3":9003} Elapsed time: 7ms
Executed (default): SELECT `id`, `authorId`, `title`, `description`, `date`, `price`, `createdAt`, `updatedAt`, `AuthorId` FROM `Books` AS `Book` WHERE `Book`.`authorId` = 3; Elapsed time: 4ms
*/

app.patch('/authors/:authorId/books-refactored', async (req, res) => {
    const author = await Author.findByPk(req.params.authorId);

    if (!author) {
        res.status(404);
        return res.json({
            message: 'Unable to find an author with the specified authorId'
        });
    }

    const booksUpd = await Book.update(
        {price: req.body.price},
        {where: 
            {            
                authorId: author.id
            }
        }
    );

    const books = await Book.findAll({
        where: {
            authorId: author.id
        }
    });

    res.json({
        message: `Successfully updated all authors.`,
        books
    });
});
/*
Executed (default): SELECT `id`, `firstName`, `lastName`, `email`, `birthdate`, `createdAt`, `updatedAt` FROM `Authors` AS `Author` WHERE `Author`.`id` = '1'; Elapsed time: 2ms
Executed (default): UPDATE `Books` SET `price`=$1,`updatedAt`=$2 WHERE `authorId` = $3; {"$1":19.97,"$2":"2023-03-16 22:10:13.658 +00:00","$3":1} Elapsed time: 17ms
Executed (default): SELECT `id`, `authorId`, `title`, `description`, `date`, `price`, `createdAt`, `updatedAt`, `AuthorId` FROM `Books` AS `Book` WHERE `Book`.`authorId` = 1; Elapsed time: 4ms
*/
// with index on authorId in books speed is better
/*
Executed (default): SELECT `id`, `firstName`, `lastName`, `email`, `birthdate`, `createdAt`, `updatedAt` FROM `Authors` AS `Author` WHERE `Author`.`id` = '1'; Elapsed time: 2ms
Executed (default): UPDATE `Books` SET `price`=$1,`updatedAt`=$2 WHERE `authorId` = $3; {"$1":19.96,"$2":"2023-03-16 22:12:30.286 +00:00","$3":1} Elapsed time: 11ms
Executed (default): SELECT `id`, `authorId`, `title`, `description`, `date`, `price`, `createdAt`, `updatedAt`, `AuthorId` FROM `Books` AS `Book` WHERE `Book`.`authorId` = 1; Elapsed time: 1ms
*/

// BONUS Step: Benchmark and Add Index
// Examples:
    // GET /reviews?firstName=Daisy&lastName=Herzog
    // GET /reviews?firstName=Daisy
    // GET /reviews?lastName=Herzog
app.get('/reviews', async (req, res) => {
    const { firstName, lastName } = req.query;

    // Check values in query parameters to define where conditions of the query
    const whereClause = {};
    if (firstName) whereClause.firstName = firstName;
    if (lastName) whereClause.lastName = lastName;

    const reviews = await Review.findAll({
        include: {
            model: Reviewer, 
            where: whereClause,
            attributes: ['firstName', 'lastName']
        },
    });

    res.json(reviews);
});
/*
Executed (default): SELECT `Review`.`id`, `Review`.`bookId`, `Review`.`reviewerId`, `Review`.`content`, `Review`.`date`, `Review`.`createdAt`, `Review`.`updatedAt`, `Review`.`BookId`, `Review`.`ReviewerId`, `Reviewer`.`id` AS `Reviewer.id`, `Reviewer`.`firstName` AS `Reviewer.firstName`, `Reviewer`.`lastName` AS `Reviewer.lastName` 
FROM `Reviews` AS `Review` INNER JOIN `Reviewers` AS `Reviewer` ON `Review`.`ReviewerId` = `Reviewer`.`id` 
AND `Reviewer`.`firstName` = 'Daisy' AND `Reviewer`.`lastName` = 'Herzog'; 
Elapsed time: 8ms

*/
/* WITH INDEX:
Executed (default): SELECT `Review`.`id`, `Review`.`bookId`, `Review`.`reviewerId`, `Review`.`content`, `Review`.`date`, `Review`.`createdAt`, `Review`.`updatedAt`, `Review`.`BookId`, `Review`.`ReviewerId`, `Reviewer`.`id` AS `Reviewer.id`, `Reviewer`.`firstName` AS `Reviewer.firstName`, `Reviewer`.`lastName` AS `Reviewer.lastName` FROM `Reviews` AS `Review` INNER JOIN `Reviewers` AS `Reviewer` ON `Review`.`ReviewerId` = `Reviewer`.`id` AND `Reviewer`.`
firstName` = 'Daisy' AND `Reviewer`.`lastName` = 'Herzog'; Elapsed time: 7ms
*/
// same speed...

// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// GET /authors/:authorId/books (test route) - DO NOT MODIFY
app.get('/authors/:authorId/books', async (req, res) => {
    const author = await Author.findOne({
        where: {
            id: req.params.authorId
        }
    });

    if (!author) {
        res.status(404);
        return res.json({ message: 'Unable to find an author with the specified authorId' });
    }

    const books = await Book.findAll({
        where: { authorId: author.id }
    });

    res.json(books);
});

// Set port and listen for incoming requests - DO NOT MODIFY
const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));