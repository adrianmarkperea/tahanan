'use strict';
module.exports = (sequelize, DataTypes) => {
  var Memory = sequelize.define('Memory', {
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image_url: DataTypes.TEXT,
  }, {});
  Memory.associate = function(models) {
    Memory.belongsTo(models.User, {
      onDelete: 'CASCADE'
    });
    Memory.belongsTo(models.Landmark, {
      onDelete: 'CASCADE'
    });
  };
  return Memory;
};
