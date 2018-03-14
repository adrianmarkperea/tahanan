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
          image_url: 'https://res.cloudinary.com/higid3pm1/video/upload/v1519795242/landmarks/dasman-centre.mp4',
          name_url: 'http://res.cloudinary.com/higid3pm1/image/upload/v1521005525/calligraphy/dasman-centre-calligraphy.png'
        },
        {
          id: "gudaibiya-mosque",
          name: "Gudaibiya Mosque",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "GUD",
          lat: '26.2240711',
          lng: '50.5859882',
          image_url: 'https://res.cloudinary.com/higid3pm1/video/upload/v1519795351/landmarks/gudaibiya-mosque.mp4',
          name_url: 'http://res.cloudinary.com/higid3pm1/image/upload/v1521005525/calligraphy/gudaibiya-mosque-calligraphy.png'
        },
        {
          id: "american-alley",
          name: "American Alley",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SHA",
          lat: '26.2116517',
          lng: '50.6062597',
          image_url: 'https://res.cloudinary.com/higid3pm1/video/upload/v1519795247/landmarks/american-alley.mp4',
          name_url: 'http://res.cloudinary.com/higid3pm1/image/upload/v1521005525/calligraphy/american-alley-calligraphy.png'
        },
        {
          id: "tree-of-life",
          name: "Tree of Life",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "JEB",
          lat: '25.9941341',
          lng: '50.580816',
          image_url: 'https://res.cloudinary.com/higid3pm1/video/upload/v1519795245/landmarks/tree-of-life.mp4',
          name_url: 'http://res.cloudinary.com/higid3pm1/image/upload/v1521005525/calligraphy/tree-of-life-calligraphy.png'
        },
        {
          id: "bahrain-international-circuit",
          name: "Bahrain International Circuit",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SAK",
          lat: '26.0316048',
          lng: '50.5107113',
          image_url: "http://res.cloudinary.com/higid3pm1/video/upload/v1521004159/landmarks/bahrain-international-circuit.mp4",
          name_url: 'http://res.cloudinary.com/higid3pm1/image/upload/v1521005525/calligraphy/bahrain-international-circuit-calligraphy.png'
        }
      ],
    {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Landmarks', null, {});
  }
};
