const express = require('express');
const app = express();
const passport = require('passport');

const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'tahanan',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./server/config/passport')(passport);

require('./server/routes')(app, passport);

app.get('*', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the beginning of nothingness'
  });
});

module.exports = app;
