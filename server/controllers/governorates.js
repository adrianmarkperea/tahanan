const Governorate = require('../models').Governorate;
const City        = require('../models').City;
const Landmark    = require('../models').Landmark;
const Memory      = require('../models').Memory;

/*

  ///// LIST /////
  method: get
  url: /api/governorates

  ///// RETRIEVE /////
  method: get
  url: /api/governorates/:governorateId/

  url: /api/governorates/:governorateId/cities
  url: /api/governorates/:governorateId/cities/:cityId

  url: /api/governorates/:governorateId/cities/:cityId/landmarks
  url: /api/governorates/:governorateId/cities/:cityId/landmarks/:landmarkId

*/

module.exports = {
  list(req, res) {
    return Governorate
      .findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      .then(governorates => res.status(200).json(governorates))
      .catch(err => res.status(400).send(err));
  },
  retrieve(req, res) {
    return Governorate
      .findById(req.params.governorateId, {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      .then(governorates => res.status(200).json(governorates))
      .catch(err => res.status(400).send(err));
  },
  getCities(req, res) {
    return Governorate
      .findById(req.params.governorateId, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{
          model: City,
          as: "Cities"
        }]
      })
      .then(governorate => res.status(200).json(governorate))
      .catch(err => res.status(400).send(err));
  },
  retrieveCity(req, res) {
    return Governorate
      .findById(req.params.governorateId, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{
          model: City,
          as: "Cities",
          where: { id: req.params.cityId }
        }]
      })
      .then(governorate => res.status(200).json(governorate))
      .catch(err => res.status(400).send(err));
  },
  getCityLandmarks(req, res) {
    return Governorate
      .findById(req.params.governorateId, {
        include: [{
          model: City,
          as: 'Cities',
          where: { id: req.params.cityId },
          include: [{
            model: Landmark,
            as: 'Landmarks'
          }]
        }]
      })
      .then(governorate => res.status(200).json(governorate))
      .catch(err => res.status(400).send(err));
  },
  retrieveCityLandmark(req, res) {
    return Governorate
      .findById(req.params.governorateId, {
        include: [{
          model: City,
          as: 'Cities',
          where: { id: req.params.cityId },
          include: [{
            model: Landmark,
            as: 'Landmarks',
            where: { id: req.params.landmarkId }
          }]
        }]
      })
      .then(governorate => res.status(200).json(governorate))
      .catch(err => res.status(400).send(err));
  },
  getCityLandmarkMemories(req, res) {
    return Governorate
      .findById(req.params.governorateId, {
        include: [{
          model: City,
          as: 'Cities',
          where: { id: req.params.cityId },
          include: [{
            model: Landmark,
            as: 'Landmarks',
            where: {id: req.params.landmarkId },
            include: [{
              model: Memory,
              as: 'Memories'
            }]
          }]
        }]
      })
      .then(governorate => res.status(200).json(governorate))
      .catch(err => res.status(400).send(err));
  },


  getLandmarks(req, res) {
    return Governorate
      .findById(req.params.governorateId, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{
          model: City,
          attributes: ['id', 'name'],
          as: "Cities",
          include: [{
            model: Landmark,
            as: "Landmarks",
            attributes: ['id', 'name']
          }]
        }]
      })
      .then(governorate => res.status(200).json(governorate))
      .catch(err => res.status(400).send(err));
  }

}
