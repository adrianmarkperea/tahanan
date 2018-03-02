const express = require('express');
const router = express.Router();
const memoriesController = require('../controllers').memories;

router.get('/featured', memoriesController.getFeaturedMemories);

router.get('/:landmarkId', memoriesController.getLandmarkMemories);
router.post('/:landmarkId', memoriesController.create);

router.get('/:memoryId/likes', memoriesController.getLikes);
router.post('/:memoryId/likes', memoriesController.like);

module.exports = router;
