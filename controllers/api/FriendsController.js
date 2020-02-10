'user strict'

const {
    Users,
    Friendships
} = require(__basedir + "/models");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    sentFriendRequest(req,res){
        if (req.body.requesteeId != req.user.id) {
            console.log('Send friend request');
            req.user.addRequestees(req.body.requesteeId)
              .then(result => res.json({status : 'success'}))
              .error((err)=>{res.json({status : 'error'})})
          } else {
            res.json({status : 'error'});
          }
    },
    getAllFriendRequest(req,res){
     
        req.user.getRequesters().then((result)=>{
           res.json({status : 'success', data : result});
       }).error((err)=>{
        res.json({status : 'Error', data : []});
       })
    },
    addFriendsRequest(req,res){
        Users.findOne({where : {uuid : req.body.Id}}).then((_user)=>{
            _user.addFriends(req.user.get()['uuid']).then((result)=>{});
        })
        req.user.addFriends(req.body.Id).then((result)=>{
               req.user.removeRequesters(req.body.Id).then((result)=>{
                     res.json({status : 'success', data : result});
                    }).error((err)=>{console.log('Requestees',err)
               res.json({status : 'error', data : {}});})
        }).error((err)=>{

        })
    }
}