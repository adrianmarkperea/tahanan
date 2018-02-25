'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Governorates',
      [
        {
            name: "gAAA",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: "gBBB",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: "gCCC",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: "gDDD",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: "gEEE",
            createdAt: new Date(),
            updatedAt: new Date()
        },
      ],
    {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Governorates', null, {});
  }
};
