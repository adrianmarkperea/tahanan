const express = require('express');
const router = express.Router();
const usersController = require('../controllers').users;

router.post('/:userId', usersController.update);

module.exports = router;
