'user strict'

const {
    Users
} = require(__basedir + "/models");


module.exports = {
    getFriendsList(req,res){
        console.log('imhere');

        req.user.getFriends().then((_frnd)=>{
            res.json({status : 'success',data :_frnd});
        }).error((err)=>{
            console.log("error",_frnd);
        })
    },

    getAllUsers(req,res){

        Users.findAll(
            { where: {
                    uuid: {
                        [Op.ne]: req.user.get().uuid
                    }
                }
            }).then((_frnd)=>{
            res.json({status : 'success',data :_frnd});
        }).error((err)=>{
            console.log("error",_frnd);
        })
    }
}