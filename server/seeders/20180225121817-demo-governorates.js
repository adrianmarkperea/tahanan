'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Governorates',
      [
        {
          id: "CAP",
          name: "Capital",
          createdAt: new Date(),
          updatedAt: new Date(),
          path: 'Sample Path'
        },
        {
          id: "MUH",
          name: "Muharraq",
          createdAt: new Date(),
          updatedAt: new Date(),
          path: 'Sample Path'
        },
        {
          id: "NOR",
          name: "North",
          createdAt: new Date(),
          updatedAt: new Date(),
          path: 'Sample Path'
        },
        {
          id: "SOU",
          name: "South",
          createdAt: new Date(),
          updatedAt: new Date(),
          path: 'Sample Path'
        }
      ],
    {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Governorates', null, {});
  }
};
