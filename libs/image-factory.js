const Jimp = require('jimp');
const cloudinary = require('cloudinary');
const path = require('path');

const maxImageWidth       = 1366;
const maxImageHeight      = 768;
const defaultImageQuality = 100;

module.exports = {
  storeImage: (file) => {
    var tempPath = path.join(__dirname, `../temp/${(new Date().getTime()).toString()}.jpg`);
    return Jimp.read(file.data)
      .then(img => {
        var isHorizontal = img.bitmap.width > img.bitmap.height ? true : false;
        var width = isHorizontal ? maxImageWidth : maxImageHeight;
        var height = isHorizontal ? maxImageHeight : maxImageWidth;
        var quality = defaultImageQuality;
        return img
          .scaleToFit(width, height)
          .quality(quality)
          .write(tempPath)
      })
      .then(img => {
        return cloudinary.uploader
          .upload(tempPath)
      })
      .catch(err => {
        console.log(err);
      });
  }
}
