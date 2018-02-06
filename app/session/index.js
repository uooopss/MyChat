import { triggerAsyncId } from 'async_hooks';

'use strict';

//про про сессии   https://nodeguide.ru/doc/dailyjs-nodepad/node-tutorial-5/ 

var seesion = require('express-session');
var mongoStore = require('connect-mongodb')(session);
var db = require('../database');

var init = function () {

    if(process.env.NODE_ENV === 'production') {
		return session({
			secret: 'session MyChat',
			resave: true,
			saveUninitialized: true,
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