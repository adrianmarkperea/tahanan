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
    bio: {
      allowNull: true,
      type: DataTypes.STRING
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
    User.belongsToMany(models.Memory, { through: 'Likes', foreignKey: 'userId'});
    User.belongsToMany(models.Memory, { as: 'Posts', through: models.Comment, foreignKey: 'userId'});
  };

  return User;
};
