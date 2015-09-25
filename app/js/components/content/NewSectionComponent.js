'use strict';

var React = require('react/addons');

require('../../../styles/NewSectionComponent.sass');

var NewSectionComponent = React.createClass({

  getInitialState() {
    return {
      sectionComponentSelectorVisible: false,
      plusButtonVisible: true
    };
  },

  handleClick() {
    this.setState({
      sectionComponentSelectorVisible: true,
      plusButtonVisible: false
    });
  },

  handleNewComponent(component) {
    this.setState({
      plusButtonVisible: true,
      sectionComponentSelectorVisible: false
    });
  },

  _onChange(type) {
    this.setState({
      sectionComponentSelectorVisible: false
    });
  },

  render: function () {
    var sectionComponentSelectorVisible = this.state.sectionComponentSelectorVisible;
    var isAdmin = this.props.isAdmin;
    var template;
    var style = { display : this.state.plusButtonVisible ? 'block' : 'none'};

    if (sectionComponentSelectorVisible) {
      template = <div className="row new-section-component-selector">
        <div className="col-md-6 col-md-offset-3 text-center">
          <div className="row">
            <div className="col-xs-4">
              <a onClick={this.handleNewComponent.bind(null, 'TextComponent')}>
                <i className="glyphicon glyphicon-pencil"></i>
                <h3>Text</h3>
              </a>
            </div>
            <div className="col-xs-4">
              <a onClick={this.handleNewComponent.bind(null, 'ListComponent')}>
                <i className="glyphicon glyphicon-list"></i>
                <h3>List</h3>
              </a>
            </div>
            <div className="col-xs-4">
              <a onClick={this.handleNewComponent.bind(null, 'ImageComponent')}>
                <i className="glyphicon glyphicon-picture"></i>
                <h3>Image</h3>
              </a>
            </div>
          </div>
        </div>
      </div>;
    }
    return (
        <div className="new-section-component">
          {template}
          <a onClick={this.handleClick} style={style} className="add-new-section-component text-center">
            <i className="glyphicon glyphicon-plus"></i>
          </a>
        </div>
      );
  }
});

module.exports = NewSectionComponent;
