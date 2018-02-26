const LocalStrategy = require('passport-local').Strategy;
const verifier = require('../../libs/verifier');
const User = require('../models').User;

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
      User.findOne({
        where: {
          email: email
        }
      }).then(user => {
        if (!user) {
          console.log(`User with email ${email} does not exist`);
          return done(null, false);
        }

        if (verifier.verifyPassword(user.salt, password, user.password)) {
          console.log('User successfully authenticated');
          return done(null, user);
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
      User.findOne({
        where: {
          email: email
        }
      }).then(user => {
        if (user) {
          console.log(`User with ${username} already exists`);
          return done(null, false);
        }
        var encryptedPassword = verifier.saltHashPassword(password);
        return User
          .create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: email,
            bio: req.body.bio,
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
