'use strict';

var React = require('react/addons');
var TextComponent = require('./TextComponent');
var ListComponent = require('./ListComponent');
var AppActions = require('../../actions/AppActions');
var AppStore = require('../../stores/AppStore');
var AppConstants = require('../../constants/AppConstants');

require('../../../styles/NewSectionComponent.sass');

var NewSectionComponent = React.createClass({

  // mixins: [
  //   require('react-onclickoutside')
  // ],
  //
  // handleClickOutside: function(evt) {
  //   AppActions.closeAllNewSectionComponents();
  // },

  getInitialState() {
    return {
      sectionComponentSelectorVisible: false,
      newComponent: null,
      plusButtonVisible: true
    };
  },

  handleClick() {
    AppActions.closeAllNewSectionComponents();
    this.setState({
      // sectionComponentSelectorVisible: this.state.sectionComponentSelectorVisible ? false : true, // TO DO - toggle
      sectionComponentSelectorVisible: true,
      newComponent: null,
      plusButtonVisible: false
    });
  },

  handleNewComponent(component) {
    this.setState({
      newComponent: component,
      plusButtonVisible: true
    });
    AppActions.addNewSectionComponent();
  },

  _onChange(type) {
    if (type === AppConstants.CLOSE_ALL_NEW_SECTION_COMPONENTS) {
      this.setState({
        sectionComponentSelectorVisible: false
      });
    }
  },

  componentDidMount() {
    AppStore.addChangeListener(this._onChange);
  },

  render: function () {
    var sectionComponentSelectorVisible = this.state.sectionComponentSelectorVisible;
    var isAdmin = this.props.isAdmin;
    var template;
    var style = { display : this.state.plusButtonVisible ? 'block' : 'none'};

    if (this.state.newComponent === 'TextComponent') {
      template = <TextComponent categoryID={this.props.categoryID} sectionID={this.props.sectionID} isAdmin={isAdmin}></TextComponent>;
    } else if (this.state.newComponent === 'ListComponent') {
      template = <ListComponent categoryID={this.props.categoryID} sectionID={this.props.sectionID} isAdmin={isAdmin}></ListComponent>;
    } else if (sectionComponentSelectorVisible) {
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
