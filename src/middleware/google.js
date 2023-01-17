const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const { Users } = require("../db");
const { ID_CLIENT_GOOGLE,SECRET_GOOGLE } = process.env;
module.exports = passport.use('auth-google',
  new GoogleStrategy({
    clientID: ID_CLIENT_GOOGLE,
    clientSecret: SECRET_GOOGLE,
    callbackURL: 'http://localhost:3001/google/auth'
  },
  (accessToken,refreshToken,profile,done)=>{
    
    done(null,profile)
  }
  )
)