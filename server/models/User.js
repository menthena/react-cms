'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var userSchema = new Schema({
	googleId: String,
	displayName: String,
	email: String,
	photo: String
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
