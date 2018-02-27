const Memory = require('../models').Memory;
const Landmark = require('../models').Landmark;
const User = require('../models').User;
const path   = require('path');
const imageFactory = require('../../libs/image-factory');

/*

  ///// CREATE ////

  method: post
  url: /api/landmarks/:landmarkId/memories
  body:
  {
    description: "...",
    userId: "..."
    memoryImage: "<multi-form>""
  }

  ///// LIST_LANDMARK /////
  method: get
  url: /api/landmarks/:landmarkId/memories

  ///// LIST_ALL /////
  method: get
  url: /api/memories

*/

module.exports = {
  create(req, res) {
    var description = req.body.description;
    var userId      = parseInt(req.body.userId);
    var landmarkId  = parseInt(req.params.landmarkId);

    console.log(`user Id type: ${userId}`);
    console.log(`landmarkId: ${landmarkId}`);

    var hasImage    = req.files ? true : false;
    var image;
    var image_url;

    if (hasImage) {
      var image       = req.files.memoryImage;
      var fileName    = (new Date().getTime()).toString() + '.jpg';
      var imagePath   = path.join(__dirname, `/../../image_store/memories/${fileName}`);
      var image_url   = `/image_store/memories/${fileName}`;

      return imageFactory.storeImage(image, imagePath)
        .then(img => {
          return Memory
            .create({
              description: description,
              userId: userId,
              landmarkId: landmarkId,
              image_url: image_url
            })
            .then(memory => res.status(200).json(memory))
            .catch(err => res.status(400).send(err));
        }).catch(err => {
          return res.status(500).send(err);
        })

    } else {
      return Memory
        .create({
          description: description,
          userId: userId,
          landmarkId: landmarkId
        })
        .then(memory => res.status(200).json(memory))
        .catch(err => res.status(400).send(err));
    }
  },
  listAll(req, res) {
    return Memory
      .findAll({
        attributes: {exclude: ['LandmarkId', 'UserId']}
      })
      .then(memories => res.status(200).json(memories))
      .catch(err => res.status(400).send(err));
  },
  listLandmark(req, res) {
    return Memory
      .findAll({
        attributes: ['id', 'description', 'image_url'],
        include: [
          {
            model: Landmark,
            attributes: ['id', 'name']
          },
          {
            model: User,
            attributes: ['id', 'first_name', 'last_name']
          }
        ],
        where: { landmarkId: req.params.landmarkId }
      })
      .then(memories => res.status(200).json(memories))
      .catch(err => res.status(400).send(err));
  }

}
