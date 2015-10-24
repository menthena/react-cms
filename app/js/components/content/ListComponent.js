'use strict';

import React from 'react/addons';
import ListItemComponent from './ListItemComponent';
import DropFileComponent from './DropFileComponent';
import ReorderMixin from '../../mixins/ReorderMixin';
import ModalMixin from '../../mixins/ModalMixin';
import PageComponentActions from './PageComponentActions';
import ComponentActionCreators from '../../actions/ComponentActionCreators';
let update = React.addons.update;
import _ from 'lodash';

require('../../../styles/ListComponent.sass');
let ListComponent = React.createClass({
  mixins: [ReorderMixin, ModalMixin],

  getInitialState: function() {
    return {
      data: this.props.data
    };
  },

  addLink: function() {
    let elem = {
      title: '',
      url: '',
      type: 'link',
      order: this.state.data.links.length
    };
    let componentData = this.state.data;
    componentData.links.push(elem);
    this.updateComponent(componentData);
  },

  addImage: function() {
    console.log('add');
  },

  setDraggableData: function(links) {
    let data = {
      links: links
    };
    this.updateComponent(data);
  },

  updateComponent(componentData) {
    ComponentActionCreators.updateComponent(this.props.componentId, {data: componentData});
  },

  delete(index) {
    let componentData = this.state.data;
    componentData.links.splice(index, 1);
    this.updateComponent(componentData);
  },

  removeLink(index, item) {
    let props = {
      actions: this.delete,
      text: 'You are about to delete "' + item.title + '"'
    };
    ModalMixin.appendModalToBody(props);
  },

  updateListItem(index, listItemData) {
    let componentData = this.state.data;
    let links = componentData.links;
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
    let links = this.state.data.links;
    let component =  this.props.component;
    let userIsAdmin = this.props.userIsAdmin;
    let classes = 'list';

    if (userIsAdmin) {
      classes += ' template';
    }

    this.loadDraggableData(this.props.data.links);
    return (
        <div className={classes} data-droppable='component' data-order={component.order} onDragOver={this.dragOver}>
          <div onDrop={this.drop}>
            <div className='files'>
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
