const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))


function hashPassword(user, options) {
    const SALT_FACTOR = 8
    if (!user.changed('password')) {
        return
    }
    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashAsync(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash)
        });
}

function hashPasswordOnUpdate(options) {
    const SALT_FACTOR = 8
    if (!options.attributes.password) {
        return
    }
    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashAsync(options.attributes.password, salt, null))
        .then(hash => {
            options.attributes.password = hash;
        });
}
const {
    UsersRooms
} = require(__basedir + "/models");
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        username: {
            type: DataTypes.STRING
        },
        password: DataTypes.STRING,
        uuid: {
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
        isActivated: {
            type: DataTypes.ENUM('0', '1'),
            defaultValue: '0',
            allowNull: true
        },
        isDeleted: {
            type: DataTypes.ENUM('0', '1'),
            defaultValue: '0',
            allowNull: true
        },


    }, {
        hooks: {
            beforeSave: hashPassword,
            beforeBulkUpdate: hashPasswordOnUpdate,
        }
    },
        {
            indexes: [{ unique: true, fields: ['uuid', 'email'] }]
        }
    )

    Users.prototype.comparePassword = function (password) {
        // checking if password is null, i.e. its created from google or linkedin or trying to login using local system.
        if (!this.password) {
            return false;
        } else {
            return bcrypt.compareSync(password, this.password)
        }
    };
    Users.associate = function (models) {
        Users.belongsToMany(models.Users, {
            as: "Friends",
            through: models.Friendships
        })
        Users.belongsToMany(models.Users, {
            as: 'Requesters',
            through: 'friendRequests',
            foreignKey: 'requesteeId',
            onDelete: 'CASCADE'
        });
        Users.belongsToMany(models.Users, {
            as: 'Requestees',
            through: 'friendRequests',
            foreignKey: 'requesterId',
            onDelete: 'CASCADE'
        });

        Users.belongsToMany(models.Rooms,{
            as : 'rooms',
            through : models.UsersRooms
        })
    }


    return Users
}