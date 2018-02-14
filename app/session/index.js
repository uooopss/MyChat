'use strict';

var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var db = require('../database');

var init = function () {

    if(process.env.NODE_ENV === 'production') {
		return session({
			secret: 'session MyChat',
			resave: false,
			saveUninitialized: false,
			unset: 'destroy',
			store: new mongoStore({ mongooseConnection: db.mongoose.connection })
		});
	} else {
		return session({
			secret: 'session MyChat',
			resave: false,
			unset: 'destroy',
			saveUninitialized: true
		});
	}

}

module.exports = init();