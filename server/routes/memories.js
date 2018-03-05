const express = require('express');
const router = express.Router();
const memoriesController = require('../controllers').memories;



router.get('/:landmarkId', memoriesController.getLandmarkMemories);
router.get('/:landmarkId/featured', memoriesController.getLandmarkFeaturedMemories); // TODO: Document, sort by likes
router.post('/:landmarkId', memoriesController.create);

router.get('/:memoryId/likes', memoriesController.getLikes); // TODO: Document
router.post('/:memoryId/likes', memoriesController.like);    // TODO: Document

router.get('/:memoryId', memoriesController.retrieveMemory); // TODO: Document

module.exports = router;
