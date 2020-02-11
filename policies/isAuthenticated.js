
module.exports = (passport) => {
  return function (req, res, next) {
    passport.authenticate('jwt', {
      session: false
    }, function (err, user) {
      if (err || !user) {
        console.log("error", err);

        res.status(401).json({
          result: "error",
          message: "you do not have access to this resource"
        })
      } else {
          req.user = user;
          next()

      }
    })(req, res, next)
  }
}