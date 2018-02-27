'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profile_pic_url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Memory, {
      as: "Memories",
      onDelete: 'CASCADE',
      foreignKey: 'userId'
    });
  };
  return User;
};
