const router = require('express').Router();
const {
  createUser,
  loginUser,
  googleLogin,
  googleRedirect,
  facebookLogin,
  facebookRedirect,
  githubLogin,
  githubRedirect
} = require('../../controllers/users');

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/google', googleLogin);
router.get('/google/callback', googleRedirect);
router.get('/facebook', facebookLogin);
router.get('/facebook/redirect', facebookRedirect);
router.get('/github', githubLogin);
router.get('/github/redirect', githubRedirect);

module.exports = router;
