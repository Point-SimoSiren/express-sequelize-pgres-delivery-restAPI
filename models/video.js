'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Video extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.channel_id = this.belongsTo(models.Channel, { foreignKey: 'channel_id' });
        }
    }
    Video.init(
        {
            // id: DataTypes.DataTypes.INTEGER,
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
    return Video;
};