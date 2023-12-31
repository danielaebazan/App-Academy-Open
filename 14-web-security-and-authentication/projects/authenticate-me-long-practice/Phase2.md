Authenticate Me - Phase 2

The next step is to set up your server error handlers.

Connect the following error handling middlewares after your route connections in app.js (i.e., after app.use(routes)). Here is a refresher on how to create an Express error-handling middleware.

Resource Not Found Error-Handler
The first error handler is actually just a regular middleware. It will catch any requests that don't match any of the routes defined and create a server error with a status code of 404.

// backend/app.js
// ...
// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});
If this resource-not-found middleware is called, an error will be created with the message "The requested resource couldn't be found." and a status code of 404. Afterwards, next will be invoked with the error. Remember, next invoked with nothing means that error handlers defined after this middleware will not be invoked. However, next invoked with an error means that error handlers defined after this middleware will be invoked.

Sequelize Error-Handler
The second error handler is for catching Sequelize errors and formatting them before sending the error response.

// backend/app.js
// ...
const { ValidationError } = require('sequelize');

// ...

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});
If the error that caused this error-handler to be called is an instance of ValidationError from the sequelize package, then the error was created from a Sequelize database validation error and the additional keys of title string and errors array will be added to the error and passed into the next error handling middleware.

Error Formatter Error-Handler
The last error handler is for formatting all the errors before returning a JSON response. It will include the error message, the errors array, and the error stack trace (if the environment is in development) with the status code of the error message.

// backend/app.js
// ...
// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});
This should be the last middleware in the app.js file of your Express application.

Testing the Error Handlers
You can't really test the Sequelize error handler now because you have no Sequelize models to test it with, but you can test the Resource Not Found error handler and the Error Formatter error handler.

To do this, try to access a route that hasn't been defined in your routes folder yet, like http://localhost:8000/not-found.

If you see the json below, you have successfully set up your Resource Not Found and Error Formatter error handlers!

{
  "title": "Resource Not Found",
  "message": "The requested resource couldn't be found.",
  "errors": [
    "The requested resource couldn't be found."
  ],
  "stack": "Error: The requested resource couldn't be found.\n ...<stack trace>..."
}
If you don't see the json above, check your backend server logs in your terminal where you ran npm start.

Make sure your route at http://localhost:8000/api/csrf/restore is still working. If it is not working, make sure you are defining your error handlers after your route connections in app.js (i.e., after app.use(routes)).

You will test the Sequelize error handler later when you populate the database with a table.

Before moving onto the next task, commit your error handling code!