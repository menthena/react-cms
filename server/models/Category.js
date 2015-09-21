'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var componentSchema = new Schema({
	componentType: String,
	data: {},
	order: Number
});

// title: 'Section'
// components: [
// 	{
// 		componentType: 'textComponent',
// 		data: 'xxx',
// 		order: 0
// 	},
// 	{
// 		componentType: 'listComponent',
// 		data: {
// 			links: []
// 		},
// 		order: 1
// 	},
// 	{
// 		componentType: 'imageComponent',
// 		order: 2
// 	}
// ]

var sectionSchema = new Schema({
	title: String,
	order: Number,
	template: String,
	components: [componentSchema]
});

var categorySchema = new Schema({
	title: String,
	order: Number,
	sections: [sectionSchema]
});

categorySchema.plugin(findOrCreate);

module.exports = mongoose.model('Category', categorySchema);

