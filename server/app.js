require('./db/config');
const express = require('express'),
  passport = require('./authentication/passport'),
  cookieParser = require('cookie-parser'),
  openRoutes = require('./routes/open'),
  userRoutes = require('./routes/secure/users'),
  cors = require('cors');
app = express();

// Parse incoming JSON into objects
app.use(express.json());
app.use(cors());
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
}

app.use(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'], session: false })
);
app.use(
  '/auth/facebook',
  passport.authenticate('facebook', {
    scope: 'email',
    session: false
  })
);
app.use('/auth', openRoutes);

//  Authenticated  Routes
app.use('/api/*', passport.authenticate('jwt', { session: false }));

app.use('/api/users', userRoutes);

module.exports = app;
