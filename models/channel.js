'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Channel extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.user_id = this.belongsTo(models.User, {
                foreignKey: 'user_id',
            });
        }
    }
    Channel.init(
        {
            // id: DataTypes.INTEGER,
            name: DataTypes.STRING,
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
            modelName: 'Channel',
            tableName: 'channel'
        }
    );
    return Channel;
};