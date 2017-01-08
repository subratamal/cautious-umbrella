'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  propTypes: {
    disabled: _react2.default.PropTypes.bool,
    active: _react2.default.PropTypes.bool,
    loading: _react2.default.PropTypes.bool,
    focus: _react2.default.PropTypes.bool,
    error: _react2.default.PropTypes.bool,
    completed: _react2.default.PropTypes.bool,
    readOnly: _react2.default.PropTypes.bool,
    success: _react2.default.PropTypes.bool,
    warning: _react2.default.PropTypes.bool
  },

  getDisabled: function getDisabled() {
    var disabled = false;

    if (typeof this.props.disabled !== 'undefined') {
      disabled = this.props.disabled;
    }

    return disabled;
  },

  getActive: function getActive() {
    var active = false;

    if (typeof this.props.active !== 'undefined') {
      active = this.props.active;
    }

    return active;
  },

  getLoading: function getLoading() {
    var loading = false;

    if (typeof this.props.loading !== 'undefined') {
      loading = this.props.loading;
    }

    return loading;
  },

  getFocus: function getFocus() {
    var focus = false;

    if (typeof this.props.focus !== 'undefined') {
      focus = this.props.focus;
    }

    return focus;
  },

  getError: function getError() {
    var error = false;

    if (typeof this.props.error !== 'undefined') {
      error = this.props.error;
    }

    return error;
  },

  getCompleted: function getCompleted() {
    var completed = false;

    if (typeof this.props.completed !== 'undefined') {
      completed = this.props.completed;
    }

    return completed;
  },

  getReadOnly: function getReadOnly() {
    var readOnly = false;

    if (typeof this.props.readOnly !== 'undefined') {
      readOnly = this.props.readOnly;
    }

    return readOnly;
  },

  getSuccess: function getSuccess() {
    var success = false;

    if (typeof this.props.success !== 'undefined') {
      success = this.props.success;
    }

    return success;
  },

  getWarning: function getWarning() {
    var warning = false;

    if (typeof this.props.warning !== 'undefined') {
      warning = this.props.warning;
    }

    return warning;
  }
};