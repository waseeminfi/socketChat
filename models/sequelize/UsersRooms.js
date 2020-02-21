'user strict'

module.exports = (sequelize, DataTypes) => {
    const UsersRooms = sequelize.define('UsersRooms', {
        relationid : {
            type : DataTypes.UUID,
            defaultValue: function () {
                return require('uniqid')();
            },
        }
        },
    )

    return UsersRooms;
}