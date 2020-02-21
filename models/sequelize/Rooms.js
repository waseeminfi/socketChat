

module.exports = (sequelize, DataTypes) => {
    const Rooms = sequelize.define('Rooms', {

            roomid: {
                type: DataTypes.UUID,
                defaultValue: function () {
                    return require('uniqid')();
                },
                primaryKey: true,
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            isDeleted: {
                type: DataTypes.ENUM('0', '1'),
                defaultValue: '0',
                allowNull: true
            },
            topics: {
                type: DataTypes.STRING,
                allowNull: true
            },



        },

        {
            indexes: [{unique: true, fields: ['name']}]
        }
    )

    Rooms.associate = function (models) {
        Rooms.belongsToMany(models.Users,{
            as : 'users',
            through : models.UsersRooms
        })

        Rooms.hasMany(models.Messages,{
            as: "message",
            foreignKey: 'roomid'
        })

    }
    return Rooms
}