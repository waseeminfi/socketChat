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

}