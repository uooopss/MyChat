'use strict';

var mongoose = require('mongoose');

var roomSchema = new mongoose.Schema({
    title:{type: String, required:true},
    connections: { type: [{userId:String, socketId: String}]},
    messages: {type: [{roomId: String, username: String, messageText: String, date: {type: Date}}]}
});

var roomModel = mongoose.model('room', roomSchema);

module.exports = roomModel;