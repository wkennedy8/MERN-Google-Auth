const router = require('express').Router(),
  { logoutUser } = require('../../controllers/users');

router.post('/logout', logoutUser);

module.exports = router;
