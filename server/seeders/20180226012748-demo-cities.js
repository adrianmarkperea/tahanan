'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cities',
      [
        // Cities in CAPITAL
        {
          id: "ADL",
          name: "Adliya",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "CAP"
        },
        {
          id: "GUD",
          name: "Gudaibiya",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "CAP"
        },
        {
          id: "JUF",
          name: "Juffair",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "CAP"
        },
        {
          id: "MAN",
          name: "Manama",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "CAP"
        },
        {
          id: "SALMANIYA",
          name: "Salmaniya",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "CAP"
        },
        {
          id: "SAN",
          name: "Sanabis",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "CAP"
        },
        {
          id: "SEE",
          name: "Seef",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "CAP"
        },
        {
          id: "SHA",
          name: "Shabab Avenue",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "CAP"
        },
        {
          id: "TUB",
          name: "Tubli",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "CAP"
        },
        // Cities in Muharraq
        {
          id: "AMW",
          name: "Amwaj Islands",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "MUH"
        },
        {
          id: "MUH",
          name: "Muharraq",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "MUH"
        },
        // Cities in North
        {
          id: "ALI",
          name: "A'ali",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "NOR"
        },
        {
          id: "BAR",
          name: "Barbar",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "NOR"
        },
        {
          id: "JAS",
          name: "Jasra",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "NOR"
        },
        {
          id: "SALMABAD",
          name: "Salmabad",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "NOR"
        },
        // Cities in South
        {
          id: "AWA",
          name: "Awali",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "SOU"
        },
        {
          id: "HAW",
          name: "Hawar Islands",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "SOU"
        },
        {
          id: "ISA",
          name: "Isa Town",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "SOU"
        },
        {
          id: "JEB",
          name: "Jebel Al Dukhan",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "SOU"
        },
        {
          id: "NUW",
          name: "Nuwaidrat",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "SOU"
        },
        {
          id: "SAK",
          name: "Sakhir",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "SOU"
        },
        {
          id: "SIT",
          name: "Sitra",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "SOU"
        },
        {
          id: "ZAL",
          name: "Zallaq",
          createdAt: new Date(),
          updatedAt: new Date(),
          governorateId: "SOU"
        },
      ],
    {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cities', null, {});
  }
};
