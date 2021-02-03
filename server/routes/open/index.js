const router = require('express').Router();
const {
  createUser,
  loginUser,
  googleLogin,
  googleRedirect,
  facebookLogin,
  facebookRedirect
} = require('../../controllers/users');

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/google', googleLogin);
router.get('/google/callback', googleRedirect);
router.get('/facebook', facebookLogin);
router.get('/facebook/redirect', facebookRedirect);

module.exports = router;
