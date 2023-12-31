Authenticate Me - Phase 4
No one has completed this Project lately, be the first!
It's finally time to create the authentication API routes!

In this section, you will add the following routes to your Express application:

Login: POST /api/session
Logout: DELETE /api/session
Signup: POST /api/users
Get session user: GET /api/session
First, create a file called session.js in the backend/routes/api folder. This file will hold the resources for the route paths beginning with /api/session. Create and export an Express router from this file.

// backend/routes/api/session.js
const express = require('express')
const router = express.Router();

module.exports = router;
Next create a file called users.js in the backend/routes/api folder. This file will hold the resources for the route paths beginning with /api/users. Create and export an Express router from this file.

// backend/routes/api/users.js
const express = require('express')
const router = express.Router();

module.exports = router;
Connect all the routes exported from these two files in the index.js file nested in the backend/routes/api folder.

Your backend/routes/api/index.js file should now look like this:

// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
User Login API Route
In the backend/routes/api/session.js file, import the following code at the top of the file and create an Express router:

// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();
Next, add the POST /api/session route to the router using an asynchronous route handler. In the route handler, call the login static method from the User model. If there is a user returned from the login static method, then call setTokenCookie and return a JSON response with the user information. If there is no user returned from the login static method, then create a "Login failed" error and invoke the next error-handling middleware with it.

// backend/routes/api/session.js
// ...

// Log in
router.post(
  '/',
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);
Make sure to export the router at the bottom of the file.

// backend/routes/api/session.js
// ...

module.exports = router;
Test the Login Route
Test the login route by navigating to the http://localhost:8000/api/csrf/restore route and making a fetch request from the browser's DevTools console. Remember, you need to pass in the value of the XSRF-TOKEN cookie as a header in the fetch request because the login route has a POST HTTP verb.

If at any point you don't see the expected behavior while testing, then check your backend server logs in the terminal where you ran npm start. Also, check the syntax in the session.js as well as the login method in the user.js model file.

Try to login the demo user with the username first.

fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));
Remember to replace the <value of XSRF-TOKEN cookie> with the value of the XSRF-TOKEN cookie found in your browser's DevTools. If you don't have the XSRF-TOKEN cookie anymore, access the http://localhost:8000/api/csrf/restore route to add the cookie back.

Then try to login the demo user with the email next.

fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));
Now test an invalid user credential and password combination.

fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({ credential: 'Demo-lition', password: 'Hello World!' })
}).then(res => res.json()).then(data => console.log(data));
You should get a Login failed error back with an invalid password for the user with that credential.

Commit your code for the login route once you are done testing!

User Logout API Route
The DELETE /api/session logout route will remove the token cookie from the response and return a JSON success message.

// backend/routes/api/session.js
// ...

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// ...
Test the Logout Route
Start by navigating to the http://localhost:8000/api/csrf/restore route and making a fetch request from the browser's DevTools console to test the logout route. Check that you are logged in by confirming that a token cookie is in your list of cookies in the browser's DevTools. Remember, you need to pass in the value of the XSRF-TOKEN cookie as a header in the fetch request because the logout route has a DELETE HTTP verb.

Try to logout the session user.

fetch('/api/session', {
  method: 'DELETE',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  }
}).then(res => res.json()).then(data => console.log(data));
You should see the token cookie disappear from the list of cookies in your browser's DevTools. If you don't have the XSRF-TOKEN cookie anymore, access the http://localhost:8000/api/csrf/restore route to add the cookie back.

If you don't see this expected behavior while testing, then check your backend server logs in the terminal where you ran npm start as well as the syntax in the session.js route file.

Commit your code for the logout route once you are done testing!

User Signup API Route
In the backend/routes/api/users.js file, import the following code at the top of the file and create an Express router:

const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();
Next, add the POST /api/users route to the router using an asynchronous route handler. In the route handler, call the signup static method on the User model. If the user is successfully created, then call setTokenCookie and return a JSON response with the user information. If the creation of the user is unsuccessful, then a Sequelize Validation error will be passed onto the next error-handling middleware.

// backend/routes/api/users.js
// ...

// Sign up
router.post(
  '/',
  async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);
Make sure to export the router at the bottom of the file.

// backend/routes/api/users.js
// ...

module.exports = router;
Test the Signup Route
Test the signup route by navigating to the http://localhost:8000/api/csrf/restore route and making a fetch request from the browser's DevTools console. Remember, you need to pass in the value of the XSRF-TOKEN cookie as a header in the fetch request because the login route has a POST HTTP verb.

If at any point you don't see the expected behavior while testing, check your backend server logs in the terminal where you ran npm start. Also, check the syntax in the users.js route file as well as the signup method in the user.js model file.

Try to signup a new valid user.

fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({
    email: 'spidey@spider.man',
    username: 'Spidey',
    password: 'password'
  })
}).then(res => res.json()).then(data => console.log(data));
Remember to replace the <value of XSRF-TOKEN cookie> with the value of the XSRF-TOKEN cookie found in your browser's DevTools. If you don't have the XSRF-TOKEN cookie anymore, access the http://localhost:8000/api/csrf/restore route to add the cookie back.

Next, try to hit the Sequelize model validation errors by testing the following which should give back a Validation error:

email is not unique (signup with an existing email)
username is not unique (signup with an existing username)
If you don't see the Validation error for any of these, check the syntax in your backend/db/models/user.js model file.

Commit your code for the signup route once you are done testing!

Get Session User API Route
The GET /api/session get session user route will return the session user as JSON under the key of user . If there is not a session, it will return a JSON with an empty object. To get the session user, connect the restoreUser middleware.

Add the route to the router in the backend/routes/api/session.js file.

// backend/routes/api/session.js
// ...

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

// ...
Test the Get Session User Route
Test the route by navigating to http://localhost:8000/api/session. You should see the current session user information if you have the token cookie. If you don't have a token cookie, you should see an empty object returned.

If you don't have the XSRF-TOKEN cookie anymore, access the http://localhost:8000/api/csrf/restore route to add the cookie back.

If you don't see this expected behavior, then check your backend server logs in your terminal where you ran npm start and the syntax in the session.js route file and the restoreUser middleware function.

Commit your code for the get session user route once you are done testing!