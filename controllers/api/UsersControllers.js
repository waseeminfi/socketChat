'user strict'

const {
    Users
} = require(__basedir + "/models");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    getFriendsList(req,res){
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
    },
    searchUsers(req,res){
        let _query = req.params.search;
        Users.findAll({where :
                {name : { [Op.like]: '%' + _query + '%'}
            }}).then((_result)=>{
                res.json(_result)
        }).error((err)=>{
            res.json([])
        })
    }
}