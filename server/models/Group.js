'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var groupSchema = new Schema({
	name: String,
	members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

groupSchema.plugin(findOrCreate);

module.exports = mongoose.model('Group', groupSchema);