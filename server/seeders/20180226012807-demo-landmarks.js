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
          cityId: "ADL"
        },
        // Landmarks in Gudaibiya-Capital
        {
          name: "Dasman Centre",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "GUD"
        },
        {
          name: "Gudaibiya",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "GUD"
        },
        {
          name: "Happy Town",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "GUD"
        },
        // Landmarks in Juffair-Capital
        {
          name: "Juffair",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "JUF"
        },
        // Landmarks in Manama-Capital
        {
          name: "Andalus Garden",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN"
        },
        {
          name: "Bahrain National Museum",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN"
        },
        {
          name: "City Centre Bahrain",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN"
        },
        {
          name: "City Centre Bahrain Cinema",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN"
        },
        {
          name: "Funland",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN"
        },
        {
          name: "Kids Kingdom",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN"
        },
        {
          name: "Magic Planet",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN"
        },
        {
          name: "Sacred Heart Church",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MAN"
        },
        // Landmarks in Salmaniya-Capital
        {
          name: "Water Garden",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SALMANIYA"
        },
        // Landmarks in Sanabis-Capital
        {
          name: "Bahrain International Exhibition and Convention Centre",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SAN"
        },
        {
          name: "Dana Mall",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SAN"
        },
        {
          name: "Geant, Bahrain Mall",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SAN"
        },
        // Landmarks in Seef-Capital
        {
          name: "Magic Island, Seef Mall",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SEE"
        },
        {
          name: "Seef Mall",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SEE"
        },
        // Landmarks in Shahab Avenue-Capital
        {
          name: "American Alley",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SHA"
        },
        // Landmarks in Tubli-Capital
        {
          name: "Adhari Park",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "TUB"
        },
        /* MUHARRAQ */
        // Landmarks in Amwaj Islands-Muharraq
        {
          name: "Lagoon Park",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "AMW"
        },
        // Landmarks in Muharraq-Muhharaq
        {
          name: "Shaikhh Isa Causeway",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "MUH"
        },
        /* NORTH */
        // Landmarks in A'ali-North
        {
          name: "Philippine School Bahrain",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "ALI"
        },
        {
          name: "Ramli Mall",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "ALI"
        },
        // Landmarks in Barbar-North
        {
          name: "Jawad Dome",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "BAR"
        },
        // Landmarks in Jasra-North
        {
          name: "King Fahad Causeway",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "JAS"
        },
        // Landmarks in Salmabad-North
        {
          name: "AMA International University",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SALMABAD"
        },
        /* SOUTH */
        // Landmarks in Awali-South
        {
          name: "Awali Church",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "AWA"
        },
        // Landmarks in Hawar Islands-South
        {
          name: "Hawar Islands",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "HAW"
        },
        // Landmarks in Isa Town-South
        {
          name: "Isa Town Mall",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "ISA"
        },
        {
          name: "Sacred Heart School",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "ISA"
        },
        // Landmarks in Jebel Al Dukhan-South
        {
          name: "Tree of Life",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "JEB"
        },
        // Landmarks in Nuwaidrat-SOUTH
        {
          name: "The Centre",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "NUW"
        },
        // Landmarks in Sakhir-South
        {
          name: "Bahrain International Circuit",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SAK"
        },
        {
          name: "Lost Paradise of Dilmun",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SAK"
        },
        // Landmarks in Sitra-South
        {
          name: "Al Noor International School",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "SIT"
        },
        // Landmarks in Zallaq-South
        {
          name: "Al Areen Park",
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: "ZAL"
        }
      ],
    {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Landmarks', null, {});
  }
};
