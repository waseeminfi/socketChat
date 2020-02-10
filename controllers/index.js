const fs = require('fs')
const path = require('path')
const ctrl = {}
// loading controllers
fs
    .readdirSync(__dirname + "/api")
    .filter((file) =>
        file !== 'index.js'
    )
    .forEach((file) => {
        var moduleName = file.split('.')[0];
        ctrl[moduleName] = require(__dirname + "/api/" + moduleName);
    })
module.exports = ctrl