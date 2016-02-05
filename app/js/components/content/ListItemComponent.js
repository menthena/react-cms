'use strict';

import React from 'react';
import ReactDOM  from 'react-dom';
import TimerMixin from 'react-timer-mixin';

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
    this.updateOnEnter(event, data);
  },

  updateTitle(event) {
    let data = {
      title: this.state.title
    };
    this.updateOnEnter(event, data);
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

  //
  // handleUrlInputChange(event) {
  //   this.setState({
  //     url: event.target.value
  //   });
  //   if (this.state.submitted) {
  //     this.validateUrl();
  //   }
  // },

  validateUrl() {
    let url = String(this.state.url);
    let regex = new RegExp(/s/);
    let urlError = !url.match(regex);
    this.setState({
      urlError: urlError
    });
    return urlError;
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

    let icon = (<div className='item-icon pdf'>{item.extension}</div>),
        info = 'PDF - 498.2 KB',
        image = <i className='fa fa-arrow-right'></i>,
        type = item.type,
        lastUpdated = '(' + item.updated_at + ')',
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
                onChange={this.handleUrlInputChange} onBlur={this.updateUrl} onKeyDown={this.updateUrl} />
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
                  onChange={this.handleTitleInputChange} onBlur={this.updateTitle} onKeyDown={this.updateTitle} />
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
