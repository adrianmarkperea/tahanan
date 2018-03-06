const Memory = require('../models').Memory;
const Landmark = require('../models').Landmark;
const User = require('../models').User;
const Like = require('../models').Like;
const path   = require('path');
const imageFactory = require('../../libs/image-factory');


module.exports = {
  create(req, res) {

    var description = req.body.description;
    var userId      = parseInt(req.body.userId);
    var landmarkId  = req.params.landmarkId;
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
    console.log(`Has Image: ${hasImage}`);
    if (hasImage) {
      console.log(`Memory Image: ${req.files.memoryImage}`);
      if (req.files.memoryImage === undefined || req.files.memoryImage === null) {
        console.log(`Memory Image Is Null: ${req.files.memoryImage === null}`);
        hasImage = false
      }
    }

    var image;
    var image_url;

    if (hasImage) {
      var image = req.files.memoryImage;

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
      createParams['image_url'] = 'none';
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
  getUserMemories(req, res) {
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
            attributes: ['id', 'first_name', 'last_name'],
          }
        ],
        where: { userId: req.params.userId },
        order: [
          ['createdAt', 'DESC']
        ]
      })
      .then(memories => {
        var likers = [];

        const getLikers = async n =>
        {
          for (let i = 0; i < n; i++) {
            const x = await memories[i].getUsers();
            likers.push(x);
          }
          return 'done'
        }

        getLikers(memories.length).then(() => {
          // console.log(likes);
          for (var i = 0; i < memories.length; i++) {
            var memory = memories[i];
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
            // newMemory['likers']    = likers[i];
            newMemory['likes'] = likers[i].length;
            returnJson['data'].push(newMemory);
          }
          res.status(200).json(returnJson);
        })
      })
      .catch(err => res.status(400).send(err));
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
            attributes: ['id', 'first_name', 'last_name'],
          },
        ],
        order: [
          ['createdAt', 'DESC']
        ],
        where: { landmarkId: req.params.landmarkId },
        raw: false
      })
      .then(memories => {
        var likers = [];

        const getLikers = async n =>
        {
          for (let i = 0; i < n; i++) {
            const x = await memories[i].getUsers();
            likers.push(x);
          }
          return 'done'
        }

        getLikers(memories.length).then(() => {
          // console.log(likes);
          for (var i = 0; i < memories.length; i++) {
            var memory = memories[i];
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
            // newMemory['likers']    = likers[i];
            newMemory['likes'] = likers[i].length;
            returnJson['data'].push(newMemory);
          }
          res.status(200).json(returnJson);
        });

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
        raw: false,
        order: [
          ['createdAt', 'DESC']
        ]
      })
      .then(memories => {
        var likers = [];

        const getLikers = async n =>
        {
          for (let i = 0; i < n; i++) {
            const x = await memories[i].getUsers();
            likers.push(x);
          }
          return 'done'
        }

        getLikers(memories.length).then(() => {
          // console.log(likes);
          for (var i = 0; i < memories.length; i++) {
            var memory = memories[i];
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
            // newMemory['likers']    = likers[i];
            newMemory['likes'] = likers[i].length;
            returnJson['data'].push(newMemory);
          }
          res.status(200).json(returnJson);
        });
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
  like(req, res) {
    var selectedMemory;
    var selectedUser;
    return Memory
      .findById(req.params.memoryId)
      .then(memory => {
        if (!memory) {
          // TODO: Error
        }
        selectedMemory = memory;
        return User
          .findById(req.body.userId)
      })
      .then(user => {
        if (!user) {
          // TODO: Error
        }
        selectedUser = user;
        return Like
          .create({
            userId: selectedUser.id,
            memoryId: selectedMemory.id
          })
      })
      .then(like => {
        console.log(like);
        res.status(200).json(like);
      })
      .catch(err => {
        // User has already liked the memory
        if (err['name'] === 'SequelizeUniqueConstraintError') {

          return Like
            .destroy({
              where: {
                userId: selectedUser.id,
                memoryId: selectedMemory.id
              }
            })
            .then(delRes => {
              console.log(delRes);
              if (delRes === 1) {
                  res.status(200).send('unliked');
              }
            })
            .catch(err => {
              res.status(400).send(err);
            })
        } else {
          res.status(400).send(err);
        }
      })
  },
  // TODO: Do we need this?!
  getLikes(req, res) {
    return Memory
      .findById(req.params.memoryId)
      .then(memory => {
        if (!memory) {
          // TODO: Error
        }
        return memory
          .getUsers()
          .then(users => {
            console.log(users);
            res.status(200).json(users);
          })
      })
  },
  retrieveMemory(req, res) {
    var returnJson = {};
    var selectedMemory;
    return Memory
      .findById(req.params.memoryId, {
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
        ]
      })
      .then(memory => {
        if (!memory) {
          // TODO: Error!
        }
        selectedMemory = memory;
        return memory
          .getUsers() // get likers
      })
      .then(users => {
        returnJson['mem_id']    = selectedMemory['id'];
        returnJson['user_id']   = selectedMemory['User']['id'];
        returnJson['user_name'] = selectedMemory['User']['first_name'] + ' ' +  selectedMemory['User']['last_name'];
        returnJson['land_id']   = selectedMemory['Landmark']['id'];
        returnJson['land_name'] = selectedMemory['Landmark']['name'];
        returnJson['image']     = selectedMemory['image_url'];
        returnJson['content']   = selectedMemory['description'];
        returnJson['date']      = selectedMemory['createdAt'];
        returnJson['featured']  = selectedMemory['featured']
        returnJson['likes'] = users.length;
        res.status(200).json(returnJson);
      })
  }
}
