const express = require('express');
const router = express.Router();
const memoriesController = require('../controllers').memories;

router.get('/', memoriesController.listAll);


module.exports = router;
