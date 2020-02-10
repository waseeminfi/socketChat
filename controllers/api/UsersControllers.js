'user strict'

const {
    Users
} = require(__basedir + "/models");


module.exports = {
    getAllUsers(req,res){
        console.log(req.user.get());
        Users.findAll({}).then((_users)=>{
            
        }).error((err)=>{

        })
    }
}