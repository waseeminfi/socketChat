const {
    Users,
    Permissions,
    Roles
} = require(__basedir + '/models')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
var LocalStrategy = require('passport-local').Strategy;

const config = require(__basedir + '/config')
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.uuid);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        Users.findOne({
            where: {
                uuid: id
            }
        }).then(function (user) {
            done(null, user);
        }).error(function (err) {
            done(err, false);
        });
    });



    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: 's3cr3t'
        },
        function (jwtPayload, cb) {
            return Users.findOne({where:{uuid:jwtPayload.uuid}
                })
                .then(user => {
                    //console.log("permission",user.role.permission)
                    return cb(null, user);
                })
                .catch(err => {
                    return cb(err);
                });
        }
    ));
};