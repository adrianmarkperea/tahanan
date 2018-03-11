const User = require('../models').User;
const imageFactory = require('../../libs/image-factory');
const verifier = require('../../libs/verifier');

function extractUserData(user) {
  var returnJson = {};
  returnJson.userId     = user['id'];
  returnJson.name = user['first_name'] + ' ' + user['last_name'];
  returnJson.email = user['email'];
  returnJson.bio = user['bio'];
  returnJson.image_url = user['profile_pic_url'];
  return returnJson;
}

// api/users/:userId
// REQ
// {
//   first_name: 'string'
//   last_name: 'string'
//   bio: 'string',
//   profileImage: 'multiform'
// }
// TODO: add first_name and last_name, fix profileImage detection

module.exports = {
  retrieve(req, res) {
    var returnJson = {};
    returnJson['errors'] = [];
    var userId = req.params.userId;
    User
      .findById(userId)
      .then(user => {
        if (!user) {
          // TODO: ERROR!!!
        }
        returnJson['data'] = {};
        returnJson['data']['userId']    = user['id'];
        returnJson['data']['name']      = user['first_name'] + ' ' + user['last_name'];
        returnJson['data']['email']     = user['email'];
        returnJson['data']['bio']       = user['bio'];
        returnJson['data']['image_url'] = user['profile_pic_url'];
        res.status(200).json(returnJson);
      })
  },
  update(req, res) {
    var returnJson = {};
    returnJson['errors'] = [];
    var profile_pic_image = req.files ? req.files.profileImage : null;
    if (req.files.profileImage === undefined || req.files.profileImage === null) {
      profile_pic_image = null;
    }
    var profile_pic_url = null;

    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          returnJson['errors'].push('user not found');
          console.log('No user');
          return res.status(404).json(returnJson);
        }

        var first_name = req.body.first_name || user[1][0]['first_name']
        var last_name = req.body.last_name || user[1][0]['last_name']
        var bio = req.body.bio || user[1][0]['bio'];

        if (profile_pic_image) {
           return imageFactory.storeImage(profile_pic_image)
            .then(uploadRes => {
              profile_pic_url = uploadRes['secure_url'];
              return User
                .update(
                  {
                    bio: bio,
                    profile_pic_url: profile_pic_url,
                    first_name: first_name,
                    last_name: last_name
                  },
                  {
                    fields: ['bio', 'profile_pic_url', 'first_name', 'last_name'],
                    where: { id: user['id'] },
                    returning: true
                })
            })
            .then(user => {
              var retUser = user[1][0];
              returnJson['userId']    = retUser['id'];
              returnJson['name']      = retUser['first_name'] + ' ' + retUser['last_name'];
              returnJson['email']     = retUser['email'];
              returnJson['bio']       = retUser['bio'];
              returnJson['image_url'] = retUser['profile_pic_url'];
              res.status(200).json(returnJson);
            })
        } else {
          return User
            .update(
              {
                bio: bio,
                first_name: first_name,
                last_name: last_name
              },
              {
                fields: ['bio', 'first_name', 'last_name'],
                where: { id: user['id'] },
                returning: true
            })
            .then(user => {
              var retUser = user[1][0];
              returnJson['userId']    = retUser['id'];
              returnJson['name']      = retUser['first_name'] + ' ' + retUser['last_name'];
              returnJson['email']     = retUser['email'];
              returnJson['bio']       = retUser['bio'];
              returnJson['image_url'] = retUser['profile_pic_url'];
              res.status(200).json(returnJson);
            })
        }
      })
      .catch(err => res.status(400).send(err));
  }
}
