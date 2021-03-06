'use strict';
const uuid = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
        await queryInterface.bulkInsert('category', [{
          category_id: "dfe4fab1-4656-4bbc-b1ce-e4836e154b7a",
          name: 'Frozen meat products',
          description: 'Frozen Beef, Chicken or Pork',
          created_at: new Date,
          updated_at: new Date,
        },
        {
          category_id: "c194d39e-6371-448e-a1ef-cf160da05e9e",
          name: 'Papers',
          description: 'All soft papers eq. toilet, tissue, servets',
          created_at: new Date,
          updated_at: new Date,
        },
        ], {});
        */
    await queryInterface.bulkInsert('item', [{
      item_id: "02d5a0ee-f19f-458c-98d2-df51fea551e7",
      name: 'Burger beef 6x 125g',
      package: '750g',
      price: 8.95,
      category_id: "dfe4fab1-4656-4bbc-b1ce-e4836e154b7a",
      description: '100% beef, raw product',
      active: true,
      manufacturer: "Manson Slavery",
      imagelink: 'no_image_yet',
      created_at: new Date,
      updated_at: new Date,
    },
    {
      item_id: "c730ea4e-8fdd-489a-8f33-3844098b32f8",
      name: 'Tissue paper',
      package: '6x',
      price: 2.90,
      category_id: "c194d39e-6371-448e-a1ef-cf160da05e9e",
      description: '2 ply, recycled',
      active: true,
      manufacturer: "Forest LTD",
      imagelink: 'no_image_yet',
      created_at: new Date,
      updated_at: new Date,
    },
      /*    {
            item_id: "",
            name: 'Semi skimmed milk 2%',
            package: '1L cardboard',
            price: 0.69,
            category_id: Sequelize.UUID,
            description: 'Include lactose, fat 2%',
            active: true,
            imagelink: 'no_image_yet',
            created_at: new Date,
            updated_at: new Date,
          }*/
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Category', null, {});

  }
};
