const express = require('express');
const router = express.Router();
const memoriesController = require('../controllers').memories;
const commentsController = require('../controllers').comments;


// /api/memories
router.get('/featured', memoriesController.getFeaturedMemories);
router.get('/:memoryId/likes', memoriesController.getLikes); // TODO: Document
router.post('/:memoryId/likes', memoriesController.like);    // TODO: Document
router.get('/:memoryId', memoriesController.retrieveMemory); // TODO: Document
router.post('/:memoryId/comments', commentsController.addMemoryComment);

module.exports = router;
