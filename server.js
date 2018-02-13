'use strict';

var express    =  require('express');
var bodyParser =  require("body-parser");
var path 	    	= require('path');
var app        =  express();
var flash      =  require("connect-flash");
var routes 	 	=   require('./app/routes');
var passport   =  require('./app/auth');
var ioServer   =  require('./app/socket')(app);
var session 	= require('./app/session');

//Каталог или массив каталогов для представлений приложения. path.join объединяет пути
app.set('views', path.join(__dirname, './app/views'));

//чтобы не писать везде ejs
app.set('view engine', 'ejs');

var port = process.env.PORT || 3000;

//преобразование в строку
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Для предоставления статических файлов(css, изображенийб, js)
 app.use(express.static('public'));
 app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
//если получаем запрос к корню, то переходим в каталог routes
app.use('/', routes);


ioServer.listen(port);



