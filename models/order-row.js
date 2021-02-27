'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderRow extends Model {

        static associate(models) {
            this.order_id = this.belongsTo(models.Order, { foreignKey: 'order_id' });
            this.item_id = this.belongsTo(models.Item, { foreignKey: 'item_id' });
        }
    }
    OrderRow.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            order_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Order',
                    key: 'id',
                },
            },
            item_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Item',
                    key: 'id',
                },
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
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
            modelName: 'OrderRow',
            tableName: 'orderRow',
            freezeTableName: true,
        }
    );
    return OrderRow;
};