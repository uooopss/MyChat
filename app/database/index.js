'use strict';

//var config = require('../config');

var mongoose = require('mongoose');
var dbURI = "mongodb://localhost:27017/mychat";
mongoose.connect(dbURI);

mongoose.connection.on('error', function(err) {
    if(err) throw err;
});

//просто нужно
mongoose.Promise = global.Promise;

module.exports = {mongoose, models: {user: require('./schemas/user.js')}};