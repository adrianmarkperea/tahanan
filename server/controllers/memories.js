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
    var featured    = req.body.featured;

    var createParams = {};
    createParams['description'] = description;
    createParams['userId']      = userId;
    createParams['landmarkId']  = landmarkId;
    if (featured) {
      createParams['featured'] = featured;
    }

    console.log(landmarkId);

    var hasImage = req.files ? true : false;
    var image;
    var image_url;

    if (hasImage) {
      var image       = req.files.memoryImage;
      var fileName    = (new Date().getTime()).toString() + '.jpg';
      var imagePath   = path.join(__dirname, `/../../image_store/memories/${fileName}`);
      var image_url   = `/image_store/memories/${fileName}`;

      createParams['image_url'] = image_url;

      return imageFactory.storeImage(image, imagePath)
        .then(img => {
          return Memory
            .create(createParams)
            .then(memory => {
              return Memory
                .findById(memory.id, {
                  attributes: ['id', 'description', 'image_url', 'createdAt', 'featured'],
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
                  raw: false
                })
            })
            .then(memory => {
              var newMemory = {};
              newMemory['id']          = memory['id'];
              newMemory['userId']      = memory['User']['id'];
              newMemory['userName']    = memory['User']['first_name'] + ' ' +  memory['User']['last_name'];
              newMemory['landId']      = memory['Landmark']['id'];
              newMemory['landName']    = memory['Landmark']['name'];
              newMemory['image_url']   = memory['image_url'];
              newMemory['content']     = memory['description'];
              newMemory['dateCreated'] = memory['createdAt'];
              newMemory['featured']    = memory['featured']
              res.status(200).json(newMemory);
            })
            .catch(err => res.status(400).send(err));
        }).catch(err => {
          return res.status(500).send(err);
        })

    } else {
      return Memory
        .create(createParams)
        .then(memory => {
          return Memory
            .findById(memory.id, {
              attributes: ['id', 'description', 'image_url', 'createdAt', 'featured'],
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
              raw: false
            })
        })
        .then(memory => {
          var newMemory = {};
          newMemory['id']          = memory['id'];
          newMemory['userId']      = memory['User']['id'];
          newMemory['userName']    = memory['User']['first_name'] + ' ' +  memory['User']['last_name'];
          newMemory['landId']      = memory['Landmark']['id'];
          newMemory['landName']    = memory['Landmark']['name'];
          newMemory['image_url']   = memory['image_url'];
          newMemory['content']     = memory['description'];
          newMemory['dateCreated'] = memory['createdAt'];
          newMemory['featured']    = memory['featured']
          res.status(200).json(newMemory);
        })
        .catch(err => res.status(400).send(err));
    }
  },
  getLandmarkMemories(req, res) {
    var returnJson = {};
    returnJson.data = [];
    returnJson.errors = [];
    return Memory
      .findAll({
        attributes: ['id', 'description', 'image_url', 'createdAt', 'featured'],
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
        where: { landmarkId: req.params.landmarkId },
        raw: false
      })
      .then(memories => {
        memories.forEach(memory => {
          var newMemory = {};
          newMemory['id']          = memory['id'];
          newMemory['userId']      = memory['User']['id'];
          newMemory['userName']    = memory['User']['first_name'] + ' ' +  memory['User']['last_name'];
          newMemory['landId']      = memory['Landmark']['id'];
          newMemory['landName']    = memory['Landmark']['name'];
          newMemory['image_url']   = memory['image_url'];
          newMemory['content']     = memory['description'];
          newMemory['dateCreated'] = memory['createdAt'];
          newMemory['featured']    = memory['featured']
          returnJson['data'].push(newMemory);
        });
        res.status(200).json(returnJson);
      })
      .catch(err => res.status(400).send(err));
  },
  getFeaturedMemories(req, res) {
    var returnJson = {};
    returnJson.data = [];
    returnJson.errors = [];
    return Memory
      .findAll({
        attributes: ['id', 'description', 'image_url', 'createdAt', 'featured'],
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
        where: { featured: true },
        raw: false
      })
      .then(memories => {
        memories.forEach(memory => {
          var newMemory = {};
          newMemory['id']          = memory['id'];
          newMemory['userId']      = memory['User']['id'];
          newMemory['userName']    = memory['User']['first_name'] + ' ' +  memory['User']['last_name'];
          newMemory['landId']      = memory['Landmark']['id'];
          newMemory['landName']    = memory['Landmark']['name'];
          newMemory['image_url']   = memory['image_url'];
          newMemory['content']     = memory['description'];
          newMemory['dateCreated'] = memory['createdAt'];
          newMemory['featured']    = memory['featured']
          returnJson['data'].push(newMemory);
        });
        res.status(200).json(returnJson);
      })
      .catch(err => res.status(400).send(err));
  },
  listAll(req, res) {
    return Memory
      .findAll({
        attributes: {exclude: ['LandmarkId', 'UserId']}
      })
      .then(memories => res.status(200).json(memories))
      .catch(err => res.status(400).send(err));
  },
}
