'use strict';

var React = require('react/addons');
var ListItemComponent = require('./ListItemComponent');
var DragMixin = require('../../mixins/DragMixin');
var AppActions = require('../../actions/AppActions');
var GoogleDriveMixin = require('../../mixins/GoogleDriveMixin');
var update = React.addons.update;
var _ = require('lodash');

require('../../../styles/ListComponent.sass');
var ListComponent = React.createClass({
  mixins: [DragMixin, GoogleDriveMixin],

  getInitialState: function() {
    return {
      data: this.props.components
    };
  },

  setDraggableData: function(dragged, over) {
    var sectionID = this.props.sectionID;
    var stateData = this.state.data;
    _.each(stateData, function(component) {
      if (component.id === dragged.id) {
        component.order = dragged.order;
      } else if (component.id === over.id) {
        component.order = over.order;
      }
    });
    this.updateComponents();
  },

  removePlaceholders() {
    var data = [];
    _.each(this.state.data, function(component) {
      if (!component.data.placeholder) {
        data.push(component);
      }
    });
    this.setState({
      data: data
    });
    return data;
  },

  addComponent(type, elem) {
    this.state.data.push({
      componentType: type,
      order: this.state.data.length,
      data: elem
    });
    this.setState({
      data: this.state.data
    });
    if (!elem.placeholder) {
      this.updateComponents();
    }
  },

  addLinkPlaceholder: function() {
    var elem = {
      title: '',
      url: '',
      placeholder: true
    };
    this.addComponent('link', elem);
  },

  updateComponents() {
    var sectionID = this.props.sectionID;
    var categoryID = this.props.categoryID;
    var data = this.removePlaceholders();
    AppActions.updateComponents(categoryID, sectionID, data);
  },

  removeLink(item) {
    this.setState({
      data: _.remove(this.state.data, item)
    });
    this.updateComponents();
  },

  updateSingleComponent(componentType, newComponentData) {
    if (newComponentData.id) {
      var component = _.find(this.state.data, { id: newComponentData.id });
      component.data = newComponentData;
      this.updateComponents();
    } else {
      this.addComponent(componentType, newComponentData);
    }
  },

  render: function () {
    var data = this.state.data || [];
    var isAdmin = this.props.isAdmin;
    var addLinkButton = '';
    var googleDriveButton = '';

    data = _.sortBy(data, 'order');

    if (isAdmin) {
      addLinkButton = <button className="btn btn-default" onClick={this.addLinkPlaceholder}>Add link</button>;
      googleDriveButton = <button id="google-button" className="btn btn-default" onClick={this.addFilesFromGoogleDrive}>Add from Google Drive</button>;
    }
    this.loadDraggableData(this.state.data);
    return (
        <div>
          <div className="files" onDragOver={this.dragOver} onDrop={this.drop}>
            {data.map(function(item, i) {
              return (<ListItemComponent key={i} updateSingleComponent={this.updateSingleComponent} order={item.order} dragStart={this.dragStart} dragEnd={this.dragEnd} mouseDown={this.mouseDown} item={item} onClick={this.removeLink.bind(null, item)} isAdmin={isAdmin}></ListItemComponent>);
            }.bind(this))}

            {addLinkButton}
            {googleDriveButton}

          </div>
        </div>
      );
  }
});

module.exports = ListComponent;
