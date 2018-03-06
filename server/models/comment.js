'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});
  return Comment;
};
