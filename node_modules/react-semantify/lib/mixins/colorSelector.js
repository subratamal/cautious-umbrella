'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colorArray = ['black', 'yellow', 'green', 'blue', 'orange', 'purple', 'red', 'teal'];

exports.default = {

  propTypes: {
    color: _react2.default.PropTypes.oneOf(colorArray)
  },

  getColor: function getColor() {
    var color = 'null';

    if (typeof this.props.color !== 'undefined') {

      if (colorArray.indexOf(this.props.color) !== -1) {
        color = this.props.color;
      }
    }

    return color;
  }
};