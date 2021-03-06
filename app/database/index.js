'use strict';

var mongoose = require('mongoose');

var dbURI = "mongodb://localhost:27017/mychatio";
mongoose.connect(dbURI);

mongoose.connection.on('error', function(err) {
    if(err) throw err;
});

mongoose.Promise = global.Promise;

module.exports = {mongoose, models: {
    user: require('./schemas/user.js'),
    room: require('./schemas/room.js')
}};