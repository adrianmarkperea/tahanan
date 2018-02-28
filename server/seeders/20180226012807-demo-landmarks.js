'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Landmarks',
      [
        {
          name: "Dasman Centre",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "GUD",
          lat: '26.2268109',
          lon: '50.5859564',
          image_url: 'https://res.cloudinary.com/higid3pm1/video/upload/v1519795242/landmarks/dasman-centre.mp4'
        },
        {
          name: "Gudaibiya Mosque",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "GUD",
          lat: '26.2240711',
          lon: '50.5859882',
          image_url: 'https://res.cloudinary.com/higid3pm1/video/upload/v1519795351/landmarks/gudaibiya-mosque.mp4'
        },
        {
          name: "American Alley",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SHA",
          lat: '26.2116517',
          lon: '50.6062597',
          image_url: 'https://res.cloudinary.com/higid3pm1/video/upload/v1519795247/landmarks/american-alley.mp4'
        },
        {
          name: "Tree of Life",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "JEB",
          lat: '26.9941389',
          lon: '50.580816',
          image_url: 'https://res.cloudinary.com/higid3pm1/video/upload/v1519795245/landmarks/tree-of-life.mp4'
        }
      ],
    {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Landmarks', null, {});
  }
};
