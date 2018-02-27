const Landmark = require('../models').Landmark;

/*

  ///// LIST /////
  method: get
  url: /api/landmarks

  ///// RETRIEVE /////
  method: get
  url: /api/landmarks/:landmarkId/


*/

module.exports = {
  list(req, res) {
    return Landmark
      .findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      .then(landmarks => res.status(200).json(landmarks))
      .catch(err => res.status(400).send(err));
  },
  retrieve(req, res) {
    return Landmark
      .findById(req.params.landmarkId, {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      .then(landmarks => res.status(200).json(landmarks))
      .catch(err => res.status(400).send(err));
  }

}
