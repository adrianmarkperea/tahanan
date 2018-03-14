'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Landmarks',
      [
        {
          id: "dasman-centre",
          name: "Dasman Centre",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "GUD",
          lat: '26.2268109',
          lng: '50.5859564',
          image_url: 'https://res.cloudinary.com/higid3pm1/video/upload/v1519795242/landmarks/dasman-centre.mp4'
        },
        {
          id: "gudaibiya-mosque",
          name: "Gudaibiya Mosque",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "GUD",
          lat: '26.2240711',
          lng: '50.5859882',
          image_url: 'https://res.cloudinary.com/higid3pm1/video/upload/v1519795351/landmarks/gudaibiya-mosque.mp4'
        },
        {
          id: "american-alley",
          name: "American Alley",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SHA",
          lat: '26.2116517',
          lng: '50.6062597',
          image_url: 'https://res.cloudinary.com/higid3pm1/video/upload/v1519795247/landmarks/american-alley.mp4'
        },
        {
          id: "tree-of-life",
          name: "Tree of Life",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "JEB",
          lat: '25.9941341',
          lng: '50.580816',
          image_url: 'https://res.cloudinary.com/higid3pm1/video/upload/v1519795245/landmarks/tree-of-life.mp4'
        }
      ],
    {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Landmarks', null, {});
  }
};
