'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeArray = ['div', 'link', 'icon'];

exports.default = {

  propTypes: {
    type: _react2.default.PropTypes.oneOf(typeArray)
  },

  getType: function getType() {
    var type = 'div';

    if (typeof this.props.type !== 'undefined') {
      if (typeArray.indexOf(this.props.type) !== -1) {
        type = this.props.type;
      }
    }
    return type;
  }
};