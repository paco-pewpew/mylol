'use strict';
//setup==================================================
var express=require('express');
var app=express();
var port=process.env.PORT||1337;
var mongoose=require('mongoose');
var morgan=require('morgan');
var bodyParser=require('body-parser');
var methodOverride=require('method-override');
var favicon=require('serve-favicon');

var expressJwt=require('express-jwt');
var jwt=require('jsonwebtoken');



//shits===================================================
var db=require('./config/database.js');
mongoose.connect(db.url);

app.use(express.static(__dirname+'/public'));
app.use(morgan('dev'));

app.use('/api/champions', expressJwt({secret: 'HATE'}));
app.use('/api/riot/self', expressJwt({secret: 'HATE'}));


app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(favicon(__dirname+'/public/favicon.ico'));
//routes
var apiRouter=express.Router();
require('./app/routes/authenticationRoutes.js')(apiRouter);
require('./app/routes/riotRoutes.js')(apiRouter);
require('./app/routes/templateRoutes.js')(apiRouter);
require('./app/apiRoutes.js')(apiRouter);
app.use('/api',apiRouter);
//ERROR HANDLING
var apiMiddleware=require('./app/apiMiddleware.js');
app.use(apiMiddleware.clientErrorHandler);

app.get('*',function(req,res){
	res.sendfile('./public/index.html');
});
//start===================================================
app.listen(port);
console.log('the awesomeness is on port: '+port);
