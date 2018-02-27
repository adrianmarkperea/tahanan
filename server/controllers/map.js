const Governorate = require('../models').Governorate;
const City        = require('../models').City;
const Landmark    = require('../models').Landmark;

module.exports = {
  getMap(req, res) {
    var returnJson = {};
    returnJson.errors = [];
    return Governorate
      .findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      .then(governorates => {
        returnJson.governorates = governorates;
        return City
          .findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          })
      })
      .then(cities => {
        returnJson.cities = cities;
        return Landmark
          .findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          })
      })
      .then(landmarks => {
        returnJson.landmarks = landmarks;
        return res.status(200).json(returnJson);
      })
      .catch(err => {
        returnJson.errors.push(err);
        return res.status(400).json(returnJson)
      });
  }

}
