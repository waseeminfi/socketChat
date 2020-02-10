'user strict'

const {
    Users,
    Friendships
  
} = require(__basedir + "/models");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    renderChatWindow(req,res){
        console.log(req.user.get());
        res.render('pages/inbox',{user : req.user.get()})
    },
    getFriendsList(req,res){
        console.log('imhere');
        
       req.user.getFriends().then((_frnd)=>{
              for(var i in _frnd){
                  
              }       
        
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