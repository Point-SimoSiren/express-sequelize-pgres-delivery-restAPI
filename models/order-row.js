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
            id: DataTypes.DataTypes.INTEGER,
            title: DataTypes.STRING,
            channel_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Channel',
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
            modelName: 'Video',
            tableName: 'video',
            freezeTableName: true,
        }
    );
    return OrderRow;
};