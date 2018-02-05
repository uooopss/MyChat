'use strict';

var userModel = require('../database').models.user;

var create = function(data, callback) {
    var newUser = new userModel(data);
    newUSer.save(callback);
}

var findOne = function(data, callback) {
    userModel.findOne(data, callback);
}

var findById = function(id, callback) {
    userModel.findById(data, callback);
}

var isAuthenticated = function (req, res, next) {
	if(req.isAuthenticated()){
		next();
	}else{
		res.redirect('/');
	}
}

module.exports = {
    create,
    findOne,
    findById,
    isAuthenticated
};