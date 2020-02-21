'user strict'

const {
    Users,
    Rooms,
    Messages,
    UsersRooms

} = require(__basedir + "/models");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    roomHandling(req,res){
     let mybody = {name:"Funy",
         users: [{"userid" : "g2pcd6jgk2u1yjzj"},{"userid" : "g2pcd8jgk2u25slt"}]
     }
        Rooms.create({
             name : mybody.name,
        }).then((_room)=>{
            console.log("hey",mybody.users);
            for(let item of mybody.users){
               _room.addUsers(item.userid);
            }

        })
    },

}