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
      async.timesSeries(5, function(n, next) {
        var category = {
            'title': 'test' + n, 
            'order': n, 
            '_id': new ObjectId(),
            'sections': _.times(3, function(s) { 
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
          return searchClient.createCategory(category.title, category.id)
            .then(function(indexCategory) {
              var sectionIndexPromises = (category.sections || []).map(function(section) {
                return searchClient.createSection(section.title, category.id, section.id);
              });

              return q.all(sectionIndexPromises);
            });
        });

        q.all(indexPromises).then(function() { done(); }); 
      });
    }); 
  });

  describe('Components', function() {
    it ('should return a list of components based on sectionid', function(done) {
      var sectionid = _.sample(categories).sections[0].id;
      passportStub.login({username: 'john.doe'});

      request(app)
      .get('/components?sectionid=' + sectionid)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.data.length.should.eql(1);
        res.body.data[0].sectionid.should.eql(sectionid);
        done();  
      });
    });

    it ('should return a list of components based on categoryid', function(done) {
      var categoryid = _.sample(categories).id;
      passportStub.login({username: 'john.doe'});

      request(app)
      .get('/components?categoryid=' + categoryid)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.data.length.should.eql(1);
        res.body.data[0].categoryid.should.eql(categoryid);
        done();  
      });
    });

    it ('should return an empty list of components', function(done) {
      var sectionid = _.sample(categories).sections[0].id;
      passportStub.login({username: 'john.doe'});

      Component
      .find({ sectionid: sectionid })
      .remove()
      .exec(function(err) {
        should.not.exist(err);

        request(app)
        .get('/components?sectionid=' + sectionid)
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.body.data.length.should.eql(0);
          res.body.data.should.eql([]);
          done();  
        });
      });

    });

    it('should return a single component', function(done) {
      var component = _.sample(components);
      passportStub.login({username: 'john.doe'});

      request(app)
      .get('/components/' + component.id)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.data.id.should.eql(component.id);
        res.body.data.should.have.properties('id', 'componentType', 'data', 'order');
        done();
      });
    });

    it('should delete a single component', function(done) {
      var component = _.sample(components);
      passportStub.login({username: 'john.doe'});

      request(app)
      .delete('/components/' + component.id)
      .expect(204)
      .end(function(err, res) {
        should.not.exist(err);
        
        Component.findById(component.id, function(err, comp) { 
          should.not.exist(err);
          should.not.exist(comp);
          done();
        });
      });
    });

    it('should treat component deletes as idempotent', function(done) {
      var component = _.sample(components);
      passportStub.login({username: 'john.doe'});

      request(app)
      .delete('/components/' + component.id)
      .expect(204)
      .end(function(err, res) {
        
        Component.findById(component.id, function(err, comp) { 
          should.not.exist(err);
          should.not.exist(comp);
          
          request(app)
          .delete('/components/' + component.id)
          .expect(204)
          .end(function(err, res) {
            should.not.exist(err);
            
            Component.findById(component.id, function(err, comp) { 
              should.not.exist(err);
              should.not.exist(comp);
              done();
            });
          });
        });
      });
    });

    it('should update a single component', function(done) {
      var component = _.sample(components);
      var componentUpdate = {'data': { viper: 'go' }};
      passportStub.login({username: 'john.doe'});

      request(app)
      .patch('/components/' + component.id)
      .send(componentUpdate)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.data.should.match(componentUpdate);

        Component.findById(component.id, function(err, component) { 
          should.not.exist(err);
          component.should.match(componentUpdate);
          done();
        });
      });
    });

    it('should create a single component', function(done) {
      var component = _.sample(components);
      var newComponent = {
        'order': 2, 
        'componentType': 'list', 
        'data': { 'magic': 'stuff'},
        'sectionid': component.sectionid.toHexString(),
        'categoryid': component.categoryid.toHexString()
      };
      passportStub.login({username: 'john.doe'});

      request(app)
      .post('/components')
      .send(newComponent)
      .expect(201)
      .end(function(err, res) {
        should.not.exist(err);
        res.body.data.should.match(newComponent);

        Component.findById(res.body.data.id, function(err, dbComponent) { 
          should.not.exist(err);
          var createdComponent = dbComponent.toObject();
          createdComponent.sectionid = createdComponent.sectionid.toHexString();
          createdComponent.categoryid = createdComponent.categoryid.toHexString();

          createdComponent.should.match(newComponent);

          request(app)
          .get('/components?sectionid=' + createdComponent.sectionid)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.data.length.should.eql(2);
            res.body.data[0].id.should.eql(component.id);
            res.body.data[1].id.should.eql(dbComponent.id);
            done();
          });
        });
      });
    });

  });
});

