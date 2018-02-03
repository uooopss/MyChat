/* const noteRoutes = require('./note_routes');
module.exports = function(app, db) {
  noteRoutes(app, db);
}; */
var express	 	= require('express');
var router 		= express.Router();

router.get('/', function(req, res, next) {
  res.render('login');
});
module.exports = router;