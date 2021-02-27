'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {

        static associate(models) {
            this.user_id = this.belongsTo(models.User, { foreignKey: 'user_id' });
        }
    }
    Order.init(
        {
            id: DataTypes.DataTypes.INTEGER,
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'User',
                    key: 'id',
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