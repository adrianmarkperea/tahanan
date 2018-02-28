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
        // returnJson.governorates = governorates;
        returnJson['governorates'] = [];
        governorates.forEach(governorate => {
          var newGovernorate = {};
          newGovernorate['gov_id'] = governorate['id'];
          newGovernorate['name']   = governorate['name'];
          newGovernorate['path']   = governorate['path'];
          returnJson['governorates'].push(newGovernorate);
        });
        return City
          .findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          })
      })
      .then(cities => {
        // returnJson.cities = cities;
        returnJson['cities'] = [];
        cities.forEach(city => {
          var newCity = {};
          newCity['city_id'] = city['id'];
          newCity['name']    = city['name'];
          newCity['gov_id']  = city['governorateId'];
          returnJson['cities'].push(newCity);
        });
        return Landmark
          .findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{
              model: City,
              attributes: ['governorateId']
            }]
          })
      })
      .then(landmarks => {
        // returnJson.landmarks = landmarks;
        returnJson['landmarks'] = [];
        landmarks.forEach(landmark => {
          var newLandmark = {};
          newLandmark['land_id']  = landmark['id'];
          newLandmark['city_id']  = landmark['cityId'];
          newLandmark['gov_id']   = landmark['City']['governorateId'];
          newLandmark['name']     = landmark['name'];
          newLandmark['lat']      = landmark['lat'];
          newLandmark['lon']      = landmark['lon'];
          newLandmark['backdrop'] = landmark['image_url'];
          returnJson['landmarks'].push(newLandmark);
        });
        return res.status(200).json(returnJson);
      })
      .catch(err => {
        returnJson.errors.push(err);
        return res.status(400).json(returnJson)
      });
  }

}
