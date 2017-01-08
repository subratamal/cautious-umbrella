/*Page Card Mini Teaser*/
import React, {Component} from 'react'
import {
	Item,
	Content,
	Card
} from 'react-semantify'

import CardWrapper from './CardWrapper'
import {pageThumbnail} from '../../../defaults'
import {FollowButton} from './FollowButton';

/*
Properties -

imageOnClickLink - url to be navigated on image click
imageSource - image src
primaryText -  primary text
primaryTextOnClickLink - url to be navigated on primary text click
secondaryText - secondary text
secondaryTextOnClickLink - url to be navigated on secondary text click
isWrapped - boolean to add or remove card wrapper (default = true)

*/

/*
class .mini-teaser is wirtten in item.overrides which
- Makes the mini teaser responsive as required
- Overrides default behaviour added by semnatic mobile device dimentions
*/

class TopicTeaserCard extends React.Component {
	constructor(props) {
		super(props)

		this.imageFetchFailed = this.imageFetchFailed.bind(this)
	}
	componentWillMount(){
		let image;
		image = this.props.topicCoverPicture ? this.props.topicCoverPicture.image_100_100 : pageThumbnail;
		this.setState({
			imageSource : image
		});
	}
	/*If image recived from api call failed, render default image*/
	imageFetchFailed() {
		this.setState({
			imageSource : pageThumbnail
		})
	}

	render () {
		let textClass = this.props.showFullTextClass ? this.props.showFullTextClass
						: '';
		let textClasses = "ui " + (this.props.secondaryText? " primary-text ": " primary-text " )  + textClass;
		return (

					<div className="ui items mini-teaser">
									<div className="item">
										<a className="ui mini image" href={this.props.topicUrl}>
										<img className="ui medium rounded image" src={this.state.imageSource} onError={this.imageFetchFailed}/>
										</a>
										<Content>
												<a href={this.props.topicUrl} className="singleline-ellipsis" target="_blank">{this.props.topicText}</a>
												<div className="extra">
													<FollowButton {...this.props.followButtonData}/>
												</div>
										</Content>
									</div>
					</div>
		);
	}
}

export default CardWrapper(TopicTeaserCard)
