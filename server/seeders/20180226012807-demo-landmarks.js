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
          lon: '50.5893802',
          image_url: '/image_store/landmarks/block-338.jpg'
        },
        // Landmarks in Gudaibiya-Capital
        {
          name: "Dasman Centre",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "GUD",
          lat: '26.2268109',
          lon: '50.5859564',
          image_url: '/image_store/landmarks/dasman-centre.jpg'
        },
        {
          name: "Gudaibiya Mosque",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "GUD",
          lat: '26.2240711',
          lon: '50.5859882',
          image_url: '/image_store/landmarks/gudaibiya-mosque.jpg'
        },
        {
          name: "Happy Town",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "GUD",
          lat: '26.2268332',
          lon: '50.5867041',
          image_url: '/image_store/landmarks/happy-town.jpg'
        },
        // Landmarks in Juffair-Capital
        {
          name: "Juffair",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "JUF",
          lat: '26.2128222',
          lon: '50.5990161',
          image_url: '/image_store/landmarks/juffair.jpg'
        },
        // Landmarks in Manama-Capital
        {
          name: "Andalus Garden",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN",
          lat: '26.2223106',
          lon: '50.5832252',
          image_url: '/image_store/landmarks/andalus-garden.jpg'
        },
        {
          name: "Bahrain National Museum",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN",
          lat: '26.241485',
          lon: '50.5957062',
          image_url: '/image_store/landmarks/bahrain-national-museum.jpg'
        },
        {
          name: "City Centre Bahrain",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN",
          lat: '26.2334356',
          lon: '50.5516164',
          image_url: '/image_store/landmarks/city-centre-bahrain.jpg'
        },
        {
          name: "City Centre Bahrain Cinema",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN",
          lat: '26.2334356',
          lon: '50.5516164',
          image_url: '/image_store/landmarks/city-centre-bahrain-cinema.jpg'
        },
        {
          name: "Funland",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN",
          lat: '26.2342963',
          lon: '50.5970956',
          image_url: '/image_store/landmarks/funland.jpg'
        },
        {
          name: "Kids Kingdom",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN",
          lat: '26.2353087',
          lon: '50.5684011',
          image_url: '/image_store/landmarks/kids-kingdom.jpg'
        },
        {
          name: "Magic Planet",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN",
          lat: '26.2336362',
          lon: '50.5501425',
          image_url: '/image_store/landmarks/magic-planet.jpg'
        },
        {
          name: "Sacred Heart Church",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN",
          lat: '26.2270621',
          lon: '50.5770884',
          image_url: '/image_store/landmarks/block-338.jpg'
        },
        // Landmarks in Salmaniya-Capital
        {
          name: "Water Garden",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SALMANIYA",
          lat: '26.2207005',
          lon: '50.5659974',
          image_url: '/image_store/landmarks/water-garden.jpg'
        },
        // Landmarks in Sanabis-Capital
        {
          name: "Bahrain International Exhibition and Convention Centre",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SAN",
          lat: '26.2298608',
          lon: '50.5402153',
          image_url: '/image_store/landmarks/bahrain-international-exhibition-and-convention-centre.jpg'
        },
        {
          name: "Dana Mall",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SAN",
          lat: '26.2301433',
          lon: '50.5504225',
          image_url: '/image_store/landmarks/dana-mall.jpg'
        },
        {
          name: "Geant, Bahrain Mall",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SAN",
          lat: '26.229032',
          lon: '50.5359134',
          image_url: '/image_store/landmarks/geant-bahrain-mall.jpg'
        },
        // Landmarks in Seef-Capital
        {
          name: "Magic Island, Seef Mall",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SEE",
          lat: '26.2320886',
          lon: '50.5370879',
          image_url: '/image_store/landmarks/magic-island-seef-mall.jpg'
        },
        {
          name: "Seef Mall",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SEE",
          lat: '26.2324762',
          lon: '50.5347655',
          image_url: '/image_store/landmarks/seef-mall.jpg'
        },
        // Landmarks in Shahab Avenue-Capital
        {
          name: "American Alley",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SHA",
          lat: '26.2116517',
          lon: '50.6062597',
          image_url: '/image_store/landmarks/american-alley.jpg'
        },
        // Landmarks in Tubli-Capital
        {
          name: "Adhari Park",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "TUB",
          lat: '26.1985329',
          lon: '50.5430745',
          image_url: '/image_store/landmarks/adhari-park.jpg'
        },
        /* MUHARRAQ */
        // Landmarks in Amwaj Islands-Muharraq
        {
          name: "Lagoon Park",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "AMW",
          lat: '26.2878077',
          lon: '50.6619913',
          image_url: '/image_store/landmarks/lagoon-park.jpg'
        },
        // Landmarks in Muharraq-Muhharaq
        {
          name: "Shaikhh Isa Causeway",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MUH",
          lat: '26.2534484',
          lon: '50.5911795',
          image_url: '/image_store/landmarks/shaikhh-isa-causeway.jpg'
        },

        /* NORTH */
        // Landmarks in A'ali-North
        {
          name: "Philippine School Bahrain",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "ALI",
          lat: '26.1552951',
          lon: '50.5239343',
          image_url: '/image_store/landmarks/philippine-school-bahrain.jpg'
        },
        {
          name: "Ramli Mall",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "ALI",
          lat: '26.1630754',
          lon: '50.5208689',
          image_url: '/image_store/landmarks/ramli-mall.jpg'
        },
        // Landmarks in Barbar-North
        {
          name: "Jawad Dome",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "BAR",
          lat: '26.221367',
          lon: '50.4871177',
          image_url: '/image_store/landmarks/jawad-dome.jpg'
        },
        // Landmarks in Jasra-North
        {
          name: "King Fahad Causeway",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "JAS",
          lat: '26.1723882',
          lon: '50.4558303',
          image_url: '/image_store/landmarks/king-fahad-causeway.jpg'
        },
        // Landmarks in Salmabad-North
        {
          name: "AMA International University",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SALMABAD",
          lat: '26.1841255',
          lon: '50.518249',
          image_url: '/image_store/landmarks/ama-international-university.jpg'
        },
        /* SOUTH */
        // Landmarks in Awali-South
        {
          name: "Awali Church",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "AWA",
          lat: '26.091698',
          lon: '50.5440194',
          image_url: '/image_store/landmarks/awali-church.jpg'
        },
        // Landmarks in Hawar Islands-South
        {
          name: "Hawar Islands",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "HAW",
          lat: '26.667792',
          lon: '50.5031119',
          image_url: '/image_store/landmarks/hawar-islands.jpg'
        },
        // Landmarks in Isa Town-South
        {
          name: "Isa Town Mall",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "ISA",
          lat: '26.1720124',
          lon: '50.5472334',
          image_url: '/image_store/landmarks/isa-town-mall.jpg'
        },
        {
          name: "Sacred Heart School",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "ISA",
          lat: '26.2278663',
          lon: '50.5777208',
          image_url: '/image_store/landmarks/sacred-heart-school.jpg'
        },
        // Landmarks in Jebel Al Dukhan-South
        {
          name: "Tree of Life",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "JEB",
          lat: '26.9941389',
          lon: '50.580816',
          image_url: '/image_store/landmarks/tree-of-life.jpg'
        },
        // Landmarks in Nuwaidrat-SOUTH
        {
          name: "The Centre",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "NUW",
          lat: '26.1281529',
          lon: '50.5877629',
          image_url: '/image_store/landmarks/the-centre.jpg'
        },
        // Landmarks in Sakhir-South
        {
          name: "Bahrain International Circuit",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SAK",
          lat: '26.0316048',
          lon: '50.5107113',
          image_url: '/image_store/landmarks/bahrain-international-circuit.jpg'
        },
        {
          name: "Lost Paradise of Dilmun",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SAK",
          lat: '26.0134218',
          lon: '50.5081713',
          image_url: '/image_store/landmarks/lost-paradise-of-dilmum.jpg'
        },
        // Landmarks in Sitra-South
        {
          name: "Al Noor International School",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SIT",
          lat: '26.1676073',
          lon: '50.6000535',
          image_url: '/image_store/landmarks/al-noor-international-school.jpg'
        },
        // Landmarks in Zallaq-South
        {
          name: "Al Areen Park",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "ZAL",
          lat: '26.0150286',
          lon: '50.4920527',
          image_url: '/image_store/landmarks/al-areen-park.jpg'
        }
      ],
    {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Landmarks', null, {});
  }
};
