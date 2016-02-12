'use strict';

import React from 'react';
import ReactDOM  from 'react-dom';
import TimerMixin from 'react-timer-mixin';
import Moment from 'moment';

require('../../../styles/ListItemComponent.sass');

const ListItemComponent = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      title: this.props.item.title,
      url: this.props.item.url,
      isEditingTitle: this.props.item.title ? false : true,
      isEditingUrl: this.props.item.url ? false : true,
      submitted: false,
      timeoutId: null
    };
  },

  blurInput(input) {
    ReactDOM.findDOMNode(input).blur();
  },

  update(event, data) {
    this.props.updateListItem(data);
    if (data.title) {
      this.blurInput(this.refs.listItemInput);
      this.setState({
        isEditingTitle: false
      });
    } else {
      this.blurInput(this.refs.listItemUrlInput);
      this.setState({
        isEditingUrl: false
      });
    }
  },

  updateOnEnter(event, data) {
    this.clearTimeout(this.state.timeoutId);
    if (event.keyCode === 13) {
      this.update(event, data);
    }
  },

  updateOnTab(event, data) {
    this.clearTimeout(this.state.timeoutId);
    if (event.keyCode === 9) {
      this.update(event, data);
    }
  },

  updateAfterTimeout(event, data) {
    this.clearTimeout(this.state.timeoutId);
    this.state.timeoutId = this.setTimeout(
      () => {
        this.update(event, data);
      },
      2000
    );
  },

  updateUrl(event) {
    let data = {
      url: this.state.url
    };
    if (data.url) {
      this.updateOnEnter(event, data);
      this.updateOnTab(event, data);
    }
  },

  updateTitle(event) {
    let data = {
      title: this.state.title
    };
    if (data.title) {
      this.updateOnEnter(event, data);
      this.updateOnTab(event, data);
    }
  },

  handleTitleInputChange(event) {
    let data = {
      title: event.target.value
    };
    this.setState(data);
    this.updateAfterTimeout(event, data);
  },

  handleUrlInputChange(event) {
    let data = {
      url: event.target.value
    };
    this.setState(data);
    this.updateAfterTimeout(event, data);
  },

  handleEditUrl() {
    this.setState({
      isEditingUrl: true
    }, () => {
      ReactDOM.findDOMNode(this.refs.listItemUrlInput).focus();
    });
  },

  handleEditTitle() {
    this.setState({
      isEditingTitle: true
    }, () => {
      ReactDOM.findDOMNode(this.refs.listItemInput).focus();
    });
  },

  validateUrl() {
    let url = String(this.state.url);
    let regex = new RegExp(/s/);
    let urlError = !url.match(regex);
    this.setState({
      urlError: urlError
    });
    return urlError;
  },

  formatSize(bytes) {
    let k = 1000;
    let sizes = ['Bytes', 'KB', 'MB', 'GB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
  },

  getFileExtension(type) {
    let fileExtension = {
      icon: 'fa fa-file-o fa-3x',
      text: ''
    };
    if (type) {
      if (type.indexOf('photoshop') > -1) {
        fileExtension = {
          text: 'psd',
          icon: 'fa fa-file-photo-o fa-3x'
        }
      }
      if (type.indexOf('pdf') > -1) {
        fileExtension = {
          text: 'pdf',
          icon: 'fa fa-file-pdf-o fa-3x'
        }
      }
      if (type.indexOf('document') > -1) {
        fileExtension = {
          text: 'word',
          icon: 'fa fa-file-text-o fa-3x'
        }
      }
      if (type.indexOf('drawing') > -1) {
        fileExtension = {
          text: 'drawing',
          icon: 'fa fa-file-o fa-3x'
        }
      }
      if (type.indexOf('spreadsheet') > -1) {
        fileExtension = {
          text: 'spreadsheet',
          icon: 'fa fa-table fa-3x'
        }
      }
      if (type.indexOf('zip') > -1) {
        fileExtension = {
          text: 'zip',
          icon: 'fa fa-file-archive-o fa-3x'
        }
      }
      return fileExtension;
    }
  },

  render() {
    let item = this.props.item;
    let userIsAdmin = this.props.userIsAdmin;
    let titleInputStyle = { display: this.state.isEditingTitle ? 'block' : 'none' };
    let titleStyle = { display: !(this.state.isEditingTitle && userIsAdmin) ? 'block' : 'none' };
    let urlInputStyle = {
      display: this.state.isEditingUrl ? 'inline-block' : 'none',
      color: this.state.urlError ? '#f00' : ''
    };
    let urlStyle = {
      display: !this.state.isEditingUrl ? 'inline-block' : 'none'
    };

    let icon,
        info,
        image = <i className='fa fa-arrow-right'></i>,
        type = item.type,
        lastUpdated = ' (Last updated ' + Moment(item.last_updated).format('DD/MM/YYYY') + ')',
        url;

    if (item.extension) {
      icon = (<i className={this.getFileExtension(item.extension).icon}></i>);
    }

    if (item.extension) {
      if (item.size) {
        info = this.getFileExtension(item.extension).text.toUpperCase() + ' - ' + this.formatSize(item.size);
      } else {
        info = this.getFileExtension(item.extension).text.toUpperCase();
      }
    }

    url = (<span className='item-type'>
            <a target='_blank' href={item.url}>{info}</a>
          </span>);

    if (item.type === 'link') {
      icon = <i className='fa fa-link fa-3x'></i>;
      image = <i className='fa fa-arrow-right'></i>,
      info = item.url;
      type = item.type;
      lastUpdated = '';
      url = (<span className='item-type'>
              { userIsAdmin ?
                <input style={urlInputStyle} placeholder='Enter a URL' type='text'
                maxLength='20' ref='listItemUrlInput' name='url' value={this.state.url}
                onChange={this.handleUrlInputChange} onKeyDown={this.updateUrl} />
              : null }
              <span style={urlStyle}>
                {item.url}
                { userIsAdmin ?
                  <i className='fa fa-pencil' onClick={this.handleEditUrl}></i>
                : null }
              </span>
            </span>);
    }

    return (
      <div data-order={item.order} className='list-item' data-droppable='item'>
        { userIsAdmin ?
          <div className='remove pull-left' onClick={this.props.onClick.bind(null, item)}>
            <i className='fa fa-remove fa-lg'></i>
          </div>
        : null }
        <div className='icon page pull-left'>
          {icon}
        </div>
        <div className='details pull-left'>
          <div>
            <form>
              <h3>
                { userIsAdmin ?
                  <input style={titleInputStyle} placeholder='Enter a title' type='text'
                  maxLength='20' ref='listItemInput' name='title' value={this.state.title}
                  onChange={this.handleTitleInputChange} onKeyDown={this.updateTitle} />
                : null }
                <span style={titleStyle}>
                  {item.title}
                  { userIsAdmin ?
                    <i className='fa fa-pencil' onClick={this.handleEditTitle}></i>
                  : null }
                </span>
              </h3>
            </form>
            <p>
              {url}
              {lastUpdated}
            </p>
          </div>
        </div>
        <div className='pull-right'>
          <div className='icon download pull-left'>
            <a href={item.url} target='_blank'>
              {image}
            </a>
          </div>
          { userIsAdmin ?
            <div className='pull-left re-order' data-parent='true' draggable='true'
            onMouseDown={this.props.mouseDown} onDragEnd={this.props.dragEnd} onDragStart={this.props.dragStart}>
              <i className='fa fa-reorder fa-lg drag-controller'></i>
            </div>
          : null }
        </div>
      </div>
    );
  }
});

module.exports = ListItemComponent;
