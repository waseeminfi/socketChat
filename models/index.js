const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require(__basedir + '/config');
const db = {}
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

fs
  .readdirSync(__dirname + "/sequelize")
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname + "/sequelize", file))
    db[model.name] = model;
  })

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

const mongoose = require(__basedir + '/helpers/mongoconnect');
// loading mongo models
fs
    .readdirSync(__dirname + "/mongo")
    .filter((file) =>
        file !== 'index.js'
    )
    .forEach((file) => {
      var moduleName = file.split('.')[0];
      db[moduleName] = require(__dirname + "/mongo/" + moduleName);
    })

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.mongooose = mongoose;

module.exports = db