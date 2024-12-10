require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user'); // We'll create this model later


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // callbackURL: "http://localhost:3000/auth/google/callback",
  callbackURL: "https://walford-capitals.onrender.com/auth/google/callback",
  scope: ['profile', 'email']
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      console.log('Profile received:', profile);
      if (!user) {
        // Ensure displayName is passed if available
        const displayName = profile.displayName || profile.name.givenName || profile.name.familyName;

        user = await User.create({
          googleId: profile.id,
          name: profile.displayName || profile.name.givenName,  // fallback to givenName if displayName is not available
          email: profile.emails[0].value,
          displayName: displayName  // Safely assign displayName
        });
      }
      return done(null, user);
    } catch (error) {
      console.error('Error in Google strategy:', error);
      return done(error, null);
    }
  }));



passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;