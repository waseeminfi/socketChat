'use strict'
const {
    AuthControllers,
    ChatControllers,
    FriendsController
} = require(__basedir + '/controllers');

module.exports = (app,passport) => {
   
    app.get('/',function(req, res, next){
        res.redirect('/login');
    })
     
    app.get('/login',function(req, res, next){
        res.render('pages/login');
    })

    app.post('/login', AuthControllers.doLogin);
    app.get('/signup',function(req,res){
        res.render('pages/register');
    })
    
    app.get('/friendlist/:id',ChatControllers.getFriendsList)
    app.get('/alluser/:id',ChatControllers.getAllUsers);
    app.post('/signup',AuthControllers.doSignUp)
    app.post('/sendFriendRequest',FriendsController.sentFriendRequest);
    app.get ('/getFriendRequest',FriendsController.getAllFriendRequest);
    app.post('/addFriendsRequest',FriendsController.addFriendsRequest)
    app.get('/chatWindow',ChatControllers.renderChatWindow);

    app.get('/checkUserName/:uname',AuthControllers.checkUserName);
}


function isLoggedIn(req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()){
        next();
    } else{
        res.redirect('/login')
    }
}