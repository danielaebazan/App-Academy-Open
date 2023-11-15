require('dotenv').config();
const express = require('express');
const app = express();
const dogsRouter = require('./routes/dogs');
const dogFoodsRouter = require('./routes/dog-foods'); // Import the dog-foods router
const path = require('path'); // Include the 'path' module

// Connect the dogs router at '/dogs' base URL
app.use('/dogs', dogsRouter);

// Connect the dog-foods router to the dogs router for nested routing
app.use('/dogs/:dogId/foods', dogFoodsRouter);

// Define the path to the assets folder
const assetsPath = path.join(__dirname, 'assets');

// Serve all the files in the assets folder under the static resource
app.use('/static', express.static(assetsPath));

/* Logger middleware to log method and URL path
app.use((req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method} ${req.url}`);
  next();
});
*/

// Logger middleware to log method, URL path, and response status code
app.use((req, res, next) => {
  // Log method and URL path
  console.log(`[${new Date().toUTCString()}] ${req.method} ${req.url}`);

  // Event listener for response finish event to log the status code
  res.on('finish', () => {
    console.log(`[${new Date().toUTCString()}] Response Status: ${res.statusCode}`);
  });

  next();
});

// For testing purposes, GET /
app.get('/', (req, res) => {
  res.json("Express server running. No content provided at root level. Please use another route.");
});

// Middleware to parse JSON bodies
app.use(express.json());

// For testing express.json middleware
app.post('/test-json', (req, res, next) => {
  // send the body as JSON with a Content-Type header of "application/json"
  // finishes the response, res.end()
  res.json(req.body);
  next();
});

// For testing express-async-errors
app.get('/test-error', async (req, res) => {
  throw new Error("Hello World!")
});

// Middleware for handling 404 errors
app.use((req, res, next) => {
  const error = new Error("The requested resource couldn't be found.");
  error.statusCode = 404;
  throw error;
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Default status code for errors if not set
  const statusCode = err.statusCode || 500;

  res.status(statusCode).send(err.message);
});

/* Global error handler - This will catch any unhandled errors in the routes or middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging purposes
  res.status(500).send('Internal Server Error');
});
*/

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));