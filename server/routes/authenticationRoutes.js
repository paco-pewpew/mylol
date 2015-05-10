'use strict';
var User = require('../models/User.js');
var jwt = require('jsonwebtoken');

module.exports = function(router) {
	router.post('/signup', function(req, res) {
		//check for existing account with same name or email and if not validate input before create
		var q = User.find({ $or:[{ 'local.name': req.body.name }, { 'local.email': req.body.email }] }).limit(1);
	  q.exec(function(err, user) {
  		user=user[0];
  		var errorStack={};
			if (err)
				 res.status(404).json({ success: false, errors: { internal: true } });
			if (user) {
				if (user.local.name === req.body.name)
					errorStack.name='Username is taken';
				
				if (user.local.email === req.body.email)
					errorStack.email='An account is already associated with this email';
        
        res.status(404).json({ success: false, errors: errorStack });
      } else {
      	//validation
      	if (!/^(?=.{4,16})[a-zA-Z0-9_-]+$/.test(req.body.name) || !req.body.name)
      		errorStack.name = 'Username must be 4 to 16 characters containing  letters, numbers and dashes.';
      	
      	if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(req.body.email) || !req.body.email)
      		errorStack.email = 'Need a simple email';
      	
      	if (!/^(?=.{4,16}$)(?=.*[0-9]+)(?=.*[a-zA-Z]+)[a-zA-Z0-9_-]+$/.test(req.body.password) || !req.body.password)
      		errorStack.password = 'Password can contain only letters,numbers,\"_\" and \"-\" with min length 6 and max length 18 and must have at least one number';
      	
      	if (!req.body.lolacc || !req.body.lolid || !req.body.region)
      		errorStack.bind = 'Invalid bind info';
      	
      	if (Object.keys(errorStack).length > 0) {
      		res.status(404).json({ success: false, errors: errorStack });
      	} else {
      		//validation passed -> create user
      		var newUser = new User();
					newUser.local.name = req.body.name;
					newUser.local.email = req.body.email;
					newUser.local.password = newUser.generateHash(req.body.password);
					newUser.riot.lolid = req.body.lolid;
					newUser.riot.lolacc = req.body.lolacc;
					newUser.riot.region = req.body.region;
					newUser.save(function(err) {
						if (err)
							res.status(404).json({ success: false, message: 'failed creating account' });
						res.status(200).json({ success: true, message: 'singup succeeded' });
					});
       	}
      }
		});
	});

	router.post('/login', function(req, res) {
		User.findOne({ 'local.name': req.body.name }, function(err, user) {
			if (err)
				res.status(404).json({ success: false, errors: { internal: true } });
			if (!user) {
				res.status(404).json({ success: false, errors: { name: 'No user found.' } });
			} else if (!user.validPassword(req.body.password)) {
        res.status(404).json({ success: false, errors: { password: 'Oops! Wrong password.' } });
			} else {
				var token = jwt.sign(user, 'HATE', { expiresInMinutes: 60*5 });
				res.status(200).json({ success: true, user: user, token: token });
			}
    });
	});

	router.route('/account')
		.get(function(req, res) {
			res.send(req.user);
		})
		.put(function(req, res) {
			User.findByIdAndUpdate(req.params.user_id, {
				$set: {
					'riot.lolid': req.body.lolid,
					'riot.lolacc': req.body.lolacc,
					'riot.region': req.body.region
				}
			}, function(err, result) {
				if (err)
					res.send(err);
				res.json(result);
			});
		});

	};