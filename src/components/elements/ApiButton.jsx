/*Genric Button Component for Api calls
Props -
buttonClass - css classname that are to be applied (ui button is applied by default)
iconClass - css classname ,if present,  will be used to add an icon to the button
buttonText - string which is the Button Text
onClickFunction - a function to be defined in the parent component of this which will be called on click
actionName - action object defined action_creators
dispatch - dispatch function given by react-redux Provider which should be passed by the parent

**NOTE : if onClickFunction and (actionName + dispatch), both are passed onClickFunction is given the priority **

*/

import React , {Component, PropTypes} from 'react'
import * as actionCreators from '../../api/api';


export const ApiButton = React.createClass({
  /*Functions which carries out onClick operation based on props input*/
  dispatchAction : function() {
  	if(this.props.onClickFunction){
  		this.props.onClickFunction();
  	}
  	else if(this.props.actionName)
  		this.props.dispatch(actionCreators[this.props.actionName]());

  },
  render: function() {
    return (
      <button type={this.props.buttonType} className={this.props.buttonClass + ' ui button'} onClick = {this.dispatchAction}>
        	{this.props.iconClass ? <i className={this.props.iconClass}></i>: false}{this.props.buttonText}
       </button>
    );
  }
});
