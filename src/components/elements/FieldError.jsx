/*Generic Component for showing form field errors*/
import React , {Component, PropTypes} from 'react'

export const FieldError = React.createClass({
  render: function() {
  	var errorClass = 'ui auth-form error message';
    return (
	  <div className={errorClass}>
      	{this.props.message}
    	</div>
    );
  }
});