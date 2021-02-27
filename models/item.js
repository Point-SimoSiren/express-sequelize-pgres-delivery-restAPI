'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {

        static associate(models) {
            this.category_id = this.belongsTo(models.Category, { foreignKey: 'category_id' });
        }
    }
    Item.init(
        {
            id: DataTypes.DataTypes.INTEGER,
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            package: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL,
            },
            manufacturer: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            imagelink: {
                type: DataTypes.STRING,
            },
            category_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Category',
                    key: 'id',
                },
            },
            createdAt: {
                type: DataTypes.DATE,
                field: 'created_at',
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'updated_at',
            },
        },
        {
            sequelize,
            modelName: 'Item',
            tableName: 'item',
            freezeTableName: true,
        }
    );
    return Item;
};