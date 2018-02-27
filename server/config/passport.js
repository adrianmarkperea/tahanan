const LocalStrategy = require('passport-local').Strategy;
const verifier = require('../../libs/verifier');
const User = require('../models').User;
const path = require('path');

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
        var hasImage = req.files ? true : false;
        var image;
        var profile_pic_url;

        if (hasImage) {
          var image = req.files.profileImage;
          var fileName = (new Date().getTime()).toString() + '.jpg';
          var imagePath = path.join(__dirnam, `/../../image_store/profile_pictures/${fileName}`);
          var profile_pic_url = `/image_store/profile_pictures/${fileName}`;

          return imageFactory.storeImage(image, imagePath)
            .then(img => {
              return User
                .create({
                  first_name: req.body.first_name,
                  last_name: req.body.last_name,
                  email: email,
                  password: encryptedPassword.passwordHash,
                  salt: encryptedPassword.salt,
                  profile_pic_url: profile_pic_url
                })
                .then(user => done(null, user))
                .catch(err => res.status(400).send(err));
            })
        } else {
          return User
            .create({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: email,
              password: encryptedPassword.passwordHash,
              salt: encryptedPassword.salt
            })
            .then(user => {
              return done(null, user);
            })
            .catch(err => res.status(400).send(err));
        }
      })
    })
  );
}
