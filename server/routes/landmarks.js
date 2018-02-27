const express = require('express');
const router = express.Router();
const memoriesController = require('../controllers').memories;
const landmarksController = require('../controllers').landmarks;

// router.get('/', landmarksController.list);
// router.get('/:landmarkId', landmarksController.retrieve);
//
// router.get('/:landmarkId/memories', memoriesController.listLandmark);
// router.post('/:landmarkId/memories', memoriesController.create)

module.exports = router;
