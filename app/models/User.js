'use strict';
var mongoose=require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema=mongoose.Schema({
	local:{
		name:{
			type:String,
			required:true,
			unique:true
		},
		email:{
			type:String,
			required:true,
			unique:true
		},
		password:{
			type:String,
			required:true
		}
	},
	riot:{
		lolid:String,
		lolacc:String,
		region:String
	}
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
var User=mongoose.model('User',userSchema);
module.exports = User;