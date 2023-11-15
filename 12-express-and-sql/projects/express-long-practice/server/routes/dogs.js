const express = require('express');
const router = express.Router();

// ------------------------------  SERVER DATA ------------------------------  

let nextDogId = 1;
function getNewDogId() {
  const newDogId = nextDogId;
  nextDogId++;
  return newDogId;
}

const dogs = [
  {
    dogId: getNewDogId(),
    name: "Fluffy"
  },
  {
    dogId: getNewDogId(),
    name: "Digby"
  }
];

// ------------------------------  MIDDLEWARES ------------------------------ 

const validateDogInfo = (req, res, next) => {
  if (!req.body || !req.body.name) {
    const err = new Error("Dog must have a name");
    err.statusCode = 400;
    return next(err);
  }
  next();
};

const validateDogId = (req, res, next) => {
  const { dogId } = req.params;
  const dog = dogs.find(dog => dog.dogId == dogId);
  if (!dog) {
    const err = new Error("Couldn't find dog with that dogId");
    err.statusCode = 404;
    return next(err);
  }
  next();
};

// ------------------------------  ROUTE HANDLERS ------------------------------  

// GET /dogs
router.get('/', getAllDogs);

// GET /dogs/:dogId
router.get('/:dogId', validateDogId, getDogById);

// POST /dogs
router.post('/', validateDogInfo, createDog);

// PUT /dogs/:dogId
router.put('/:dogId', validateDogId, validateDogInfo, updateDog);

// DELETE /dogs/:dogId
router.delete('/:dogId', validateDogId, deleteDog);

// ------------------------------  ERROR HANDLING MIDDLEWARE ------------------------------  
/*
const errorHandler = (err, req, res, next) => {
  // Log the error to the terminal
  console.error(err.stack);

  // Set the status code of the response
  const statusCode = err.statusCode || 500;

  // Send a JSON response with error details
  res.status(statusCode).json({
    message: err.message || "Something went wrong",
    statusCode: statusCode,
    stack: err.stack
  });
};
*/

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const responseObj = {
    message: err.message || "Something went wrong",
    statusCode: statusCode
  };

  if (process.env.NODE_ENV !== 'production') {
    responseObj.stack = err.stack;
  }

  res.status(statusCode).json(responseObj);
};

// ------------------------------  ROUTER EXPORT ------------------------------  

module.exports = router;

// ------------------------------  ERROR HANDLING MIDDLEWARE CONNECTION ------------------------------  

app.use(errorHandler);