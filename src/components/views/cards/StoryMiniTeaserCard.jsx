/*Page Card Mini Teaser*/
import React from 'react'
import {
Item,
Content,
Card
} from 'react-semantify';

import CardWrapper from './CardWrapper'
import {pageThumbnail} from '../../../defaults'

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

class StoryMiniTeaserCard extends React.Component {
	constructor() {
		super()
		this.imageFetchFailed = this.imageFetchFailed.bind(this)
	}

	componentWillMount(){
		let image;
		image = this.props.imageSource ? this.props.imageSource : pageThumbnail;

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
		let textClasses = "ui primary-text " + textClass;
		return (
			<div className="ui items mini-teaser page-min-teaser">
				<Item>
						<a className="ui mini image" href={this.props.imageOnClickLink} target="_blank">
						<img className="ui medium rounded image" src={this.state.imageSource} onError={this.imageFetchFailed}/>
						</a>
					<Content>
							<a href={this.props.primaryTextOnClickLink} className={textClasses} target="_blank">{this.props.primaryText}</a>
							<div className="meta secondary-text location">
								<div>{this.props.secondaryText}</div>
							</div>
					</Content>
				 </Item>
			</div>
		)
	}
}

export default CardWrapper(StoryMiniTeaserCard)
