const City = require('../models').City;
/*

  ///// LIST /////
  method: get
  url: /api/cities

  ///// RETRIEVE /////
  method: get
  url: /api/cities/:cityId


*/

module.exports = {
  list(req, res) {
    return City
      .findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      .then(cities => res.status(200).json(cities))
      .catch(err => res.status(400).send(err));
  },
  retrieve(req, res) {
    return City
      .findById(req.params.cityId, {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      .then(cities => res.status(200).json(cities))
      .catch(err => res.status(400).send(err));
  }

}
