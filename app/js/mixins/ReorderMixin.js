'use strict';

require('../../styles/ReorderMixin.sass');
import _ from 'lodash';
let canDrag = false;
let getParent = (element) => {
  let parent = element.parentNode;
  let i = 0;
  while (parent && i < 10) {
    if (parent) {
      if (parent.dataset && parent.dataset.droppable) {
        return parent;
      }
      if (parent.parentNode) {
        parent = parent.parentNode;
      }
    }
    i++;
  }
  return parent;
};

const ReorderMixin = {

  componentWillMount() {
    this.draggableData = [];
    this.parent = false;
  },

  loadDraggableData(data) {
    this.draggableData = data;
  },

  dragStart(e) {
    if (!canDrag) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.dragged = e.currentTarget;
    if (this.dragged.dataset.parent) {
      // this.dragged = this.dragged.parentNode; //
      let parent = getParent(this.dragged);
      this.dragged = parent;
      this.parent = true;
    }
    e.dataTransfer.effectAllowed = 'copy';
    this.placeholder = document.createElement('div');
    this.placeholder.className = 'placeholder';

    // // Firefox requires calling dataTransfer.setData
    // // for the drag to properly work
    e.dataTransfer.setData('text/html', e.currentTarget);
  },

  drop(e) {
    e.preventDefault();
    if (e.dataTransfer.effectAllowed !== 'copy') {
      this.addLinkPlaceholder({
        title: 'IT Guide',
        extensions: 'PDF',
        url: 'http://google.com',
        size: 2077912,
        updated_at: '2014-12-10T13:48:35.808Z',
        order: this.draggableData.length - 1
      });
    }
  },

  mouseDown(e) {
    let element = e.target;
    canDrag = false;
    if (element.className.indexOf('drag-controller') > -1) {
      canDrag = true;
    }
  },

  dragEnd() {
    if (this.over && this.dragged.dataset.droppable === this.over.dataset.droppable) {
      this.dragged.style.display = 'block';
      this.over.parentNode.removeChild(this.placeholder);

      // Update state
      let from = Number(this.dragged.dataset.order);
      let to = Number(this.over.dataset.order);

      if (!isNaN(to) && !isNaN(from)) {
        this.draggableData.splice(to, 0, this.draggableData.splice(from, 1)[0]);
        _.each(this.draggableData, (data, index) => {
          data.order = index;
        });
        this.setDraggableData(this.draggableData);
      }
      this.dragged = null;
    } else {
      this.dragged.style.display = 'block';
    }
  },

  dragOver(e) {
    e.preventDefault();
    let target = e.target;
    if (this.parent) {
      target = getParent(target);
    }
    if (this.dragged && target.dataset && this.dragged.dataset.droppable === target.dataset.droppable) {
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
