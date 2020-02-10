module.exports = (sequelize, DataTypes) => {
    const Friendships = sequelize.define('Friendships', {
        
        accepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }

    },
        
    )
    return Friendships
}