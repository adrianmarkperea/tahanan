'use strict';
module.exports = (sequelize, DataTypes) => {
  var Governorate = sequelize.define('Governorate', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Governorate.associate = function(models) {
    Governorate.hasMany(models.City, {
      as: "Cities",
      foreignKey: 'governorateId'
    });
  };
  return Governorate;
};
