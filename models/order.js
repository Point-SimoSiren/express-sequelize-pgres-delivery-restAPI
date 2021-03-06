'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {

        static associate(models) {
            this.user_id = this.belongsTo(models.User, { foreignKey: 'user_id' });
        }
    }
    Order.init(
        {
            order_id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'User',
                    key: 'user_id',
                },
            },
            deliveryDate: {
                type: DataTypes.DATE,
                field: 'delivery_date',
            },
            delivered: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            paid: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            notes: {
                type: DataTypes.STRING,
            },
            totalPrice: {
                type: DataTypes.DECIMAL,
                field: 'total_price',
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
            modelName: 'Order',
            tableName: 'Order',
            freezeTableName: true,
        }
    );
    return Order;
};