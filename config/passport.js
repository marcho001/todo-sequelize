const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered!' })
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, { message: 'Email of Password incorrect'})
            }
            return done(null, user)
          })
      })
      .catch(err => done(err, false))
  }))

  passport.use(new FacebookStrategy({ 
    clientID: '642447272974105',
    clientSecret: 'c8c1c3323608f933494d53fbf967e4ff',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile._json)
    const { name, email } = profile._json
    User.findOne({ where:{ email }})
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt  
            .genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => User.create({
              name,
              email,
              password: hash
            }))
            .then(user => done(null, user))
            .catch(err => done(err, false))
      })
  }))

  passport.use(new GoogleStrategy({
    clientID: '866250340279-infdh0n1mpu45a05d7uts4r1s97lgudv.apps.googleusercontent.com',
    clientSecret: '0_wBRi3_u0bl6Zi_fiC8apR3',
    callbackURL:'http://localhost:3000/auth/google/callback',
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ where: { email }})
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
  }))
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id)
     .then((user) => {
       user = user.toJSON()
       done(null, user)
     }).catch(err => done(err, null))
  })
}
