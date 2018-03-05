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

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
     res.send(200);
   } else {
     next();
   }
});

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

// TODO: Featured memories should be based off likes and comments (75% likes, 25% comments)
// TODO: Users should be able to comment on memories
// TODO: Fix responses

// TODO: Document router.get('/:landmarkId/featured', memoriesController.getLandmarkFeaturedMemories);
// TODO: Document router.get('/:memoryId/likes', memoriesController.getLikes);
// TODO: Document router.post('/:memoryId/likes', memoriesController.like);
// TODO: Document router.get('/:userId/memories', memoriesController.getUserMemories);
// TODO: Document router.get('/:memoryId', memoriesController.retrieveMemory);
