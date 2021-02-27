'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('category', [{
      name: 'Milk Products',
      description: 'Milk Products, include lactose',
      created_at: new Date,
      updated_at: new Date,
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Category', null, {});

  }
};
