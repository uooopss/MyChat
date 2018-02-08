'use strict';

var roomModel = require('../database').models.room;
var User = require('../models/user');

var create = function(data, callback) {
    var newRoom = new roomModel(data);
    newRoom.save(callback);
};

var findOne = function(data, callback) {
    roomModel.findOne(data, callback);
};

module.exports = {
    create, 
    findOne
};