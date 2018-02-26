const crypto = require('crypto');

function genRandomString(length) {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0, length);
}

function sha512(password, salt) {
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  var value = hash.digest('hex');
  return {
    salt: salt,
    passwordHash: value
  };
}

module.exports = {
  saltHashPassword: (password) => {
    let salt = genRandomString(16);
    let passwordData = sha512(password, salt);
    return passwordData;
  },
  verifyPassword: (salt, password, passwordHash) => {
    var passwordToVerify = sha512(password, salt).passwordHash;
    if (passwordToVerify === passwordHash) {
      return true;
    }
    return false;
  }
}
