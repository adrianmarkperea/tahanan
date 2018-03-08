const express = require('express');
const router = express.Router();
const usersController = require('../controllers').users;
const memoriesController = require('../controllers').memories;

router.get('/:userId/memories', memoriesController.getUserMemories);
router.get('/:userId', usersController.retrieve);
router.post('/:userId', usersController.update);


module.exports = router;
