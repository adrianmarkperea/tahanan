var Comment = require('../models').Comment
var Memory = require('../models').Memory
var User = require('../models').User
var Landmark = require('../models').Landmark
var memoriesController = require('./memories')

module.exports = {
  addMemoryComment(req, res) {
    var returnJson = {};
    console.log('Adding a comment')
    var selectedMemory;
    var selectedUser;
    return Memory
      .findById(req.params.memoryId)
      .then(memory => {
        if (!memory) {
          console.log('Memory not found');
          // TODO: Error!
        }
        console.log('Memory found');
        selectedMemory = memory;
        return User
          .findById(req.body.userId)
      })
      .then(user => {
        if (!user) {
          console.log('User not found')
          // TODO: Error!
        }
        console.log('User found');
        selectedUser = user;
        return Comment
          .create({
            memoryId: req.params.memoryId,
            userId: req.body.userId,
            message: req.body.message
          })
      })
      .then(comment => {
        if (!comment) {
          console.log('Comment not created')
          // TODO: Error!
        } else {
          // console.log('Comment successfull added');
          // res.status(200).json(comment)
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
        }
      })
      .then(memory => {
        if (!memory) {
          // TODO: Error!
        }
        selectedMemory = memory;
        returnJson['mem_id']    = selectedMemory['id'];
        returnJson['user_id']   = selectedMemory['User']['id'];
        returnJson['user_name'] = selectedMemory['User']['first_name'] + ' ' +  selectedMemory['User']['last_name'];
        returnJson['land_id']   = selectedMemory['Landmark']['id'];
        returnJson['land_name'] = selectedMemory['Landmark']['name'];
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
        // console.log(users);
        return selectedMemory
          .getCommenters()
      })
      .then(commenters => {
        returnJson['comments'] = []
        commenters.forEach(commenter => {
          var newComment = {};
          newComment['user_name'] = commenter['first_name'] + ' ' + commenter['last_name']
          newComment['timestamp'] = commenter['Comment']['createdAt'];
          newComment['message'] = commenter['Comment']['message'];
          returnJson['comments'].push(newComment)
        })
        returnJson['comment_count'] = returnJson['comments'].length;
        res.status(200).json(returnJson);
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        res.status(400).json(err);
      })
  }
}
