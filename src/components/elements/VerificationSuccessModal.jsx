/*Temporary Component */
import React from 'react';
import {Divider} from 'react-semantify';
import {verificationMsgConfig} from '../../constants/messagesConfig'

export default class VerificationSuccessModal extends React.Component {
  render() {
      return (
  		<div className="ui modal tiny verification-success">
  	      <div className="ui container center aligned ">
  	        	<Divider className="hidden"></Divider>
  	        	<div>
           			  <h2 className="ui icon header">{verificationMsgConfig.validationSuccess}</h2>
          		</div>
              <Divider className="hidden"></Divider>
          </div>
       </div>
      )
  }
}
