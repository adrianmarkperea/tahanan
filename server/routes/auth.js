const express = require('express');
const router = express.Router();

module.exports = (app, passport) => {
  router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        var returnJson = {};
        info.code = info.code || '005';
        returnJson.errors = [info];
        return res.status(400).json(returnJson);
      }
      req.login(user, (err) => {
        if (err) { return next(err); }
        return res.redirect('/auth/success_login');
      });
    })(req, res, next);
  });

  router.get('/success_login', (req, res) => {
    if (req.isAuthenticated()) {
      var returnJson = {};
      returnJson.errors   = [];
      returnJson.message  = 'Log In Successful';
      returnJson.loggedIn = true;
      returnJson.userId     = req['user']['id'];
      returnJson.name = req['user']['first_name'] + ' ' + req['user']['last_name'];
      returnJson.email = req['user']['email'];
      returnJson.image_url = req['user']['profile_pic_url'];
      return res.status(200).json(returnJson);
    }
  });

  router.post('/signup', (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        var returnJson = {};
        info.code = info.code || '005';
        returnJson.errors = [info];
        return res.status(400).json(returnJson);
      }
      req.login(user, (err) => {
        if (err) { return next(err); }
        return res.redirect('/auth/success_signup');
      });
    })(req, res, next);
  });
  router.get('/signout', function(req, res) {
    req.logout();
    return res.status(200).send('You are logged out');
  })

  router.get('/success_signup', (req, res) => {
    if (req.isAuthenticated()) {
      var returnJson = {};
      returnJson.errors = [];
      returnJson.message = 'Sign Up Successful. User is logged in';
      returnJson.loggedIn = true;
      returnJson.userId     = req['user']['id'];
      returnJson.name = req['user']['first_name'] + ' ' + req['user']['last_name'];
      returnJson.email = req['user']['email'];
      returnJson.image_url = req['user']['profile_pic_url'];
      return res.status(200).json(returnJson);
    }
  });

  router.get('/me', (req, res) => {
    var returnJson = {};
    if (req.isAuthenticated()) {
      returnJson.errors = [];
      returnJson.loggedIn = true;
      returnJson.userId     = req['user']['id'];
      returnJson.name = req['user']['first_name'] + ' ' + req['user']['last_name'];
      returnJson.email = req['user']['email'];
      returnJson.image_url = req['user']['profile_pic_url'];
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
