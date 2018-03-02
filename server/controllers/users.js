const User = require('../models').User;
const imageFactory = require('../../libs/image-factory');

// api/users/:userId
// REQ
// {
//   bio: 'string',
//   profile_pic_url: 'multiform'
// }


module.exports = {
  update(req, res) {
    var returnJson = {};
    returnJson['errors'] = [];
    var bio = req.body.bio;
    var profile_pic_image = req.files ? req.files.profile_pic_url : null;
    var profile_pic_url = null;

    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          returnJson['errors'].push('user not found');
          console.log('No user');
          return res.status(404).json(returnJson);
        }
        if (profile_pic_image) {
           return imageFactory.storeImage(profile_pic_image)
            .then(uploadRes => {
              profile_pic_url = uploadRes['secure_url'];
              return User
                .update(
                  {
                    bio: bio,
                    profile_pic_url: profile_pic_url
                  },
                  {
                    fields: ['bio', 'profile_pic_url'],
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
                bio: bio
              },
              {
                fields: ['bio'],
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
