const router = require('express').Router();
const {
  createUser,
  loginUser,
  googleLogin,
  googleRedirect
} = require('../../controllers/users');

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/google', googleLogin);
router.get('/google/callback', googleRedirect);

module.exports = router;
