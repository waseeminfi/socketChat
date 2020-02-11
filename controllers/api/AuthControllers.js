'user strict'

const {
    Users,
    Friends
} = require(__basedir + "/models");
const jwt = require("jsonwebtoken");
const config = require(__basedir + "/config");
module.exports = {
    
    doLogin(req, res) {
        let _username = req.body.username || null;
        let _pass = req.body.password || null;
       
        Users.findOne({ where: { username: _username }}).then((_user) => {
            if(!_user){
//                res.json({ result: "error", message: "User not exists" });
             console.log("user not exist")
                res.redirect('/login');
                return;
            }
            let isMatched = _user.comparePassword(_pass);
            console.log(isMatched);
            if (isMatched) {
                res.redirect('/chatWindow');
            } else {
                res.redirect('/login');
                return;
                res.json({
                    result: "Failed",
                    message: "Password Incorrect!"
                });
            }
        }).error((err) => {
            res.status(500).json({ result: "Failed", message: "Somthing went wrong" });
        })

    },
   
    checkUserName(req,res){
        let _uname = req.params.uname;
        Users.findOne({where : {username : _uname}}).then((user)=>{
               if(user){
                   res.json({status : true})
               }else{
                res.json({status : false})
               }
        }).error((err)=>{
              
        });
    },

    doSignUp(req,res){
        console.log("signup",req.body);
        let _username = req.body.username || null;
        let _pass = req.body.password || null;
        let body = {};
        body.username = _username;
        body.password = _pass;
        body.name = _username;
        if(_username === null || _pass === null){
            return res.json({result : "Failed",message : "user name or Password is null"})
        }
        Users.create(body).then((result)=>{
             res.json({result : "success",message : "User Created"})
        });
        // let fbody = {}
        // fbody.uuid = 'g2pcd6xsk2kahzc1';
        // fbody.fid = 'g2pcd6xsk2kaip8j';
        // Friends.create(fbody).then((result)=>{

        // })
    }   
};

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}