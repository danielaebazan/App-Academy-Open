const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('GET / This is the root URL');
});
/*
// Resource Not Found Middleware
app.use((req, res, next) => {
  const error = new Error('Sorry, the requested resource couldn\'t be found');
  error.statusCode = 404;
  next(error);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send(err.message);
});
*/

// Resource Not Found Middleware
app.use((req, res, next) => {
  const error = new Error('Sorry, the requested resource couldn\'t be found');
  error.statusCode = 404;
  next(error);
});

// Catch-all Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error to the server console

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    statusCode: statusCode,
  });
});

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));