'use strict';
module.exports={
	clientErrorHandler:function (err, req, res, next) {
	  if (err.name === 'UnauthorizedError') {
	    res.status(401).send('invalid token...');
	  }
	}
};