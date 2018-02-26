const LocalStrategy = require('passport-local').Strategy;
const verifier = require('../../libs/verifier');
const User = require('../models').User;

// 001: user does not exist
// 002: user already exists
// 003: missing fields
// 004: wrong password

module.exports = (passport) => {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User
      .findById(id)
      .then(user => {
        if (user) {
          done(null, user.get());
        } else {
          done(user.errors, null);
        }
      });
  })

  passport.use('login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {

      if (!email || !password) {
        return done(null, false, {
          errorCode: '003',
          message: 'missing fields'
        });
      }

      User.findOne({
        where: {
          email: email
        }
      }).then(user => {
        if (!user) {
          console.log(`User with email ${email} does not exist`);
          return done(null, false, {
            errorCode: '001',
            message: 'user does not exist'
          });
        }

        if (verifier.verifyPassword(user.salt, password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, {
            errorCode: '004',
            message: 'wrong password'
          });
        }
      })
    })
  );

  passport.use('signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, email, password, done) {
      var first_name = req.body.first_name;
      var last_name  = req.body.last_name;
      if (!first_name || !last_name || !email || !password) {
        return done(null, false, {
          errorCode: '003',
          message: 'missing fields'
        });
      }
      User.findOne({
        where: {
          email: email
        }
      }).then(user => {
        if (user) {
          return done(null, false, {
            errorCode: '002',
            message: 'user already exists'
          });
        }
        var encryptedPassword = verifier.saltHashPassword(password);
        return User
          .create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: email,
            password: encryptedPassword.passwordHash,
            salt: encryptedPassword.salt,
            profile_pic_url: 'something something'
          })
          .then(user => {
            return done(null, user);
          })
      })
    })
  );
}
