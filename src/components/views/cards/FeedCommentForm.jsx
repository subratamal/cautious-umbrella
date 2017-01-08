import React, { Component, PropTypes } from 'react'

class FeedCommentForm extends React.Component {
  constructor(props){
    super(props)
    this.submitCommentForm = this.submitCommentForm.bind(this)
  }
  submitCommentForm(){
    event.preventDefault()
  }
	render(){
		return(
			<form className="ui reply form extra content">
        <div className="field ui fluid large transparent right icon input comment">
          <a className="ui mini image">
            <img className="ui medium rounded image" src={require('../../../../static/images/user_neutral.png')}/>
          </a>
          <i className="enter icon"></i>
          <textarea  onKeyPress={this.submitCommentForm.bind(this)} placeholder="say something ....."></textarea>
        </div>
      </form>
		)
	}
}

export default FeedCommentForm