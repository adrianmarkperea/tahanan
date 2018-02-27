const express = require('express');
const router = express.Router();
const governoratesController = require('../controllers').governorates;

router.get('/', governoratesController.list);
router.get('/:governorateId', governoratesController.retrieve);
router.get('/:governorateId/cities', governoratesController.getCities);
router.get('/:governorateId/cities/:cityId', governoratesController.retrieveCity);
router.get('/:governorateId/cities/:cityId/landmarks', governoratesController.getCityLandmarks);
router.get('/:governorateId/cities/:cityId/landmarks/:landmarkId', governoratesController.retrieveCityLandmark);
router.get('/:governorateId/cities/:cityId/landmarks/:landmarkId/memories', governoratesController.getCityLandmarkMemories);
router.get('/:governorateId/cities/landmarks', governoratesController.getLandmarks);

module.exports = router;
