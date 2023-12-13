
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
; // for inner call to external api
const csrf = require('csurf');
const { check, validationResult } = require('express-validator');

const db = require('./db/models');

const router = express.Router();

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

let rating, email

router.get('/', asyncHandler(async (req, res) => {
  const books = await db.Book.findAll({ order: [['title', 'ASC']] });
  res.render('book-list', { title: 'Books', books });
}));

router.get('/book/add', csrfProtection, (req, res) => {
  const book = db.Book.build();
  res.render('book-add', {
    title: 'Add Book',
    book,
    csrfToken: req.csrfToken(),
  });
});
// Phase 3 ->
router.get('/book/:id(\\d+)', csrfProtection,
  asyncHandler(async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = await db.Book.findByPk(bookId);
    let ratings
    
    // const ratings = {
    //   "average": 1,
    //   "ratings": [
    //     {
    //       "value": 1
    //     }
    //   ]
    // }
    try {
      const res = await fetch('http://host.docker.internal:5000/ratings/' + bookId)
      ratings = await res.json()
      
    } catch (error) {    
      console.log("Error: " + error.message);
    };    
    console.log('ratings:: ', ratings);
    // process book rating not exist:
    if (!ratings.average) {
      ratings.average = '-'
      ratings.ratings = [{"value": "no ratings yet" }]
    }

    res.render('book-details-ratings', {
      title: 'Book details-ratings',
      book, ratings,
      csrfToken: req.csrfToken(),
    });
  }));

  const rateValidators = [
    check('rating')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Rating')
      .isInt({ min: 0, max: 10 })
      .withMessage('Please provide a valid integer from 0 to 10 for Rating'),
    check('email')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for email')
      .isEmail()
      .withMessage('Email must be valid'),
  ];

  router.get('/book/:id(\\d+)/rate', csrfProtection,
  asyncHandler(async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    //const book = await db.Book.findByPk(bookId);
    res.render('book-rate', {
      title: `Rate Book id:${bookId}`,
      bookId,
      rating,
      email,
      csrfToken: req.csrfToken(),
    });
  }));


router.post('/book/:id(\\d+)/rate/add', csrfProtection, rateValidators,
  asyncHandler(async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const {
      rating,
      email
    } = req.body;
    const validatorErrors = validationResult(req);
    //validatorErrors.errors.push({msg:'This is a test error'})
    console.log(validatorErrors);
    if (validatorErrors.isEmpty()) {
       //TRY TODO await post rating
      try {
        const URL = `http://host.docker.internal:5000/ratings/${bookId}?value=${rating}&email=${email}`
        // this next syntax has to work, but it doesnot. Probably because of 'alpine' node
        // supposed to set body=params
        // const params = new URLSearchParams();
        // params.append('value', rating);
        // params.append('email', email);

        const res = await fetch(URL, {method: 'POST'});
        const result = await res.json()
        if (!res.ok) {
          validatorErrors.errors.push({msg:`Error writing rating: ${res.status}, ${result.error}`})
        }

        
      } catch (error) {    
        console.log("Error: " + error.message);
        validatorErrors.errors.push({msg:`Error writing rating: ${error.message}`})
      }; 
    };
    
    if (validatorErrors.isEmpty()) {
     
      res.render('message', {        
        message: `Book id = ${bookId}\nYour rating = ${rating},\nYour email = ${email}\n`+
        'trying to record...\n'+
        'SUCCESS',
        redirect: `/book/${bookId}`
      })
      // res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('book-rate', {
        title: 'Rate Book',              
        errors,
        bookId,       
        rating,
        email,
        csrfToken: req.csrfToken(),
      });
    }
  }));

// <- Phase 3


const bookValidators = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Title')
    .isLength({ max: 255 })
    .withMessage('Title must not be more than 255 characters long'),
  check('author')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Author')
    .isLength({ max: 100 })
    .withMessage('Author must not be more than 100 characters long'),
  check('releaseDate')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Release Date')
    .isISO8601()
    .withMessage('Please provide a valid date for Release Date'),
  check('pageCount')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Page Count')
    .isInt({ min: 0 })
    .withMessage('Please provide a valid integer for Page Count'),
  check('publisher')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Publisher')
    .isLength({ max: 100 })
    .withMessage('Publisher must not be more than 100 characters long'),
];

router.post('/book/add', csrfProtection, bookValidators,
  asyncHandler(async (req, res) => {
    const {
      title,
      author,
      releaseDate,
      pageCount,
      publisher,
    } = req.body;

    const book = db.Book.build({
      title,
      author,
      releaseDate,
      pageCount,
      publisher,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await book.save();
      res.render('message', {        
        message: 'Book successfully added',
        redirect: '/'
      })
      // res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('book-add', {
        title: 'Add Book',
        book,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  }));

router.get('/book/edit/:id(\\d+)', csrfProtection,
  asyncHandler(async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = await db.Book.findByPk(bookId);
    res.render('book-edit', {
      title: 'Edit Book',
      book,
      csrfToken: req.csrfToken(),
    });
  }));

router.post('/book/edit/:id(\\d+)', csrfProtection, bookValidators,
  asyncHandler(async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const bookToUpdate = await db.Book.findByPk(bookId);

    const {
      title,
      author,
      releaseDate,
      pageCount,
      publisher,
    } = req.body;

    const book = {
      title,
      author,
      releaseDate,
      pageCount,
      publisher,
    };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await bookToUpdate.update(book);
      res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('book-edit', {
        title: 'Edit Book',
        book: { ...book, bookId },
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  }));

router.get('/book/delete/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = await db.Book.findByPk(bookId);
  res.render('book-delete', {
    title: 'Delete Book',
    book,
    csrfToken: req.csrfToken(),
  });
}));

router.post('/book/delete/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = await db.Book.findByPk(bookId);
  await book.destroy();
  res.redirect('/');
}));

module.exports = router;
