/*Temporary Component */
import React from 'react';

export const LoggedIn = React.createClass({
  render: function() {
    return (
    	<div className="ui message">
  			<div className="header">
    			Welcome {this.props.user.get('name')} !
  			</div>
		</div>
    );
  }
});

