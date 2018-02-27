const Memory = require('../models').Memory;
const path   = require('path');
const imageFactory = require('../../libs/image-factory');

/*
  url: /api/landmarks/:landmarkId/memories
  body:
  {
    description: "...",
    userId: "..."
    memoryImage: "<multi-form>""
  }

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
      var image_url   = `/image_store/${fileName}`;

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
  
}
