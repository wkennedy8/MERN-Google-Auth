const passport = require('passport'),
  JwtStrategy = require('passport-jwt').Strategy,
  User = require('../db/models/user'),
  ExtractJwt = require('passport-jwt').ExtractJwt,
  GoogleStrategy = require('passport-google-oauth20').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  GitHubStrategy = require('passport-github').Strategy;

let jwtOptions = {
  jwtFromRequest: (req) => {
    return req?.cookies?.jwt || ExtractJwt.fromAuthHeaderWithScheme('jwt')(req);
  },
  secretOrKey: process.env.JWT_SECRET
};

// JWT Strategy
passport.use(
  'jwt',
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.expires) {
      return done(null, false, { message: 'jwt expired' });
    }
    let { iat, exp, ...userData } = jwtPayload;
    userData = await User.findById(userData._id);
    return done(null, userData);
  })
);

//Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`
      // proxy: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ uid: profile.id });
      if (user) {
        await user.generateAuthToken();
        return done(null, user);
      } else {
        const newUser = new User({
          name: profile.displayName,
          uid: profile.id
        });
        await newUser.generateAuthToken();
        return done(null, newUser);
      }
    }
  )
);

//Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/facebook/redirect`
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ uid: profile.id });
      if (user) {
        await user.generateAuthToken();
        return done(null, user);
      } else {
        const newUser = new User({
          name: profile.displayName,
          uid: profile.id
        });
        await newUser.generateAuthToken();
        return done(null, newUser);
      }
    }
  )
);

//Github Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/github/redirect`
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ uid: profile.id });
      if (user) {
        await user.generateAuthToken();
        return done(null, user);
      } else {
        const newUser = new User({
          name: profile.displayName,
          uid: profile.id
        });
        await newUser.generateAuthToken();
        return done(null, newUser);
      }
    }
  )
);

module.exports = passport;
