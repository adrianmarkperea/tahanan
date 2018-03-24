const express = require('express');
const router = express.Router();

function extractUserData(user) {
  var returnJson = {};
  returnJson['data'] = {};
  returnJson['data']['userId']     = user['id'];
  returnJson['data']['user_name']  = user['first_name'] + ' ' + user['last_name'];
  returnJson['data']['first_name'] = user['first_name'];
  returnJson['data']['last_name']  = user['last_name'];
  returnJson['data']['email']      = user['email'];
  returnJson['data']['bio']        = user['bio'];
  returnJson['data']['image_url']  = user['profile_pic_url'];
  return returnJson;
}

module.exports = (app, passport) => {
  router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) { return next(err); }
      var returnJson = {};
      if (!user) {
        info.code = info.code || '005';
        returnJson.errors = [info];
        return res.status(200).json(returnJson);
      }
      req.login(user, (err) => {
        if (err) { return next(err); }
        returnJson = extractUserData(user);
        returnJson.errors   = [];
        returnJson.message  = 'Log In Successful';
        returnJson.loggedIn = true;


        return res.status(200).json(returnJson);
      });
    })(req, res, next);
  });


  router.post('/signup', (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
      var returnJson = {};
      if (err) { return next(err); }
      if (!user) {
        info.code = info.code || '005';
        returnJson.errors = [info];
        return res.status(200).json(returnJson);
      }
      req.login(user, (err) => {
        if (err) { return next(err); }
        returnJson = extractUserData(user['dataValues']);
        returnJson.errors = [];
        returnJson.message = 'Sign Up Successful. User is logged in';
        returnJson.loggedIn = true;

        app.mailer.send('email', {
          to: user['email'], // REQUIRED. This can be a comma delimited string just like a normal email to field.
          subject: 'Thank you <3', // REQUIRED.
          otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
        }, function (err) {
          if (err) {
            // handle error
            console.log(err);
            res.send('There was an error sending the email');
            return;
          }
          return res.status(200).json(returnJson);
        });


      });
    })(req, res, next);
  });

  router.get('/signout', function(req, res) {
    req.logout();
    return res.status(200).json('You are logged out');
  })

  router.get('/me', (req, res) => {
    var returnJson = {};
    console.log(req)
    if (req.isAuthenticated()) {
      returnJson = extractUserData(req['user']);
      returnJson.errors = [];
      returnJson.loggedIn = true;
      return res.status(200).json(returnJson);
    } else {
      returnJson.errors = [{
        code: '006',
        message: 'unauthorized'
      }];
      returnJson.loggedIn = false;
      return res.status(200).json(returnJson);
    }
  });
  return router
};
