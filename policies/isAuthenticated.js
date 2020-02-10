//const AccessControl = require('role-acl');
//const obj = require(__basedir+"/utils")

module.exports = (passport) => {
  return function (req, res, next) {
    passport.authenticate('local', {
      session: false
    }, function (err, user) {
      if (err || !user) {
        console.log("error", err);

        res.status(401).json({
          result: "error",
          message: "you do not have access to this resource"
        })
      } else {
      //   const ac = new AccessControl();
      //   let action;
      //   if (req.method == 'PUT') {
      //     action = 'update'
      //   } else if (req.method == 'POST') {
      //     action = 'create'
      //   } else if (req.method == 'DELETE') {
      //     action = 'delete'
      //   } else {
      //     action = 'read'
      //   }
      
      //  const per_obj =  obj.PermissionObj(req,user)
      //   ac.grant(obj.PermissionObj(req,user));
      //   u_permission = ac.can(user.role.get().name).execute(action).on(per_obj.resource)
      //   if (u_permission.granted) {
      //     req.user = user;
      //     next()
      //   } else {
      //     res.status(403).json({
      //       result: "error",
      //       message: "you do not have access to this resource"
      //     })
      //   }

      req.user = user;
      next()

      }
    })(req, res, next)
  }
}