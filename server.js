var createError = require('http-errors');

var cookieParser = require('cookie-parser');
global.__basedir = __dirname;
var cors = require("cors");
var express = require('express');
var passport = require("passport");
var engine = require('ejs-locals');
var session = require('express-session')
require('dotenv').config();
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
let config = require("./config");
app.use(cookieParser());

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({
  secret: 'sdwan', // session secret
  resave: true,
  saveUninitialized: true
}));

  io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('message', function(msg){
        console.log('message: ' + msg);
        io.emit('message',msg)
      });

      socket.on('typing', (data) => {
        
        io.emit("typing", data)
      });
      socket.on('friendreq',(data)=>{
        io.emit('friendreq',data)
      });

      socket.on('newfriend',(data)=>{
        io.emit('newfriend',data)
      });
      socket.on('stoptyping',(data)=>{
        io.emit("stoptyping", data)
      })
  });
  
  
const {
    sequelize
  } = require(__basedir + '/models')
//## CORS middleware

// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
};
app.use(passport.initialize());
app.use(passport.session());
app.use(allowCrossDomain);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'))
// set the view engine to ejs
app.engine('ejs', engine);
app.set('view engine', 'ejs');

require(__basedir + "/helpers/passport")(passport);
// loading all routes
require(__basedir + '/routes/web/')(app,passport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next();
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    console.error(err);
    res.json({error: err.status});
});

sequelize.sync({
    force: false
}).then(() => {
  http.listen(config.port)
      console.log(`Server started on port ${config.port}`)
});

