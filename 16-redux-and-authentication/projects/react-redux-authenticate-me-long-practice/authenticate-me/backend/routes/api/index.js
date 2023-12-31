// backend/routes/api/index.js
const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

//---------------test functions
/* router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
}); */
// GET /api/set-token-cookie - testing -get demo user and set token-cookie
router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
}));

// GET /api/restore-user - testing restore user on cookie token
router.get('/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user?.toSafeObject()); ///remove tosafe to see full
  }
);
// GET /api/require-auth // check error if no user auth
router.get('/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user?.toSafeObject());
  }
);
//-----------------------------

module.exports = router;