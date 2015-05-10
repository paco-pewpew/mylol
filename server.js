'use strict';
//setup==================================================
var express = require('express');
var app = express();
var port = process.env.PORT||1337;
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var favicon = require('serve-favicon');

var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');



//DB=====================================================
var db = require('./config/database.js');
mongoose.connect(db.url);

//hide paths=============================================
app.use('/api/champions', expressJwt({ secret: 'HATE' }));
app.use('/api/account', expressJwt({ secret: 'HATE' }));
app.use('/api/riot/self', expressJwt({ secret: 'HATE' }));


app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(favicon(__dirname + '/public/favicon.ico'));

//routes for the api====================================
var apiRouter = express.Router();
require('./server/routes/authenticationRoutes.js')(apiRouter);
require('./server/routes/riotRoutes.js')(apiRouter);
require('./server/routes/templateRoutes.js')(apiRouter);
app.use('/api', apiRouter);

//error handling=========================================
var apiMiddleware = require('./server/apiMiddleware.js');
app.use(apiMiddleware.clientErrorHandler);

//serve index page=======================================
app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});
//start===================================================
app.listen(port);
console.log('the awesomeness is on port: ' + port);
