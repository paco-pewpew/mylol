'use strict';
var User=require('../models/User.js');
var jwt=require('jsonwebtoken');

module.exports=function(router){
	router.post('/signup', function(req, res, next) {
		var q=User.find({$or:[{'local.name':req.body.name},{'local.email':req.body.email}]}).limit(1);

		  q.exec(function(err,user){
		  		user=user[0];
		  		var errorStack={};
				if(err)
					return next(err);
				if (user) {
					if(user.local.name===req.body.name) errorStack.name='Username is taken';
					if(user.local.email===req.body.email) errorStack.email='An account is already associated with this email';
                	return res.json({ success : false, errors:errorStack});
                }else{
                	var newUser=new User();
					newUser.local.name=req.body.name;
					newUser.local.email=req.body.email;
					newUser.local.password=newUser.generateHash(req.body.password);
					newUser.riot.lolid=req.body.lolid;
					newUser.riot.lolacc=req.body.lolacc;
					newUser.riot.region=req.body.region;
					newUser.save(function(err){
						if(err)
							throw err;
						 return res.json({ success : true, message : 'singup succeeded' });
					});
                }
			});
		});

	router.post('/login',function(req,res,next){
		User.findOne({ 'local.name' :  req.body.name }, function(err, user) {
			if(err)
				return next(err);
			if(!user)
				return res.json({success:false,errors:{name:'No user found.'}});
			if (!user.validPassword(req.body.password))
                return res.json({success:false,errors:{password:'Oops! Wrong password.'}});
            console.log('token given with data:'+user);
			var token = jwt.sign(user, 'HATE', { expiresInMinutes: 60*5 });
			
			return res.json({success:true,user:user,token:token});
        });
	});

};