/* const noteRoutes = require('./note_routes');
module.exports = function(app, db) {
  noteRoutes(app, db);
}; */
var express	 	= require('express');
var router 		= express.Router();
var passport 	= require('passport');

var User = require('../models/user');

router.get('/', function(req, res, next) {
  //если залогинин, то переходим в комнату
  if(req.isAuthenticated()){
    res.redirect('/rooms');
  }else {
    res.render('login'), {
/*       success: req.flash('success')[0],
			errors: req.flash('error') */
    }
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/rooms',
  failureRedirect: '/'
}));

router.post('/register', function(req, res, next) {
  var credentials = {'username': req.body.user, 'password': req.body.pass };

  if(credentials.username === '' || credentials.password === '') {
    // req.flash('error', 'missing credentials');
    //req.flash('showRegisterForm', true);
    res.send(req.body.user + 'REDIRECT1');
    res.redirect('/');
   
  }else {
    User.findOne({'username': new RegExp('^' + req.body.user + '$' + 'i')}, function(err,user) {
      if(err) throw err;
			if(user){
				// req.flash('error', 'Username already exists.');
        //req.flash('showRegisterForm', true);
        res.send(req.body.user + 'REDIRECT2');
        res.redirect('/');
        
			}else{
				User.create(credentials, function(err, newUser){
					if(err) throw err;
          // req.flash('success', 'Your account has been created. Please log in.');
          res.send(req.body.user + 'REDIRECT3');
					res.redirect('/');
				});
			}
    });
  }
});

module.exports = router;