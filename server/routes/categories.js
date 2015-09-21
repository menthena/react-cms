'use strict';

var _ = require('lodash');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
var Category = require('../models/Category');

var allowedSectionProps = ['title', 'order', 'template', 'components'];

router.get('/', function (req, res, next) {
	var sendResponse = function (err, categories) {
		res.send({ data: categories });
	};

	if (req.query.includes === 'sections') {
		Category.find({}, sendResponse);
	}
	else {
		Category.find({}).select('_id title order').exec(sendResponse);
	}
});

router.get('/:id', function (req, res, next) {
	var sendResponse = function (err, categories) {
		if (err) {
			res.status(404);
			res.send({ message: 'Not found'});
		}

		res.send({ data: categories });
	};

	if (req.query.includes === 'sections') {
		Category.findById(req.params.id, sendResponse);
	}
	else {
		Category.findById(req.params.id).select('_id title order').exec(sendResponse);
	}
});

router.patch('/:id', function (req, res, next) {
	var updatedModel = _(req.body).pick('title', 'order');

	Category.findOneAndUpdate({ _id: req.params.id }, updatedModel, function(err, cat) {
		if (err) {
			res.status(422);
			res.send({ message: 'Bad request'});
		}
		else {
			res.send({ data: cat });
		}
	});
});

router.patch('/:id/sections/:section_id', function (req, res, next) {
	var updatedModel = _(req.body).pick(allowedSectionProps);

	var keys = Object.keys(updatedModel),
      keysLen = keys.length,
      prefix = 'sections.$.';

  for (var i = 0; i<keysLen ; i++) {
    updatedModel[prefix+keys[i]] = updatedModel[keys[i]];
    delete updatedModel[keys[i]];
  }

	var categoryId = req.params.id;
	var sectionId = req.params.section_id;

	Category.findOneAndUpdate({ _id: categoryId, 'sections._id': sectionId }, updatedModel, function(err, cat) {
		if (err) {
			res.status(422);
			res.send({ message: 'Bad request'});
		}
		else {
			res.send({ data: cat });
		}
	});
});

router.post('/', function (req, res, next) {
	var newCategory = _(req.body).pick('title', 'order');

	Category.create(newCategory, function(err, cat) {
		if (err) {
			res.status(422);
			res.send({ message: 'Bad request'});
		}
		else {
			res.status(201).send({ data: cat });
		}
	});
});

router.post('/:id/sections', function (req, res, next) {
	var newSection = _(req.body).pick(allowedSectionProps);
	var categoryId = req.params.id;

	Category.findOneAndUpdate({ _id: categoryId }, { $push: { sections: newSection }}, function(err, cat) {
		if (err) {
			res.status(422);
			res.send({ message: 'Bad request'});
		}
		else {
			res.status(201).send({ data: cat });
		}
	});
});

router.delete('/:id', function (req, res, next) {

	Category.remove({ _id: req.params.id }, function(err) {
		if (err) {
			res.status(422);
			res.send({ message: 'Bad request'});
		}
		else {
			res.status(204);
			res.send({});
		}
	});
});

router.delete('/:id/sections/:section_id', function (req, res, next) {

	var categoryId = req.params.id;
	var sectionId = req.params.section_id;

	Category.findOneAndUpdate({ _id: categoryId }, { $pull: { sections: { _id: sectionId }}}, function(err, category) {
		if (err) {
			res.status(422);
			res.send({ message: 'Bad request'});
		}
		else {
			res.status(204);
			res.send({});
		}
	});
});


module.exports = router;
