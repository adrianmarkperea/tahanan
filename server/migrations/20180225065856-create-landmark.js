'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Landmarks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      lng: {
        type: Sequelize.REAL,
        allowNull: false
      },
      lat: {
        type: Sequelize.REAL,
        allowNull: false
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      cityId: {
        type: Sequelize.STRING,
        references: {
          model: 'Cities',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Landmarks');
  }
};
