'use strict';
module.exports = (sequelize, DataTypes) => {
  var City = sequelize.define('City', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  City.associate = function(models) {
    City.belongsTo(models.Governorate, {
      onDelete: 'CASCADE'
    });
    City.hasMany(models.Landmark, {
      as: 'Landmarks'
    });
  };
  return City;
};
