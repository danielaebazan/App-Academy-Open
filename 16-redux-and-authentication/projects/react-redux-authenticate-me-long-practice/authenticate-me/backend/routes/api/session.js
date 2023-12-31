// backend/routes/api/session.js
const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Log in
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];
router.post(
  '/',
  validateLogin,
  asyncHandler(async (req,res, next) => {
    const {credential, password} = req.body;    
    const user = await User.login({credential, password});
    
    if (user) {
      await setTokenCookie(res, user);
      return res.json({user})
    } else {
      const err = new Error('Login Failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.']
      return next(err);
    }
  })
)

// Log out
router.delete (
  '/',
  (_req, res) => {res.clearCookie('token');
    return res.json({message: 'success'})
  }
);

// Get / Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user
      });
    } else return res.json({});
  }
);

module.exports = router;