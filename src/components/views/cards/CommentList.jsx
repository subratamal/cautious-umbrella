import React, { Component, PropTypes } from 'react'
import {
Card,
Content,
Item,
Icon,
Divider
} from 'react-semantify';

class CommentList extends React.Component {
	render(){
		return(
			<div className="ui comments">
                <divider className="ui hidden divider"></divider>
                <div className="comment">
                  <a className="avatar">
                    <img src={require('../../../../static/images/user_neutral.png')}/>
                  </a>
                  <div className="content">
                    <a className="author">Matt elepsum</a>
                    <div className="metadata">
                      <span className="date">Today at 5:42PM</span>
                    </div>
                    <div className="text">
                      Suggestion: You could have actually done something more created with
                      the pictures. Suppose you have portrait images of all the people,
                      you...<a>More</a>
                    </div>
                    <div className="actions">
                      <a href="#">
                        <Icon className="comment outline"></Icon>
                      </a>
                      <a href="#">
                        <Icon className="report"></Icon>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="comment">
                  <a className="avatar">
                    <img src={require('../../../../static/images/user_neutral.png')}/>
                  </a>
                  <div className="content">
                    <a className="author">Matt</a>
                    <div className="metadata">
                      <span className="date">Today at 5:42PM</span>
                    </div>
                    <div className="text">
                      How artistic!
                    </div>
                    <div className="actions">
                      <a href="#">
                        <Icon className="comment outline"></Icon>
                      </a>
                      <a href="#">
                        <Icon className="report"></Icon>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
		)
	}
}

export default CommentList