'use strict';

var React = require('react/addons');
var ListItemComponent = require('./ListItemComponent');
var DropFileComponent = require('./DropFileComponent');
var ReorderMixin = require('../../mixins/ReorderMixin');
var ModalMixin = require('../../mixins/ModalMixin');
var PageComponentActions = require('./PageComponentActions');
var ComponentActionCreators = require('../../actions/ComponentActionCreators');
var update = React.addons.update;
var _ = require('lodash');

require('../../../styles/ListComponent.sass');
var ListComponent = React.createClass({
  mixins: [ReorderMixin, ModalMixin],

  getInitialState: function() {
    return {
      data: this.props.data
    };
  },

  addLink: function() {
    var elem = {
      title: '',
      url: '',
      type: 'link',
      order: this.state.data.links.length
    };
    var componentData = this.state.data;
    componentData.links.push(elem);
    this.updateComponent(componentData);
  },

  addImage: function() {
    console.log('add');
  },

  setDraggableData: function(links) {
    var data = {
      links: links
    };
    this.updateComponent(data);
  },

  updateComponent(componentData) {
    ComponentActionCreators.updateComponent(this.props.componentId, {data: componentData});
  },

  delete(index) {
    var componentData = this.state.data;
    componentData.links.splice(index, 1);
    this.updateComponent(componentData);
  },

  removeLink(index, item) {
    var props = {
      actions: this.delete,
      text: 'You are about to delete "' + item.title + '"'
    };
    ModalMixin.appendModalToBody(props);
  },

  updateListItem(index, listItemData) {
    var componentData = this.state.data;
    var links = componentData.links;
    var fieldToUpdate;
    var dataToUpdate;
    _.forOwn(listItemData, function(value, key) {
      fieldToUpdate = key;
      dataToUpdate = value;
    });
    _.each(links, function(link) {
      links[index][fieldToUpdate] = dataToUpdate;
    });
    this.updateComponent(componentData);
  },

  render: function() {
    var links = this.state.data.links;
    var component =  this.props.component;
    var userIsAdmin = this.props.userIsAdmin;
    var classes = 'list';

    if (userIsAdmin) {
      classes += ' template';
    }

    this.loadDraggableData(this.props.data.links);
    return (
        <div className={classes} data-droppable="component" data-order={component.order} onDragOver={this.dragOver}>
          <div onDrop={this.drop}>
            <div className="files">
              {links.map(function(item, index) {
                return (<ListItemComponent key={index} updateListItem={this.updateListItem.bind(null, index)} dragStart={this.dragStart} dragEnd={this.dragEnd} mouseDown={this.mouseDown} item={item} onClick={this.removeLink.bind(null, index, item)} userIsAdmin={userIsAdmin}></ListItemComponent>);
              }.bind(this))}
            </div>
            <DropFileComponent type={'link'} userIsAdmin={userIsAdmin} addImage={this.addImage} addLink={this.addLink}></DropFileComponent>
          </div>
          <PageComponentActions userIsAdmin={userIsAdmin} type={component.componentType} componentId={this.props.componentId} dragStart={this.props.dragStart} dragEnd={this.props.dragEnd} mouseDown={this.props.mouseDown} />
        </div>
      );
  }
});

module.exports = ListComponent;
