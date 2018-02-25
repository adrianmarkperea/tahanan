'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',
      [
        {
          first_name: 'aaa',
          last_name: 'AAA',
          username: 'aaaAAA',
          password: 'AAAaaa',
          bio: 'biobiobio',
          profile_pic_url: '/profilepic.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          first_name: 'bbb',
          last_name: 'BBB',
          username: 'bbbBBB',
          password: 'BBBaaa',
          bio: 'biobiobio',
          profile_pic_url: '/profilepic.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          first_name: 'ccc',
          last_name: 'CCC',
          username: 'cccCCC',
          password: 'CCCccc',
          bio: 'biobiobio',
          profile_pic_url: '/profilepic.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          first_name: 'ddd',
          last_name: 'DDD',
          username: 'dddDDD',
          password: 'DDDddd',
          bio: 'biobiobio',
          profile_pic_url: '/profilepic.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          first_name: 'eee',
          last_name: 'EEE',
          username: 'eeeEEE',
          password: 'EEEeee',
          bio: 'biobiobio',
          profile_pic_url: '/profilepic.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
    {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
