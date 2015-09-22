'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var sectionSchema = new Schema({
	title: String,
	order: Number,
	template: String
});

var categorySchema = new Schema({
	title: String,
	order: Number,
	sections: [sectionSchema]
});

categorySchema.plugin(findOrCreate);

module.exports = mongoose.model('Category', categorySchema);

