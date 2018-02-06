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
  console.log('home',req.isAuthenticated())
  if(req.isAuthenticated()){
    res.redirect('/rooms');
  }else {
    res.redirect('/login'), {
/*       success: req.flash('success')[0],
			errors: req.flash('error') */
    }
  }
});

/*
 * Authentication
 */
router.post('/login'/* , passport.authenticate('local', {
  successRedirect: '/rooms',
  failureRedirect: '/'
}) */, function
(req, res){
  // res.send('login_result')
  res.redirect('/rooms');
});

router.get('/login'/* , passport.authenticate('local', {
  successRedirect: '/rooms',
  failureRedirect: '/'
}) */, function
(req, res){
  console.log('login',req.isAuthenticated())
  if(req.isAuthenticated()){
    res.redirect('/rooms');
  }else {
    res.render('login'), {
/*       success: req.flash('success')[0],
			errors: req.flash('error') */
    }
  }
});

/*
 * Registration
 */
router.post('/register', function(req, res, next) {
  var credentials = {'username': req.body.username, 'password': req.body.password };

  if(credentials.username === '' || credentials.password === '') {
    // req.flash('error', 'missing credentials');
    //req.flash('showRegisterForm', true);
    console.log(req.body.user + ' REDIRECT1');
    res.redirect('/');
   
  }else {
    // Check if the username already exists for non-social account
    User.findOne({'username': new RegExp('^' + req.body.username + '$' + 'i')}, function(er,user) {
      console.log('REDIRECT2');
      if(er) throw er;
			if(user){
				// req.flash('error', 'Username already exists.');
        //req.flash('showRegisterForm', true);
        res.send(req.body.username + 'REDIRECT2');
        res.redirect('/');
        
			}else{
				User.create(credentials, function(err, newUser){
          console.log('REDIRECT3');
					if(err) throw err;
          // req.flash('success', 'Your account has been created. Please log in.');
          res.send(req.body.username + 'REDIRECT3');
					res.redirect('/');
				});
			}
    });
  }
});

router.get('/register'/* , passport.authenticate('local', {
  successRedirect: '/rooms',
  failureRedirect: '/'
}) */, function
(req, res){
  console.log('register',req.isAuthenticated())
  if(req.isAuthenticated()){
    res.redirect('/rooms');
  }else {
    res.render('register'), {
/*       success: req.flash('success')[0],
			errors: req.flash('error') */
    }
  }
});

/*
 * Rooms
 */
router.get('/rooms'/* , passport.authenticate('local', {
  successRedirect: '/rooms',
  failureRedirect: '/'
}) */, function
(req, res){
  console.log("rooms");
  res.render('rooms');
});



module.exports = router;