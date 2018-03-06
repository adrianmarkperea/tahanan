var Comment = require('../models').Comment
var Memory = require('../models').Memory
var User = require('../models').User

module.exports = {
  addMemoryComment(req, res) {
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
          console.log('Comment successfull added');
          res.status(200).json(comment)
        }
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        res.status(400).json(err);
      })
  }
}
