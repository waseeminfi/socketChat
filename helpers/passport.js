const {
    Users,
} = require(__basedir + '/models')

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
            },
            attributes: ["name", "uuid"]
        }).then(function (user) {
            done(null, user);
        }).error(function (err) {
            done(err, false);
        });
    });



    passport.use('local', new LocalStrategy(
        {
            passReqToCallback: true
        },
        function (req, username, password, done) {
            return Users.findOne({
                where: { username: req.body.username }
            })
                .then(user => {
                    if (!user) {
                        return done(null, false);

                    }
                    let isMatched = user.comparePassword(req.body.password);
                    console.log("passport",isMatched);
                    if (isMatched) {
                        //console.log("permission",user.role.permission)
                        return done(null, user);
                    } else {
                        return done(null, false
                            );
                    }
                })

                .catch(err => {
                    console.log("passport err",err);
                    return done(err);
                });
        }
    ));
};