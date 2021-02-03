const passport = require('passport'),
  JwtStrategy = require('passport-jwt').Strategy,
  User = require('../db/models/user'),
  ExtractJwt = require('passport-jwt').ExtractJwt,
  GoogleStrategy = require('passport-google-oauth20').Strategy;

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
      callbackURL: 'http://localhost:8000/auth/google/callback'
      // proxy: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleId: profile.id });
      if (user) {
        await user.generateAuthToken();
        return done(null, user);
      } else {
        const newUser = new User({
          name: profile.displayName,
          googleId: profile.id
        });
        await newUser.generateAuthToken();
        return done(null, newUser);
      }
    }
  )
);

module.exports = passport;
