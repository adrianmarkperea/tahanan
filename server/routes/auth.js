const express = require('express');
const router = express.Router();

function extractUserData(user) {
  var returnJson = {};
  returnJson.userId     = user['id'];
  returnJson.name = user['first_name'] + ' ' + user['last_name'];
  returnJson.email = user['email'];
  returnJson.bio = user['bio'];
  returnJson.image_url = user['profile_pic_url'];
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
        return res.status(400).json(returnJson);
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

  router.get('/success_login', (req, res) => {
    if (req.isAuthenticated()) {
      returnJson = extractUserData(req['user']);
      returnJson.errors   = [];
      returnJson.message  = 'Log In Successful';
      returnJson.loggedIn = true;
      return res.status(200).json(returnJson);
    }
  });

  router.post('/signup', (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
      var returnJson = {};
      if (err) { return next(err); }
      if (!user) {
        info.code = info.code || '005';
        returnJson.errors = [info];
        return res.status(400).json(returnJson);
      }
      req.login(user, (err) => {
        if (err) { return next(err); }
        returnJson = extractUserData(user);
        returnJson.errors = [];
        returnJson.message = 'Sign Up Successful. User is logged in';
        returnJson.loggedIn = true;
        return res.status(200).json(returnJson);
      });
    })(req, res, next);
  });
  router.get('/signout', function(req, res) {
    req.logout();
    return res.status(200).send('You are logged out');
  })

    router.get('/success_signup', (req, res) => {
    if (req.isAuthenticated()) {
      var returnJson = extractUserData(req['user']);
      returnJson.errors = [];
      returnJson.message = 'Sign Up Successful. User is logged in';
      returnJson.loggedIn = true;
      return res.status(200).json(returnJson);
    }
  });

  router.get('/me', (req, res) => {
    var returnJson = {};
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
      return res.status(403).json(returnJson);
    }
  });
  return router
};
