const express = require('express');
const router = express.Router();

module.exports = (app, passport) => {

  router.get('/signout', function(req, res) {
    req.logout();
    return res.status(200).send('You are logged out');
  })
  router.get('/success_login', (req, res) => {
    if (req.isAuthenticated()) {
      var returnJson = {};
      returnJson.message = 'Log In Successful';
      returnJson.user    = req.user;
      return res.status(200).json(returnJson);
    }
    return res.status(400).send('Failed to log in');

  });
  router.get('/success_signup', (req, res) => {
    if (req.isAuthenticated()) {
      var returnJson = {};
      returnJson.message = 'Sign Up Successful. User is logged in';
      returnJson.user    = req.user;
      return res.status(200).json(returnJson);
    }
    return res.status(400).send('Failed to log in');

  });
  router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        return res.status(400).json(info);
      }
      req.login(user, (err) => {
        if (err) { return next(err); }
        return res.redirect('/api/auth/success_login');
      });
    })(req, res, next);
  });
  router.post('/signup', (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        return res.status(400).json(info);
      }
      req.login(user, (err) => {
        if (err) { return next(err); }
        return res.redirect('/api/auth/success_signup');
      });
    })(req, res, next);
  });

  return router
};
