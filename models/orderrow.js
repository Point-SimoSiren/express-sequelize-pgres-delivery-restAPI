'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Orderrow extends Model {

        static associate(models) {
            this.order_id = this.belongsTo(models.Order, { foreignKey: 'order_id' });
            this.item_id = this.belongsTo(models.Item, { foreignKey: 'item_id' });
        }
    }
    Orderrow.init(
        {
            orderrow_id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            item_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'Item',
                    key: 'item_id',
                },
            },
            order_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'Order',
                    key: 'order_id',
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
            modelName: 'Orderrow',
            tableName: 'orderrow',
            freezeTableName: true,
        }
    );
    return Orderrow;
};