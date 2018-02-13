var express	 	= require('express');
var router 		= express.Router();
var passport 	= require('passport');
var flash = require("connect-flash");

var User = require('../models/user');
var Room = require('../models/room');

router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    res.redirect('/rooms');
  }else {
    res.redirect('/login')
  }
}); 

/*
 * Authentication
 */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/rooms',
  failureRedirect: '/'
}), function
(req, res){
  res.redirect('/rooms');
});

router.get('/login', function (req, res){
  if(req.isAuthenticated()){
    res.redirect('/rooms');
  }else {
    res.render('login')
  }
});

/*
 * Registration
 */
router.post('/register', function(req, res, next) {
  var credentials = {'username': req.body.username, 'password': req.body.password };

  if(credentials.username === '' || credentials.password === '') {
    res.redirect('/register');
   
  }else {
    // Check if the username already exists for non-social account
    User.findOne({'username': credentials.username} , function(er,user) {
      
      if(er) throw er;
			if(user){
        res.redirect('/register');
        
			}else{
				User.create(credentials, function(err, newUser){
					if(err) throw err;
					res.redirect('/');
				});
			}
    });
  }
});

router.get('/register', function (req, res){
  if(req.isAuthenticated()){
    res.redirect('/rooms');
  }else {
    res.render('register')
  }
});

/*
 * Rooms
 */
router.get('/rooms', function (req, res){
  Room.find(function(err, rooms) {
if(err) return err;

  console.log("rooms");
  if(!(req.isAuthenticated())){
    res.redirect('/login');
  }else {
    res.render('rooms', {rooms});
  }
})
});

// Chat Room 
router.get('/chat/:id', [User.isAuthenticated, function(req, res, next) {
  var roomId = req.params.id;
  
  console.log("chat room");
  Room.find(function(err, rooms) {
    if(err) return err;
	Room.findById(roomId, function(err, room){
		if(err) throw err;
		if(!room){
			return next(); 
    }
		res.render('chatroom', { user: req.user, room: room, rooms });
  });
})
	
}]);


/*
 * Logout
 */

router.get('/logout', function(req, res, next) {
	// remove the req.user property
	req.logout();
  console.log("logout button");
	res.redirect('/login');
});

module.exports = router;