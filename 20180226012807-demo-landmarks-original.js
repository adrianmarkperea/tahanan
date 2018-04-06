'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Landmarks',
      [
        /* CAPITAL */
        // Landmarks in Adliya-Capital
        {
          name: "Block 338",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "ADL",
          lat: '26.2121845',
          lng: '50.5893802',
          image_url: '/image_store/landmarks/block-338.mp4'
        },
        // Landmarks in Gudaibiya-Capital

        
        // Landmarks in Juffair-Capital

        // Landmarks in Manama-Capital



        {
          name: "City Centre Bahrain Cinema",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN",
          lat: '26.2334356',
          lng: '50.5516164',
          image_url: '/image_store/landmarks/city-centre-bahrain-cinema.mp4'
        },
        {
          name: "Kids Kingdom",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN",
          lat: '26.2353087',
          lng: '50.5684011',
          image_url: '/image_store/landmarks/kids-kingdom.mp4'
        },
        {
          name: "Magic Planet",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN",
          lat: '26.2336362',
          lng: '50.5501425',
          image_url: '/image_store/landmarks/magic-planet.mp4'
        },

        // Landmarks in Salmaniya-Capital
        {
          name: "Water Garden",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SALMANIYA",
          lat: '26.2207005',
          lng: '50.5659974',
          image_url: '/image_store/landmarks/water-garden.mp4'
        },
        // Landmarks in Sanabis-Capital
        {
          name: "Bahrain International Exhibition and Convention Centre",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SAN",
          lat: '26.2298608',
          lng: '50.5402153',
          image_url: '/image_store/landmarks/bahrain-international-exhibition-and-convention-centre.mp4'
        },
        {
          name: "Dana Mall",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SAN",
          lat: '26.2301433',
          lng: '50.5504225',
          image_url: '/image_store/landmarks/dana-mall.mp4'
        },
        {
          name: "Geant, Bahrain Mall",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SAN",
          lat: '26.229032',
          lng: '50.5359134',
          image_url: '/image_store/landmarks/geant-bahrain-mall.mp4'
        },
        // Landmarks in Seef-Capital
        {
          name: "Magic Island, Seef Mall",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SEE",
          lat: '26.2320886',
          lng: '50.5370879',
          image_url: '/image_store/landmarks/magic-island-seef-mall.mp4'
        },
        {
          name: "Seef Mall",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SEE",
          lat: '26.2324762',
          lng: '50.5347655',
          image_url: '/image_store/landmarks/seef-mall.mp4'
        },
        // Landmarks in Shahab Avenue-Capital
        // Landmarks in Tubli-Capital
        /* MUHARRAQ */
        // Landmarks in Amwaj Islands-Muharraq
        {
          name: "Lagoon Park",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "AMW",
          lat: '26.2878077',
          lng: '50.6619913',
          image_url: '/image_store/landmarks/lagoon-park.mp4'
        },
        // Landmarks in Muharraq-Muhharaq


        /* NORTH */
        // Landmarks in A'ali-North

        {
          name: "Ramli Mall",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "ALI",
          lat: '26.1630754',
          lng: '50.5208689',
          image_url: '/image_store/landmarks/ramli-mall.mp4'
        },
        // Landmarks in Barbar-North
        {
          name: "Jawad Dome",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "BAR",
          lat: '26.221367',
          lng: '50.4871177',
          image_url: '/image_store/landmarks/jawad-dome.mp4'
        },
        // Landmarks in Jasra-North

        // Landmarks in Salmabad-North
        {
          name: "AMA International University",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SALMABAD",
          lat: '26.1841255',
          lng: '50.518249',
          image_url: '/image_store/landmarks/ama-international-university.mp4'
        },
        /* SOUTH */
        // Landmarks in Awali-South
        {
          name: "Awali Church",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "AWA",
          lat: '26.091698',
          lng: '50.5440194',
          image_url: '/image_store/landmarks/awali-church.mp4'
        },
        // Landmarks in Hawar Islands-South
        {
          name: "Hawar Islands",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "HAW",
          lat: '26.667792',
          lng: '50.5031119',
          image_url: '/image_store/landmarks/hawar-islands.mp4'
        },
        // Landmarks in Isa Town-South
        {
          name: "Isa Town Mall",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "ISA",
          lat: '26.1720124',
          lng: '50.5472334',
          image_url: '/image_store/landmarks/isa-town-mall.mp4'
        },

        // Landmarks in Jebel Al Dukhan-South
        // Landmarks in Nuwaidrat-SOUTH
        {
          name: "The Centre",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "NUW",
          lat: '26.1281529',
          lng: '50.5877629',
          image_url: '/image_store/landmarks/the-centre.mp4'
        },
        // Landmarks in Sakhir-South

        // Landmarks in Sitra-South
        {
          name: "Al Noor International School",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SIT",
          lat: '26.1676073',
          lng: '50.6000535',
          image_url: '/image_store/landmarks/al-noor-international-school.mp4'
        },
        // Landmarks in Zallaq-South

      ],
    {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Landmarks', null, {});
  }
};
