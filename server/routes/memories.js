const express = require('express');
const router = express.Router();
const memoriesController = require('../controllers').memories;


// /api/memories

router.get('/:memoryId/likes', memoriesController.getLikes); // TODO: Document
router.post('/:memoryId/likes', memoriesController.like);    // TODO: Document
router.get('/:memoryId', memoriesController.retrieveMemory); // TODO: Document

module.exports = router;
