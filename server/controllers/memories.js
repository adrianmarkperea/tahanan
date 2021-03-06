const Memory = require('../models').Memory;
const Landmark = require('../models').Landmark;
const User = require('../models').User;
const Like = require('../models').Like;
const Comment = require('../models').Comment;
const path   = require('path');
const imageFactory = require('../../libs/image-factory');
const sequelize = require('sequelize');

function generateUrl(landmarkId) {
  return `http://res.cloudinary.com/higid3pm1/image/upload/v1520763492/stills/${landmarkId}-still.png`;
}

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
              newMemory['first_name'] = memory['User']['first_name'];
              newMemory['last_name'] = memory['User']['last_name'];
              newMemory['land_id']   = memory['Landmark']['id'];
              newMemory['land_name'] = memory['Landmark']['name'];
              newMemory['image']     = memory['image_url'];
              newMemory['default_image'] = generateUrl(memory['Landmark']['id']);
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
          newMemory['first_name'] = memory['User']['first_name'];
          newMemory['last_name'] = memory['User']['last_name'];
          newMemory['land_id']   = memory['Landmark']['id'];
          newMemory['land_name'] = memory['Landmark']['name'];
          newMemory['image']     = memory['image_url'];
          newMemory['default_image'] = generateUrl(memory['Landmark']['id']);
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
            attributes: ['id', 'first_name', 'last_name', 'profile_pic_url'],
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
            newMemory['profile_pic_url'] = memory['User']['profile_pic_url'];
            newMemory['land_id']   = memory['Landmark']['id'];
            newMemory['land_name'] = memory['Landmark']['name'];
            newMemory['image']     = memory['image_url'];
            newMemory['default_image'] = generateUrl(memory['Landmark']['id']);
            newMemory['content']   = memory['description'];
            newMemory['date']      = memory['createdAt'];
            newMemory['featured']  = memory['featured']
            newMemory['liker_ids'] = [];
            likers[i].forEach(liker => {
              newMemory['liker_ids'].push(liker['dataValues']['id']);
            })
            newMemory['liked'] = false;
            newMemory['liker_ids'].forEach(id => {
              if (id === req['user']['id']) {
                newMemory['liked'] = true;
              }
            });
            newMemory['likes'] = likers[i].length;
            newMemory['likers'] = [];
            likers[i].forEach(liker => {
              var newLiker = {};
              newLiker['id'] = liker['dataValues']['id'];
              newLiker['first_name'] = liker['dataValues']['first_name'];
              newLiker['last_name'] = liker['dataValues']['last_name'];
              newMemory['likers'].push(newLiker)
            })
            returnJson['data'].push(newMemory);
          }
          // res.status(200).json(memories);
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
            attributes: ['id', 'first_name', 'last_name', 'profile_pic_url'],
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
        var commenters = [];

        const getLikers = async n =>
        {
          for (let i = 0; i < n; i++) {
            const x = await memories[i].getUsers();
            likers.push(x);
          }
          return 'done'
        }

        const getCommenters = async n => {
          for (let i = 0; i < n; i++) {
            const x = await memories[i].getCommenters();
            commenters.push(x);
          }
          return 'done'
        }

        getLikers(memories.length).then(() => {
            getCommenters(memories.length).then(() => {
              for (var i = 0; i < memories.length; i++) {
                var memory = memories[i];
                var newMemory = {};
                newMemory['mem_id']    = memory['id'];
                newMemory['user_id']   = memory['User']['id'];
                newMemory['user_name'] = memory['User']['first_name'] + ' ' +  memory['User']['last_name'];
                newMemory['profile_pic_url'] = memory['User']['profile_pic_url'];
                newMemory['land_id']   = memory['Landmark']['id'];
                newMemory['land_name'] = memory['Landmark']['name'];
                newMemory['default_image'] = generateUrl(memory['Landmark']['id']);
                newMemory['image']     = memory['image_url'];
                newMemory['content']   = memory['description'];
                newMemory['date']      = memory['createdAt'];
                newMemory['featured']  = memory['featured']
                newMemory['likes'] = likers[i].length;
                newMemory['comment_count'] = commenters[i].length;
                newMemory['liker_ids'] = [];
                likers[i].forEach(liker => {
                  newMemory['liker_ids'].push(liker['dataValues']['id']);
                })
                newMemory['liked'] = false;
                newMemory['liker_ids'].forEach(id => {
                  if (id === req['user']['id']) {
                    newMemory['liked'] = true;
                  }
                });
                newMemory['likers'] = [];
                likers[i].forEach(liker => {
                  var newLiker = {};
                  newLiker['id'] = liker['dataValues']['id'];
                  newLiker['first_name'] = liker['dataValues']['first_name'];
                  newLiker['last_name'] = liker['dataValues']['last_name'];
                  newMemory['likers'].push(newLiker)
                })
                returnJson['data'].push(newMemory);
              }
              res.status(200).json(returnJson);
            })
        })
      })
      .catch(err => res.status(400).send(err));
  },
  getFeaturedMemories(req, res) {
    var returnJson = {};
    returnJson.data = [];
    returnJson.errors = [];
    limit = req.body.limit || 20;
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
            attributes: ['id', 'first_name', 'last_name', 'profile_pic_url'],
          },
        ],
        order: [
          ['createdAt', 'DESC']
        ],
        raw: false
      })
      .then(memories => {
        var likers = [];
        var commenters = [];

        const getLikers = async n =>
        {
          for (let i = 0; i < n; i++) {
            const x = await memories[i].getUsers();
            likers.push(x);
          }
          return 'done'
        }

        const getCommenters = async n => {
          for (let i = 0; i < n; i++) {
            const x = await memories[i].getCommenters();
            commenters.push(x);
          }
          return 'done'
        }

        var allMemories = [];

        getLikers(memories.length).then(() => {
            getCommenters(memories.length).then(() => {
              for (var i = 0; i < memories.length; i++) {
                var memory = memories[i];
                var newMemory = {};
                newMemory['mem_id']    = memory['id'];
                newMemory['user_id']   = memory['User']['id'];
                newMemory['user_name'] = memory['User']['first_name'] + ' ' +  memory['User']['last_name'];
                newMemory['profile_pic_url'] = memory['User']['profile_pic_url'];
                newMemory['land_id']   = memory['Landmark']['id'];
                newMemory['land_name'] = memory['Landmark']['name'];
                newMemory['default_image'] = generateUrl(memory['Landmark']['id']);
                newMemory['image']     = memory['image_url'];
                newMemory['content']   = memory['description'];
                newMemory['date']      = memory['createdAt'];
                newMemory['featured']  = memory['featured']
                newMemory['likes'] = likers[i].length;
                newMemory['comment_count'] = commenters[i].length;
                newMemory['liker_ids'] = [];
                likers[i].forEach(liker => {
                  newMemory['liker_ids'].push(liker['dataValues']['id']);
                })
                newMemory['liked'] = false;
                newMemory['liker_ids'].forEach(id => {
                  if (id === req['user']['id']) {
                    newMemory['liked'] = true;
                  }
                });
                newMemory['likers'] = [];
                likers[i].forEach(liker => {
                  var newLiker = {};
                  newLiker['id'] = liker['dataValues']['id'];
                  newLiker['first_name'] = liker['dataValues']['first_name'];
                  newLiker['last_name'] = liker['dataValues']['last_name'];
                  newMemory['likers'].push(newLiker)
                })
                allMemories.push(newMemory);
              }
              // Sort by most likes to least likes
              var sortby = req.query.sortby;
              if (sortby !== undefined && sortby === 'likes') {
                console.log('Sorting by likes');
                allMemories.sort((a, b) => a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : a.date > b.date ? -1 : a.date < b.date ? 1 : 0);
              } else {
                console.log('Sorted by time of creation');
              }
              // Limit to the number of featured memories (default: 20)
              returnJson['data'] = allMemories.slice(0, limit);
              res.status(200).json(returnJson);
            })
        })
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
        var returnJson = {};
        returnJson['message'] = 'liked';
        returnJson['for_mike'] = 'please just add 1 to the likes in the front end hehe';
        res.status(200).send(returnJson);
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
                var returnJson = {};
                returnJson['message'] = 'unliked';
                returnJson['for_mike'] = 'please just subtract 1 to the likes in the front end hehe';
                res.status(200).send(returnJson);
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
    console.log(`User: ${req['user']}`);
    var returnJson = {};
    var selectedMemory;
    var memoryComments;
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
            attributes: ['id', 'first_name', 'last_name', 'profile_pic_url']
          }
        ]
      })
      .then(memory => {
        if (!memory) {
          // TODO: Error!
        }
        selectedMemory = memory;
        returnJson['mem_id']    = selectedMemory['id'];
        returnJson['user_id']   = selectedMemory['User']['id'];
        returnJson['user_name'] = selectedMemory['User']['first_name'] + ' ' +  selectedMemory['User']['last_name'];
        returnJson['profile_pic_url'] = selectedMemory['User']['profile_pic_url'];
        returnJson['land_id']   = selectedMemory['Landmark']['id'];
        returnJson['land_name'] = selectedMemory['Landmark']['name'];
        returnJson['default_image'] = generateUrl(memory['Landmark']['id']);
        returnJson['image']     = selectedMemory['image_url'];
        returnJson['content']   = selectedMemory['description'];
        returnJson['date']      = selectedMemory['createdAt'];
        returnJson['featured']  = selectedMemory['featured']
        return memory
          .getUsers()
        })
      .then(users => {
        returnJson['likes'] = users.length;
        returnJson['liker_ids'] = [];
        users.forEach(user => {
          returnJson['liker_ids'].push(user['dataValues']['id']);
        })
        returnJson['liked'] = false;
        returnJson['liker_ids'].forEach(id => {
          if (id === req['user']['id']) {
            returnJson['liked'] = true;
          }
        })
        returnJson['likers'] = [];
        users.forEach(liker => {
          var newLiker = {};
          newLiker['id'] = liker['dataValues']['id'];
          newLiker['first_name'] = liker['dataValues']['first_name'];
          newLiker['last_name'] = liker['dataValues']['last_name'];
          returnJson['likers'].push(newLiker)
        })
        return selectedMemory
          .getCommenters()
      })
      // .then(commenters => {
      //   returnJson['comments'] = []
      //   commenters.forEach(commenter => {
      //     var newComment = {};
      //     console.log(commenter['Comment'])
      //     newComment['user_id'] = commenter['id']
      //     // newComment['comment_id'] = commenter['Comment']['message']
      //     newComment['user_name'] = commenter['first_name'] + ' ' + commenter['last_name']
      //     newComment['profile_pic_url'] = commenter['profile_pic_url'];
      //     newComment['timestamp'] = commenter['Comment']['createdAt'];
      //     newComment['message'] = commenter['Comment']['message'];
      //     returnJson['comments'].push(newComment)
      //   })
      //   returnJson['comment_count'] = returnJson['comments'].length;
      //   res.status(200).json(returnJson);
      // })
      .then(commenters => {
        memoryCommenters = commenters;

        return Comment
          .findAll({
            attributes: ['id', 'userId', 'memoryId', 'message', 'createdAt'],
            where: { memoryId: selectedMemory['id']}
          })
      })
      .then(comments => {
        returnJson['comments'] = [];
        console.log(comments);
        for (let i = 0; i < comments.length; i++) {
          let comment = comments[i]['dataValues'];
          let commenter = memoryCommenters[i];
          let newComment = {};
          newComment['comment_id'] = comment['id'];
          newComment['user_id'] = comment['userId'];
          newComment['user_name'] = commenter['first_name'] + ' ' + commenter['last_name'];
          newComment['profile_pic_url'] = commenter['profile_pic_url'];
          newComment['message'] = comment['message'];
          newComment['timestamp'] = comment['createdAt'];
          returnJson['comments'].push(newComment);
        }
        returnJson['comment_count'] = returnJson['comments'].length;
        res.status(200).json(returnJson);
      })
  },
  delete(req, res) {
    var returnJson = {};
    console.log(`Destroying memory where id is: ${req.params.memoryId}`)
    return Like
      .destroy({
        where: { memoryId: req.params.memoryId }
      })
      .then(() => {
        return Comment
          .destroy({
            where: { memoryId: req.params.memoryId }
          })
      })
      .then(() => {
        return Memory
          .destroy({
            where: { id: req.params.memoryId }
          })
      })
      .then(num_rows => {
        if (num_rows === 1) {
          returnJson['message'] = 'Memory Destroyed';
          res.status(200).json(returnJson);
        } else if (num_rows === 0) {
          returnJson['message'] = 'Memory cannot be found';
          res.status(200).json(returnJson);
        }
      })
      .catch(err => {
        console.log(`Error when destroying memory (${req.params.memoryId})`);
        res.status(400).send(err);
      });
  }
}
