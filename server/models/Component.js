'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var componentSchema = new Schema({
	componentType: String,
	data: {},
  searchText: String,
	order: Number,
	sectionid: Schema.Types.ObjectId,
  categoryid: Schema.Types.ObjectId
});

componentSchema.plugin(findOrCreate);

module.exports = mongoose.model('Component', componentSchema);
