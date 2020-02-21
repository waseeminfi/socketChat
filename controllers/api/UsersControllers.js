'user strict'

const {
    Users,
    Rooms
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

    getChatListRoome(req,res){
        Users.findOne({where : {uuid: req.user.get().uuid},
        include : [{
            as : 'rooms',
            model : Rooms,
            include : [ {
                as : 'users',
                model : Users,
                where: {
                    uuid: {
                        [Op.ne]: req.user.get().uuid
                    }
             }
            }]
        }
           ]}).then((_list)=>{
                res.json({data : _list})
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
        Users.findAll({
                 where : {name : { [Op.like]: '%' + _query + '%'}},
                 limit : 10}).then((_result)=>{
                res.json(_result)
        }).error((err)=>{
            res.json([])
        })
    }
}