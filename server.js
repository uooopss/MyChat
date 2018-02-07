'use strict';

var express = require('express');
//var mongoClient = require('mongodb').MongoClient;
var bodyParser = require("body-parser");
var path 		= require('path');
//var db = require('./config/db');
var app = express();
// var passport = require('passport');
var routes 		= require('./app/routes');
 var passport    = require('./app/auth');
//var ioServer = require('./app/socket')(app);



//Каталог или массив каталогов для представлений приложения. path.join объединяет пути
app.set('views', path.join(__dirname, './app/views'));

//чтобы не писать везде ejs
app.set('view engine', 'ejs');

var port = process.env.PORT || 3000;

//преобразование в строку
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Для предоставления статических файлов(css, изображенийб, js)
 app.use(express.static('public'));
 
 app.use(require('express-session')({
  secret: 'session MyChat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//если получаем запрос к корню, то переходим в каталог routes
app.use('/', routes);


//слушаем порт 3000
//ioServer.listen(port);


/* mongoClient.connect(db.url, (err, db) => {
  if (err) return console.log(err)
  require('./app/routes')(app, db);                
})*/
 
/* app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html")
}); */ 

/* app.post('/', function(req,res){
  var user_name=req.body.user;
  var password=req.body.password;
  var result = (+user_name)+(+password);
  console.log("result = "+result);   
  res.send(''+result); 
  //res.json(result);
  // res.send('<p> result </p>');
}); */
 
app.listen(3000, function () {
});



