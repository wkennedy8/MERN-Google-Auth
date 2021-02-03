const User = require('../db/models/user'),
  passport = require('passport');

// ***********************************************//
// Create a user
// ***********************************************//
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({
      username,
      email,
      password
    });

    const token = await user.generateAuthToken();
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV !== 'production' ? false : true
    });
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// ***********************************************//
// Login a user
// ***********************************************//
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByCredentials(username, password);
    const token = await user.generateAuthToken();
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV !== 'production' ? false : true
    });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// ***********************************************//
// Google Login a user
// ***********************************************//

exports.googleLogin = async (req, res) => {
  passport.authenticate('google', { scope: ['profile', 'email'] });
};

exports.googleRedirect = async (req, res, err) => {
  res.cookie('jwt', req.user.tokens[0].token, {
    httpOnly: true,
    sameSite: 'Strict',
    secure: process.env.NODE_ENV !== 'production' ? false : true
  });
  res.redirect(process.env.CLIENT_URL);
};

// ***********************************************//
// Logout User
// ***********************************************//

exports.logoutUser = async (req, res) => {
  console.log(req);
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.cookies.jwt;
    });
    await req.user.save();
    res.clearCookie('jwt');
    res.json({ message: 'logged out!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
