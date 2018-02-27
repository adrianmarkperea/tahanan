const Jimp = require('jimp');

const maxImageWidth       = 1366;
const maxImageHeight      = 768;
const defaultImageQuality = 100;

module.exports = {
  storeImage: (file, path) => {
    return Jimp.read(file.data)
      .then(img => {
        var isHorizontal = img.bitmap.width > img.bitmap.height ? true : false;
        var width = isHorizontal ? maxImageWidth : maxImageHeight;
        var height = isHorizontal ? maxImageHeight : maxImageWidth;
        var quality = defaultImageQuality;
        return img
          .scaleToFit(width, height)
          .quality(quality)
          .write(path);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
