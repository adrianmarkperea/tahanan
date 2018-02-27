const express = require('express');
const router = express.Router();
const memoriesController = require('../controllers').memories;

router.get('/', function (req, res) {
  res.send('Landmarks home page');
});

router.post('/:landmarkId/memories', memoriesController.create)

module.exports = router;
