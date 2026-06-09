var controllers = {};
var mongoose = require('mongoose');
var fs = require('fs');
var config = require('../config.js');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error:', err.message);
});

mongoose.connect(config.db.uri, config.db.options).then(function () {
  console.log('MongoDB connected:', config.db.uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
}).catch(function (err) {
  console.error('MongoDB connection failed:', err.message);
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});

require('../models')(mongoose);

var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js|coffee)/.test(file)) {
                if (file != 'index.js') {
                    var indent = file.split('.');
                    controllers[indent[0]] = require(newPath);
                }
            }
        } else if (stat.isDirectory()) {
            // walk(newPath);
        }
    });
};
var models_path = __dirname;
walk(models_path);

module.exports = controllers;
