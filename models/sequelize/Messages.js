

module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define('Messages', {

            messageId: {
                type: DataTypes.UUID,
                defaultValue: function () {
                    return require('uniqid')();
                },
                primaryKey: true,
            },

            senderId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            receiverId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            messagebody: {
                type: DataTypes.STRING,
                allowNull: false
            },

            attachment: {
                type: DataTypes.STRING,
                allowNull: false
            },

            isDeleted: {
                type: DataTypes.ENUM('0', '1'),
                defaultValue: '0',
                allowNull: true
            },




        },

    )

    return Messages
}