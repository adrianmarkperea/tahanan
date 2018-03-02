'use strict';
module.exports = (sequelize, DataTypes) => {
  var Like = sequelize.define('Like', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: 'memory_like'
    },
    memoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: 'memory_like'
    }
  });
  return Like;
};
