'use strict';

var React = require('react/addons');


require('../../styles/Header.sass');

var Header = React.createClass({

  render: function () {
    return (
        <header className="navbar navbar-fixed-top">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
        </header>
      );
  }
});

module.exports = Header;
