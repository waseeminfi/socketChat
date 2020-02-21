var mongoose = require('mongoose');
var mongoDB = process.env.MONGO_DB_CONN;
var db = mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => {
    console.log("Connected to Mongo DB");
}).catch(err => {
    console.log("Error in connection");
})
module.exports = db;