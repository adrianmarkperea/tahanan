const Memory = require('../models').Memory;
const Landmark = require('../models').Landmark;
const User = require('../models').User;
const path   = require('path');
const imageFactory = require('../../libs/image-factory');


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
      var image = req.files.memoryImage;


      // createParams['image_url'] = image_url;

      return imageFactory.storeImage(image)
        .then(uploadRes => {
          createParams['image_url'] = uploadRes['secure_url'];
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
              newMemory['mem_id']    = memory['id'];
              newMemory['user_id']   = memory['User']['id'];
              newMemory['user_name'] = memory['User']['first_name'] + ' ' +  memory['User']['last_name'];
              newMemory['land_id']   = memory['Landmark']['id'];
              newMemory['land_name'] = memory['Landmark']['name'];
              newMemory['image']     = memory['image_url'];
              newMemory['content']   = memory['description'];
              newMemory['date']      = memory['createdAt'];
              newMemory['featured']  = memory['featured']
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
          newMemory['mem_id']    = memory['id'];
          newMemory['user_id']   = memory['User']['id'];
          newMemory['user_name'] = memory['User']['first_name'] + ' ' +  memory['User']['last_name'];
          newMemory['land_id']   = memory['Landmark']['id'];
          newMemory['land_name'] = memory['Landmark']['name'];
          newMemory['image']     = memory['image_url'];
          newMemory['content']   = memory['description'];
          newMemory['date']      = memory['createdAt'];
          newMemory['featured']  = memory['featured']
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
          newMemory['mem_id']    = memory['id'];
          newMemory['user_id']   = memory['User']['id'];
          newMemory['user_name'] = memory['User']['first_name'] + ' ' +  memory['User']['last_name'];
          newMemory['land_id']   = memory['Landmark']['id'];
          newMemory['land_name'] = memory['Landmark']['name'];
          newMemory['image']     = memory['image_url'];
          newMemory['content']   = memory['description'];
          newMemory['date']      = memory['createdAt'];
          newMemory['featured']  = memory['featured']
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
          newMemory['mem_id']    = memory['id'];
          newMemory['user_id']   = memory['User']['id'];
          newMemory['user_name'] = memory['User']['first_name'] + ' ' +  memory['User']['last_name'];
          newMemory['land_id']   = memory['Landmark']['id'];
          newMemory['land_name'] = memory['Landmark']['name'];
          newMemory['image']     = memory['image_url'];
          newMemory['content']   = memory['description'];
          newMemory['date']      = memory['createdAt'];
          newMemory['featured']  = memory['featured']
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
