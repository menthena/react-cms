'use strict';

var _ = require('underscore');
var should = require('should');
var request = require('supertest');  
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var async = require('async');
var ObjectId = require('mongoose').Types.ObjectId;
var passportStub = require('passport-stub');

mockgoose(mongoose); 

var app = require('../app');
var Category = mongoose.model('Category');

passportStub.install(app);


describe('Routing', function() {

  var categories;
 
  beforeEach(function(done) {
    mockgoose.reset();
    passportStub.logout();

  	async.timesSeries(5, function(n, next) {
  		Category.create({
          'title': 'test' + n, 
          'order': n, 
          '_id': new ObjectId(),
          'sections': _(3).times(function(s) { 
            return { 
              '_id': new ObjectId(), 
              'title': 'sect' + s + '_' + n, 
              'order': s
            } 
          })
        }, 
  			function(err, c) { next(err, c); });
  	}, function(err, createdCategories) { categories = createdCategories; done(); }); 
  });

  describe('Categories', function() {
    it('should return a list of categories', function(done) {
      passportStub.login({username: 'john.doe'});

  	  request(app)
			.get('/categories')
      .expect(200)
			.end(function(err, res) {
        should.not.exist(err);
        res.body.data.length.should.eql(categories.length);
        res.body.data[0].should.have.properties('_id', 'title', 'order');
        res.body.data[0].should.not.have.property('sections');
        done();
	    });
    });

    it('should return a list of categories with sections', function(done) {  
      passportStub.login({username: 'john.doe'});

      request(app)
      .get('/categories?includes=sections')
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.data.length.should.eql(categories.length);
        res.body.data[0].should.have.properties('_id', 'title', 'order', 'sections');
        res.body.data[0].sections.length.should.eql(3)
        res.body.data[0].sections[0].should.have.properties('_id', 'title', 'order');
        done();
      });
    });

    it('should return a single category', function(done) {
      var category = _.sample(categories);
      passportStub.login({username: 'john.doe'});

      request(app)
      .get('/categories/' + category['_id'])
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.data['_id'].should.eql(category['_id'].toHexString());
        res.body.data['title'].should.eql(category['title']);
        res.body.data['order'].should.eql(category['order']);
        res.body.data.should.not.have.property('sections');
        done();
      });
    });

    it('should return a single category with sections', function(done) {
      var category = _.sample(categories);
      passportStub.login({username: 'john.doe'});

      request(app)
      .get('/categories/' + category['_id'] + '?includes=sections')
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.data['_id'].should.eql(category['_id'].toHexString());
        res.body.data['title'].should.eql(category['title']);
        res.body.data['order'].should.eql(category['order']);
        res.body.data.sections.length.should.eql(3);
        done();
      });
    });

    it('should delete a single category', function(done) {
      var category = _.sample(categories);
      passportStub.login({username: 'john.doe'});

      request(app)
      .delete('/categories/' + category['_id'])
      .expect(204)
      .end(function(err, res) {
        should.not.exist(err);
        
        Category.findById(category['_id'], function(err, cat) { 
          should.not.exist(err);
          should.not.exist(cat);
          done();
        });
      });
    });

    it('should treat category deletes as idempotent', function(done) {
      var category = _.sample(categories);
      passportStub.login({username: 'john.doe'});

      request(app)
      .delete('/categories/' + category['_id'])
      .expect(204)
      .end(function(err, res) {
        
        Category.findById(category['_id'], function(err, cat) { 
          should.not.exist(err);
          should.not.exist(cat);
          
          request(app)
          .delete('/categories/' + category['_id'])
          .expect(204)
          .end(function(err, res) {
            should.not.exist(err);
            
            Category.findById(category['_id'], function(err, cat) { 
              should.not.exist(err);
              should.not.exist(cat);
              done();
            });
          });
        });
      });
    });

    it('should delete a single section', function(done) {
      var category = _.sample(categories);
      var section = _.sample(category.sections);
      passportStub.login({username: 'john.doe'});

      request(app)
      .delete('/categories/' + category['_id'] + '/sections/' + section['_id'])
      .expect(204)
      .end(function(err, res) {
        should.not.exist(err);
        
        Category.findById(category['_id'], function(err, cat) { 
          should.not.exist(err);
          cat.sections.length.should.eql(2);
          cat.sections[0]['_id'].should.not.eql(section['_id'].toHexString());
          cat.sections[1]['_id'].should.not.eql(section['_id'].toHexString());
          done();
        });
      });
    });

    it('should treat section deletes as idempotent', function(done) {
      var category = _.sample(categories);
      var section = _.sample(category.sections);
      passportStub.login({username: 'john.doe'});

      request(app)
      .delete('/categories/' + category['_id'] + '/sections/' + section['_id'])
      .expect(204)
      .end(function(err, res) {
        
        Category.findById(category['_id'], function(err, cat) { 
          should.not.exist(err);

          request(app)
          .delete('/categories/' + category['_id'] + '/sections/' + section['_id'])
          .expect(204)
          .end(function(err, res) {
            should.not.exist(err);
            
            Category.findById(category['_id'], function(err, cat) { 
              should.not.exist(err);
              cat.sections.length.should.eql(2);
              cat.sections[0]['_id'].should.not.eql(section['_id'].toHexString());
              cat.sections[1]['_id'].should.not.eql(section['_id'].toHexString());
              done();
            });
          });
        });
      });
    });

    it('should update a single category', function(done) {
      var category = _.sample(categories);
      var categoryUpdate = {'title': 'NEW TITLE'};
      passportStub.login({username: 'john.doe'});

      request(app)
      .patch('/categories/' + category['_id'])
      .send(categoryUpdate)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.data.should.match(categoryUpdate);

        Category.findById(category['_id'], function(err, category) { 
          should.not.exist(err);
          category.should.match(categoryUpdate);
          done();
        });
      });
    });

    it('should update a single section', function(done) {
      var category = _.sample(categories);
      var categoryId = category._id;
      var sectionId = _.sample(category.sections)._id;
      var sectionUpdate = {'title': 'NEW TITLE'};
      passportStub.login({username: 'john.doe'});

      request(app)
      .patch('/categories/' + categoryId + '/sections/' + sectionId)
      .send(sectionUpdate)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        
        var resultSection = _.find(res.body.data.sections, function(s) { return s._id === sectionId.toHexString(); });
        resultSection.should.match(sectionUpdate);

        Category.findById(categoryId, function(err, category) { 
          should.not.exist(err);
          var dbSection = _.find(category.sections, function(s) { return s._id.toHexString() === sectionId.toHexString(); });
          dbSection.should.match(sectionUpdate);
          done();
        });
      });
    });

    it('should create a single category', function(done) {
      var newCategory = {'title': 'NEW CAT', 'order': 66};
      passportStub.login({username: 'john.doe'});

      request(app)
      .post('/categories')
      .send(newCategory)
      .expect(201)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.data.should.match(newCategory);

        Category.findById(res.body.data._id, function(err, category) { 
          should.not.exist(err);
          category.should.match(newCategory);
          done();
        });
      });
    });

    it('should create a single section', function(done) {
      var categoryId = _.sample(categories)._id;
      var newSection = {'title': 'NEW SECT', 'order': 55};
      passportStub.login({username: 'john.doe'});

      request(app)
      .post('/categories/' + categoryId + '/sections')
      .send(newSection)
      .expect(201)
      .end(function(err, res) {
        should.not.exist(err);
        var resultSection = _.find(res.body.data.sections, function(s) { return s.order === 55; });
        resultSection.should.match(newSection);

        Category.findById(categoryId, function(err, category) { 
          should.not.exist(err);
          var dbSection = _.find(category.sections, function(s) { return s._id.toHexString() === resultSection._id; });
          dbSection.should.match(newSection);
          done();
        });
      });
    });

    it('should allow sections to have component data', function(done) {
      var categoryId = _.sample(categories)._id;
      var newComponents = [{'componentType': 'text', 'data': 'hi'}];
      var newSection = {'title': 'NEW SECT', 'order': 55, 'template': 'page', 'components': newComponents};
      passportStub.login({username: 'john.doe'});

      request(app)
      .post('/categories/' + categoryId + '/sections')
      .send(newSection)
      .expect(201)
      .end(function(err, res) {
        should.not.exist(err);
        var resultSection = _.find(res.body.data.sections, function(s) { return s.order === 55; });
        resultSection.should.match(newSection);

        Category.findById(categoryId, function(err, category) { 
          should.not.exist(err);
          var dbSection = _.find(category.sections, function(s) { return s._id.toHexString() === resultSection._id; });
          dbSection.should.match(newSection);
          done();
        });
      });
    });
  });
});
