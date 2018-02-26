module.exports = (app, passport) => {

  app.get('/signout', function(req, res) {
    req.logout();
    res.status(200).send('You are logged out');
  })
  app.get('/success', (req, res) => {
    res.status(200).send('You are logged in');
  });
  app.get('/failure', (req, res) => {
    res.status(400).send('Failure');
  })
  app.post('/login', passport.authenticate('login', {
    successRedirect: '/success',
    failureRedirect: '/failure'
  }));
  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/success',
    failureRedirect: '/failure'
  }));

};
