'use strict';

var _ = require('lodash');
var q = require('q');
var should = require('should');
var request = require('supertest');  
var mongoose = require('mongoose');
var async = require('async');
var ObjectId = require('mongoose').Types.ObjectId;
var passportStub = require('passport-stub');

var app = require('../app');
var Category = mongoose.model('Category');
var Component = mongoose.model('Component');
var searchClient = require('../services/search_client');

passportStub.install(app);

describe('Routing', function() {

  var categories;
  var components = [];
 
  // todo: refactor this callback horror
  beforeEach(function(done) {
    mongoose.connection.db.dropDatabase();
    components = [];
    passportStub.logout();

    searchClient.deleteAllIndices().then(function() {
      async.timesSeries(2, function(n, next) {
        var category = {
            'title': 'cat' + n, 
            'order': n, 
            '_id': new ObjectId(),
            'sections': _.times(2, function(s) { 
              return { 
                '_id': new ObjectId(), 
                'title': 'sect' + s + '_' + n, 
                'order': s
              } 
            })
        };

        Category.create(category, function(err, c) { 
          if (!err && c) {
            Component.create({
              componentType: 'text',
              order: 1,
              searchText: 'some is some crazy section content right here for cat' + n,
              data: {foo: 'bar'},
              sectionid: c.sections[0]._id,
              categoryid: c._id
            }, function(err, component) { 
              components.push(component);
              next(err, c); 
            })
          } else {
            next(err, c); 
          }
        });
      }, function(err, createdCategories) { 
        categories = createdCategories;

        var indexPromises = categories.map(function(category) {
          return searchClient.createCategory(category.title, category.id, true)
            .then(function(indexCategory) {
              var sectionIndexPromises = (category.sections || []).map(function(section) {
                return searchClient.createSection(section.title, category.id, section.id, true);
              });

              return q.all(sectionIndexPromises);
            });
        });

        q.all(indexPromises)
        .then(function() {
          return Component.find({});
        })
        .then(function(components) {
          var indexPromises = components.map(function(component) {
            return searchClient.createComponent(component.searchText, component.categoryid.toHexString(), component.sectionid.toHexString(), component.id, true);
          });

          return q.all(indexPromises);
        })
        .then(function() { done(); }); 
      });
    });
  });

  describe('Search', function() {
    it ('should return a list of partial matches', function(done) {
      passportStub.login({username: 'john.doe'});

      request(app)
      .get('/search?q=sect')
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.data.length.should.eql(6);
        res.body.data[5].matchType.should.eql('component');
        res.body.data[0].matchType.should.eql('section');
        res.body.data.forEach(function(match) {
          match.highlight.indexOf('sect').should.be.greaterThan(-1);
        });
        done();  
      });
    });
  });
});

