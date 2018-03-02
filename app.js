require('dotenv').config();
const path = require('path');

const express = require('express');
const app = express();
const passport = require('passport');

const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const fileUpload = require('express-fileupload');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(session({
  secret: 'tahanan',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(fileUpload());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/image_store', express.static(path.join(__dirname, 'image_store')));

app.post('/upload', (req, res) => {
  var imageFactory = require('./libs/image-factory');
  imageFactory.storeImageTest(req.files.sample)
    .then(result => {
      res.send('okay');
    });

})

require('./server/config/passport')(passport);
require('./server/routes')(app, passport);

app.get('*', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the beginning of nothingness'
  });
});

module.exports = app;

// TODO: Add show memories by user
// TODO: Add count
// TODO: Add like
// TODO: Add like count
// TODO: Add comment
