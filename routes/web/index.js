'use strict'
const {
    AuthControllers,
    ChatControllers,
    FriendsController,
    UsersControllers
} = require(__basedir + '/controllers');

module.exports = (app,passport) => {

    const isAuthenticated = require(__basedir + '/policies/isAuthenticated')(passport);
    app.get('/',function(req, res, next){
        res.redirect('/login');
    })
     


    app.post('/login', AuthControllers.doLogin);
    app.get('/signup',function(req,res){
        res.render('pages/register');
    })
    
    app.get('/friendlist/:id',isAuthenticated,UsersControllers.getFriendsList)
    app.get('/alluser/:id',isAuthenticated,UsersControllers.getAllUsers);
    app.post('/signup',isAuthenticated,AuthControllers.doSignUp)
    app.post('/sendFriendRequest',isAuthenticated,FriendsController.sentFriendRequest);
    app.get ('/getFriendRequest',isAuthenticated,FriendsController.getAllFriendRequest);
    app.post('/addFriendsRequest',isAuthenticated,FriendsController.addFriendsRequest)
    app.get('/chatWindow',isAuthenticated,ChatControllers.renderChatWindow);
    app.get('/user/:search',isAuthenticated,UsersControllers.searchUsers)
    app.get('/checkUserName/:uname',isAuthenticated,AuthControllers.checkUserName);
}


function isLoggedIn(req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()){
        next();
    } else{
        res.redirect('/login')
    }
}