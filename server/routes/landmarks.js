const express = require('express');
const router = express.Router();
const memoriesController = require('../controllers').memories;

// /api/landmarks/
router.get('/:landmarkId/memories', memoriesController.getLandmarkMemories);
router.get('/:landmarkId/memories/featured', memoriesController.getLandmarkFeaturedMemories); // TODO: Document, sort by likes
router.post('/:landmarkId/memories', memoriesController.create);

module.exports = router;
