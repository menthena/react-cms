'use strict';

var React = require('react/addons');

require('../../../styles/ListItemComponent.sass');

var ListItemComponent = React.createClass({

  getInitialState: function() {
    var placeholderMode = (this.props.item.data.title === '' && this.props.item.data.url === '');
    return {
      placeholderMode: placeholderMode,
      isEditing: placeholderMode,
      isUrlEditing: placeholderMode,
      title: this.props.item.data.title,
      url: this.props.item.data.url,
      submitted: false
    };
  },

  handleEditTitle() {
    this.setState({
      isEditing: true
    }, function() {
      React.findDOMNode(this.refs.listItemInput).focus();
    });
  },

  handleInputChange(event) {
    this.setState({
      title: event.target.value
    });
  },

  handleUrlInputChange(event) {
    this.setState({
      url: event.target.value
    });
    if (this.state.submitted) {
      this.validateUrl();
    }
  },

  handleEditUrl() {
    this.setState({
      isUrlEditing: true
    }, function() {
      React.findDOMNode(this.refs.listItemUrlInput).focus();
    });
  },

  validateUrl() {
    var url = String(this.state.url);
    var regex = new RegExp(/s/);
    var urlError = !url.match(regex);
    this.setState({
      urlError: urlError
    });
    return urlError;
  },

  update(event) {
    if (event.keyCode === 13) {
      this.setState({
        submitted: true
      });
      var urlError = this.validateUrl();
      if (this.state.title !== '' && !urlError) {
        this.props.updateSingleComponent('link', {
          title: this.state.title,
          url: this.state.url,
          id: this.props.item.id
      });

        this.setState({
          isEditing: false,
          isUrlEditing: false
        });
      }
      event.preventDefault();
    }
  },

  componentDidMount() {
    if (this.state.placeholderMode) {
      React.findDOMNode(this.refs.listItemInput).focus();
    }
  },

  render: function () {
    var item = {};
    var component = this.props.item;
    if (this.props.item.data) {
      item = this.props.item.data;
    }

    var titleInputStyle = { display: this.state.isEditing ? 'block' : 'none' };
    var titleStyle = { display: !this.state.isEditing ? 'block' : 'none' };

    var urlInputStyle = {
      display: this.state.isUrlEditing ? 'block' : 'none',
      color: this.state.urlError ? '#f00' : ''
    };
    var urlStyle = {
      display: !this.state.isUrlEditing ? 'block' : 'none'
    };

    var icon = (<div className="item-icon pdf">{item.extension}</div>),
        info = 'PDF - 498.2 KB',
        image = <img alt="Download" src="images/download.gif" />,
        type = component.componentType,
        lastUpdated = '(' + item.updated_at + ')',
        url = (<span className="item-type">
                <a target="_blank" href={item.url}>{info}</a>
              </span>);

    if (component.componentType === 'link') {
      icon = <img src="images/icon-browser.gif" />;
      image = <img alt="Download" src="images/url.gif" />;
      info = item.url;
      type = component.componentType;
      lastUpdated = '';
      url = (<span className="item-type">
              <input style={urlInputStyle} placeholder="Enter a URL" type="text" maxLength="20" ref="listItemUrlInput" name="url" value={this.state.url} onChange={this.handleUrlInputChange} onKeyDown={this.update} />
              <span style={urlStyle}>{item.url}<i className="fa fa-pencil" onClick={this.handleEditUrl}></i></span>
            </span>);
    }

    return (
      <div data-order={this.props.item.order} className="list-item" data-droppable="item" draggable="true" onMouseDown={this.props.mouseDown} onDragEnd={this.props.dragEnd} onDragStart={this.props.dragStart}>
        <div className="remove pull-left" onClick={this.props.onClick.bind(null, item)}>
          <i className="fa fa-remove fa-lg"></i>
        </div>
        <div className="icon page pull-left">
          {icon}
        </div>
        <div className="details pull-left">
          <div>
            <form>
              <h3>
              <input style={titleInputStyle} placeholder="Enter a title" type="text" maxLength="20" ref="listItemInput" name="title" value={this.state.title} onChange={this.handleInputChange} onKeyDown={this.update} />
              <span style={titleStyle}>{item.title}<i className="fa fa-pencil" onClick={this.handleEditTitle}></i></span>
              </h3>
            </form>
            <p>
              {url}
              {lastUpdated}
            </p>
          </div>
        </div>
        <div className="pull-right">
          <div className="icon download pull-left">
            <a href={item.url} target="_blank">
              {image}
            </a>
          </div>
          <div className="pull-left re-order">
            <i className="fa fa-reorder fa-lg drag-controller"></i>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ListItemComponent;
