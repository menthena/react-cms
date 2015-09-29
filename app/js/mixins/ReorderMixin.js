'use strict';

require('../../styles/ReorderMixin.sass');
var _ = require( 'lodash' );

var ReorderMixin = {

  componentWillMount() {
    this.draggableData = [];
    this.parent = false;
  },

  loadDraggableData: function(data) {
    this.draggableData = data;
  },

  dragStart: function(e) {
    console.log('drag start');
    this.dragged = e.currentTarget;
    if (this.dragged.dataset.parent) {
      this.dragged = this.dragged.parentNode;
      this.parent = true;
    }
    e.dataTransfer.effectAllowed = 'copy';
    this.placeholder = document.createElement("div");
    this.placeholder.className = "placeholder";

    // // Firefox requires calling dataTransfer.setData
    // // for the drag to properly work
    e.dataTransfer.setData('text/html', e.currentTarget);
  },

  drop: function(e){
    console.log('drop');
    e.preventDefault();
    if (e.dataTransfer.effectAllowed !== 'copy') {
      this.addLink({
        'title': 'IT Guide',
        'extensions': 'PDF',
        'url': 'http://google.com',
        'size': 2077912,
        'updated_at': '2014-12-10T13:48:35.808Z',
        'order': this.draggableData.length - 1
      });
    }
  },

  mouseDown: function(e){
    console.log('mouse down');
    var element = e.target;
    if (element.className.indexOf('drag-controller') === -1) {
      e.stopPropagation();
      e.preventDefault();
    }
  },

  dragEnd: function() {
    console.log('drag end');
    if (this.over && this.dragged.dataset.droppable === this.over.dataset.droppable) {
      this.dragged.style.display = 'block';
      this.over.parentNode.removeChild(this.placeholder);

      // Update state
      var from = Number(this.dragged.dataset.order);
      var to = Number(this.over.dataset.order);
      if (!isNaN(to) && !isNaN(from)) {
        this.draggableData.splice(to, 0, this.draggableData.splice(from, 1)[0]);
        _.each(this.draggableData, function(data, index) {
          data.order = index;
        });
        this.setDraggableData(this.draggableData);
      }
      this.dragged = null;
    } else {
      this.dragged.style.display = 'block';
    }
  },

  dragOver: function(e) {
    console.log('drag over');
    e.preventDefault();
    var target = e.target;
    if (this.parent) {
      target = target.parentNode;
    }
    console.log(this.dragged);
    if (this.dragged && this.dragged.dataset.droppable === target.dataset.droppable) {
      console.log('true');
      this.over = target;

      this.dragged.style.display = 'none';
      if (this.over.className === 'placeholder') {
        return;
      }
      if (this.over.dataset.droppable) {
        this.over.parentNode.insertBefore(this.placeholder, this.over);
      }
    }
  }

};


module.exports = ReorderMixin;
