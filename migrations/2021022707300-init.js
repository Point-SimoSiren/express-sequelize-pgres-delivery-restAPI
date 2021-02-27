'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      passwordhash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.NOW,
      },
    });

    await queryInterface.createTable('category', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.NOW,
      },
    });

    await queryInterface.createTable('item', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      package: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      caterogy_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'category',
          key: 'id',
          allowNull: false,
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.NOW,
      },
    });

    await queryInterface.createTable('order', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id',
          allowNull: false,
        },
      },
      delivery_date: {
        type: Sequelize.DATE,
      },
      delivered: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      paid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      total_price: {
        type: Sequelize.DECIMAL,
      },
      notes: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.NOW,
      },
    });

    await queryInterface.createTable('orderRow', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'order',
          key: 'id',
          allowNull: false,
        },
      },
      item_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'item',
          key: 'id',
          allowNull: false,
        },
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.NOW,
      },
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropAllTables();
  },
};