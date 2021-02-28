'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('category', [{
      name: 'Frozen meat products',
      description: 'Frozen Beef, Chicken or Pork',
      created_at: new Date,
      updated_at: new Date,
    },
    {
      name: 'Papers',
      description: 'All soft papers eq. toilet, tissue, servets',
      created_at: new Date,
      updated_at: new Date,
    },
    ], {});

    await queryInterface.bulkInsert('item', [{
      name: 'Burger beef 6x 125g',
      package: '750g',
      price: 8.95,
      category_id: 4,
      description: '100% beef, raw product',
      active: true,
      imagelink: 'no_image_yet',
      created_at: new Date,
      updated_at: new Date,
    },
    {
      name: 'Tissue paper',
      package: '6x',
      price: 2.90,
      category_id: 5,
      description: '2 ply, recycled',
      active: true,
      imagelink: 'no_image_yet',
      created_at: new Date,
      updated_at: new Date,
    },
    {
      name: 'Semi skimmed milk 2%',
      package: '1L cardboard',
      price: 0.69,
      category_id: 5,
      description: 'Include lactose, fat 2%',
      active: true,
      imagelink: 'no_image_yet',
      created_at: new Date,
      updated_at: new Date,
    }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Category', null, {});

  }
};
