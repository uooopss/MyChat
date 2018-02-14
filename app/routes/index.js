var express	 	= require('express');
var router 		= express.Router();
var passport 	= require('passport');
var flash = require("connect-flash");

var User = require('../models/user');
var Room = require('../models/room');

//после вызова localhost получаем get запрос. проверяем залогинин юзер или нет.если да , то в rooms
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

 //при вводе username и password и нажатии на кнопку получаем post запрос по пути /login и сверяем паспортные данные
router.post('/login', passport.authenticate('local', {
  successRedirect: '/rooms',
  failureRedirect: '/'
}), function
(req, res){
  res.redirect('/rooms');
});

// для localhost:3000/login
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

 // после ввода username и password в форму и нажатии на кнопку
router.post('/register', function(req, res, next) {
  var credentials = {'username': req.body.username, 'password': req.body.password };

  if(credentials.username === '' || credentials.password === '') {
    res.redirect('/register');
   
  }else {
    // проверяем на существование эзера с таким же именем
    User.findOne({'username': credentials.username} , function(er,user) {
      
      if(er) throw er;
      // если есть, редиректим на регистрацию и пытаемся подобрать уникальное имя
			if(user){
        res.redirect('/register');
        
			}else{
        // иначе передаем данные и и регестрируемся
				User.create(credentials, function(err, newUser){
					if(err) throw err;
					res.redirect('/');
				});
			}
    });
  }
});

// для localhost:3000/register
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
  // находим все комнаты, проверяем залогинин или нет, рендеримся на rooms и передаем наши найденные комнаты в rooms.ejs
  Room.find(function(err, rooms) {
    if(err) return err;
    if(!(req.isAuthenticated())){
      res.redirect('/login');
    }else {
      res.render('rooms', {rooms});
    }
  })
});

/**
 * Chatroom
 */

 // в rooms.ejs перебираем все комнаты и накаждую комнату делаем ссылку на chat с передаваемым id комнаты
router.get('/chat/:id', [User.isAuthenticated, function(req, res, next) {

  // забираем переданный id
  var roomId = req.params.id;
 
  // проверяем если комната с таким id. если да, то рендеримся на chatroom и передаем объект юзера и комнаты в chatroom.ejs
	Room.findById(roomId, function(err, room){
		if(err) throw err;
		if(!room){
			return next(); 
    }
		res.render('chatroom', { user: req.user, room: room});
  });	
}]);


/*
 * Logout
 */

 // при нажатии на кнопку logout  в rooms или chatroom получаем get запрос 
router.get('/logout', function(req, res, next) {
	// удаляем нашего юзера
  req.logout();
  // закрываем сессию
  req.session = null;
  // переходим на /login
	res.redirect('/login');
});

module.exports = router;