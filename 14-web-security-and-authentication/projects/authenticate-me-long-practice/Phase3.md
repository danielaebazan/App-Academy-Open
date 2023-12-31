Authenticate Me - Phase 3
No one has completed this Project lately, be the first!
Now that you have finished setting up both Sequelize and the Express application, you are ready to start implementing user authentication in the backend.

Run npm install bcryptjs to install dependency that you will be using to hash passwords.

With Sequelize, you will create a Users table that will have the following schema:

COLUMN NAME	DATA TYPE	CONSTRAINTS
id	integer	not null, primary key
username	string	not null, indexed, unique, max 30 characters
email	string	not null, indexed, unique, max 256 characters
hashedPassword	binary string	not null
createdAt	datetime	not null, default value of now()
updatedAt	datetime	not null, default value of now()
Users Table Migration
First, generate a migration and model file. Navigate into the backend folder in the terminal and run the following command:

npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string
This will create a file in your backend/db/migrations folder and a file called user.js in your backend/db/models folder.

In the migration file, apply the constraints in the schema. Remember to define the default constraints for the createdAt and updatedAt columns.

If completed correctly, your migration file should look something like this:

"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  }
};
Migrate the Users table by running the following command:

dotenv npx sequelize db:migrate
If there is an error when migrating, check your migration file and make changes.

If there is no error when migrating, but you want to change the migration file afterwards, undo the migration first, change the file, then migrate again.

Command to undo the migration:

dotenv npx sequelize db:migrate:undo
You can check out the Users table schema created in your SQLite3 database by running the following command in the terminal:

sqlite3 db/dev.db ".schema Users"
User Model
After you migrate the Users table with the database-level constraints, you need to add Sequelize model-level constraints. In your User model file, backend/db/models/user.js, add the following constraints:

COLUMN NAME	DATA TYPE	CONSTRAINTS
username	string	not null, unique, min 4 characters, max 30 characters, isNotEmail
email	string	not null, unique, min 3 characters, max 256 characters, isEmail
hashedPassword	binary string	not null, min and max 60 characters
See the Sequelize docs on model-level validations for a reminder on how to apply these constraints. A custom validator needs to be created for the isNotEmail constraint. See here for a refresher on custom Sequelize validators. You can use the imported isEmail validation from the sequelize package's Validator to check if the username is an email. If it is, throw an error with a message.

Your user.js file should look like this with the applied constraints:

'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  };
  
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256]
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    }
  );
  return User;
};
User Seeds
Generate a user seeder file for the demo user with the following command:

npx sequelize seed:generate --name demo-user
In the seeder file, create a demo user with email, username, and hashedPassword fields. For the down function, delete the user with the username or email of the demo user. If you'd like, you can also add other users and populate the fields with random fake data. To generate the hashedPassword you should use the bcryptjs package's hashSync method.

Your seeder file should look something like this:

'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
Notice how you do not need to add the createdAt and updatedAt fields for the users. This is a result of the default value that you defined in the Sequelize migration file for those fields.

Make sure to import bcryptjs at the top of the file.

After you finish creating your demo user seed file, migrate the seed file by running the following command:

dotenv npx sequelize db:seed:all
If there is an error with seeding, check your seed file and make changes.

If there is no error in seeding but you want to change the seed file, remember to undo the seed first, change the file, then seed again.

Command to undo the migration for the most recent seed file:

dotenv npx sequelize db:seed:undo
Command to undo the migrations for all the seed files:

dotenv npx sequelize db:seed:undo:all
Check your database to see if the users have been successfully created by running:

sqlite3 db/dev.db 'SELECT * FROM "Users"'
Model Scopes - Protecting Users' Information
To ensure that a user's information like their hashedPassword doesn't get sent to the frontend, you should define User model scopes. Check out the official documentation on model scopingto look up how to define a model scope to prevent certain fields from being sent in a query.

For the default query when searching for Users, the hashedPassword, updatedAt, and, depending on your application, email and createdAt fields should not be returned. To do this, set a defaultScope on the User model to exclude the desired fields from the default query. For example, when you run User.findAll() all fields besides hashedPassword, updatedAt, email, and createdAt will be populated in the return of that query.

Next, define a User model scope for currentUser that will exclude only the hashedPassword field. Finally, define another scope for including all the fields, which should only be used when checking the login credentials of a user. These scopes need to be explicitly used when querying. For example, User.scope('currentUser').findByPk(id) will find a User by the specified id and return only the User fields that the currentUser model scope allows.

Your user.js model file should now look like this:

'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  };
  
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256]
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};
These scopes help protect sensitive user information that should not be exposed to other users. You will be using these scopes in the later sections.

Authentication Flow
The backend login flow in this project will be based on the following plan:

The API login route will be hit with a request body holding a valid credential (either username or email) and password combination.
The API login handler will look for a User with the input credential in either the username or email columns.
Then the hashedPassword for that found User will be compared with the input password for a match.
If there is a match, the API login route should send back a JWT in an HTTP-only cookie and a response body. The JWT and the body will hold the user's id, username, and email.
The backend sign-up flow in this project will be based on the following plan:

The API signup route will be hit with a request body holding a username, email, and password.
The API signup handler will create a User with the username, an email, and a hashedPassword created from the input password.
If the creation is successful, the API signup route should send back a JWT in an HTTP-only cookie and a response body. The JWT and the body will hold the user's id, username, and email.
The backend logout flow will be based on the following plan:

The API logout route will be hit with a request.
The API logout handler will remove the JWT cookie set by the login or signup API routes and return a JSON success message.
User Model Methods
After creating the model scopes, you should create methods that the API routes for authentication will use to interact with the Users table. The planned methods are based on the authentication flow plans outlined above.

Define an instance method toSafeObject in the user.js model file. This method will return an object with only the User instance information that is safe to save to a JWT, like id, username, and email.

Your user.js model file should now look like this:

'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email } = this; // context will be the User instance
      return { id, username, email };
    }
    static associate(models) {
      // define association here
    }
  };
  
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256]
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};
Define an instance method validatePassword in the user.js model file. It should accept a password string and return true if there is a match with the User instance's hashedPassword. If there is no match, it should return false.

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
You are using the bcryptjs package to compare the password and the hashedPassword, so make sure to import the package at the top of the user.js file.

const bcrypt = require('bcryptjs');
Define a static method getCurrentUserById in the user.js model file that accepts an id. It should use the currentUser scope to return a User with that id.

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
Define a static method login in the user.js model file. It should accept an object with credential and password keys. The method should search for one User with the specified credential (either a username or an email). If a user is found, then the method should validate the password by passing it into the instance's .validatePassword method. If the password is valid, then the method should return the user by using the currentUser scope.

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
Define a static method signup in the user.js model file that accepts an object with a username, email, and password key. Hash the password using the bcryptjs package's hashSync method. Create a User with the username, email, and hashedPassword. Return the created user using the currentUser scope.

    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
User Auth Middlewares
There are three functions in this section that will aid you in authentication.

Create a folder called utils in your backend folder. Inside that folder, add a file named auth.js to store the auth helper functions.

At the top of the file, add the following imports:

// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;
setTokenCookie
This first function is setting the JWT cookie after a user is logged in or signed up. It takes in the response and the session user and generates a JWT using the imported secret. It is set to expire in however many seconds you set on the JWT_EXPIRES_IN key in the .env file. The payload of the JWT will be the return of the instance method .toSafeObject that you added previously to the User model. After the JWT is created, it's set to an HTTP-only cookie on the response as a token cookie.

// backend/utils/auth.js
// ...

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
  // Create the token.
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax"
  });

  return token;
};
This function will be used in the login and signup routes later.

restoreUser
Certain authenticated routes will require the identity of the current session user. You will create and utilize a middleware function called restoreUser that will restore the session user based on the contents of the JWT cookie. Create a middleware function that will verify and parse the JWT's payload and search the database for a User with the id in the payload. (This query should use the currentUser scope since the hashedPassword is not needed for this operation.) If there is a User found, then save the user to a key of user onto the request. If there is an error verifying the JWT or a User cannot be found with the id, then clear the token cookie from the response.

// backend/utils/auth.js
// ...

const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};
This will be added as a pre-middleware for route handlers and for the following authentication middleware.

requireAuth
The last authentication middleware to add is for requiring a session user to be authenticated before accessing a route.

Create an Express middleware called requireAuth. Define this middleware as an array with the restoreUser middleware function you just created as the first element in the array. This will ensure that if a valid JWT cookie exists, the session user will be loaded into the req.user attribute. The second middleware will check req.user and will go to the next middleware if there is a session user present there. If there is no session user, then an error will be created and passed along to the error-handling middlewares.

// backend/utils/auth.js
// ...

// If there is no current user, return an error
const requireAuth = [
  restoreUser,
  function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
  }
];
Both restoreUser and requireAuth will be applied as a pre-middleware to route handlers where needed.

Finally, export all the functions at the bottom of the file.

// backend/utils/auth.js
// ...

module.exports = { setTokenCookie, restoreUser, requireAuth };
Test User Auth Middlewares
Let's do some testing! It's always good to test your code anytime you have an opportunity to do it. Testing at the very end is not a good idea because it will be hard to pinpoint the location of the error in your code.

Add a test route in your backend/routes/api/index.js file that will test the setTokenCookie function by getting the demo user and calling setTokenCookie.

// backend/routes/api/index.js
// ...

// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
});

// ...
Go to http://localhost:8000/api/set-token-cookie and see if there is a token cookie set in your browser's DevTools. If there isn't, then check your backend server logs in the terminal where you ran npm start. Also, check the syntax of your setTokenCookie function as well as the test route.

Next, add a test route in your backend/routes/api/index.js file that will test the restoreUser middleware by connecting the middleware and checking whether or not the req.user key has been populated by the middleware properly.

// backend/routes/api/index.js
// ...

// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');
router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);

// ...
Go to http://localhost:8000/api/restore-user and see if the response has the demo user information returned as JSON. Then, remove the token cookie manually in your browser's DevTools and refresh. The JSON response should be empty.

If this isn't the behavior, then check your backend server logs in the terminal where you ran npm start as well as the syntax of your restoreUser middleware and test route.

To set the token cookie back, just go to the GET /api/set-token-cookie route again: http://localhost:8000/api/set-token-cookie.

Lastly, test your requireAuth middleware by adding a test route in your backend/routes/api/index.js file. If there is no session user, the route will return an error. Otherwise it will return the session user's information.

// backend/routes/api/index.js
// ...

// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

// ...
Set the token cookie back by accessing the GET /api/set-token-cookie route again: http://localhost:8000/api/set-token-cookie.

Go to http://localhost:8000/api/require-auth and see if the response has the demo user's information returned as JSON. Then, remove the token cookie manually in your browser's DevTools and refresh. The JSON response should now be an "Unauthorized" error.

If this isn't the behavior, then check your backend server logs in the terminal where you ran npm start as well as the syntax of your requireAuth middleware and test route.

To set the token cookie back, just go to the GET /api/set-token-cookie route again: http://localhost:8000/api/set-token-cookie.

Once you are satisfied with the test results, you can remove all code for testing the user auth middleware routes.