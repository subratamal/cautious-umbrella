import React , {Component, PropTypes} from 'react'
import {
	Button,
	Icon,
	Item,
	Content,
	Card,
	Grid,
	Column
} from 'react-semantify';
import { breakPointsDefaults } from '../../../defaults'
/*
Properties -
imageSource: Cover image of event
primaryText: header of featured event
secondaryTextOne: active label of featured event
secondaryTextTwo: location of featured event
buttonText: cta button text
activeLabel: active state of event
imageOnClickLink: cover image click
primaryTextOnClickLink: primary text click
*/

import {InteractivityCard} from './InteractivityCard';
import ProfileMiniTeaserCard from './ProfileMiniTeaserCard';

class EventFeaturedCard extends React.Component {
	constructor() {
		super();
		this.state = {windowWidth: window.innerWidth};
	}
	render() {
		let mastHead = this.props.event.imageSource;
		let bgimage = {
			backgroundImage: "url("+ mastHead + ")"
		};
		// Handle grid classes.
		let featuredCardStackable = (this.state.windowWidth <= breakPointsDefaults.largeMobileDevice) ? 'stackable' : '';
		return (
			<Card className={"big-feature-card " + featuredCardStackable + " fluid grid"}>
				<div className="row">
					<a href={this.props.event.imageOnClickLink} className="ui image ten wide computer eight wide tablet eight wide mobile column bg-img" style={bgimage} target="_blank">
					</a>
					<div className="six wide computer eight wide tablet eight wide mobile column description">
						<div className="ui stackable fluid vertically padded grid">
							<div className="ui fluid card hide-block-shadow description">
								<div className="content">
									<div className="ui items">
										<Item>
											<Content>
												<Grid>
													<div className="column row">
														<Column className="wide">
															<h3 className="event-header">
																<a href={this.props.event.primaryTextOnClickLink} target="_blank">{this.props.event.primaryText}</a>
															</h3>
														</Column>
													</div>
												</Grid>
												<div className="meta">
													<p className="single-ellipsis"> {this.props.event.secondaryTextOne} </p>
													<p className="single-ellipsis event-location"> {this.props.event.secondaryTextTwo} </p>
												</div>
											</Content>
										</Item>
									</div>
								</div>
								<div className="extra content big-feature-card-footer">
									<div className="ui fluid card hide-block-shadow">
										<ProfileMiniTeaserCard {...this.props.profileMiniTeaserCardContent} isWrapped = {false}/>
										<InteractivityCard {...this.props.interactivityCardContent}/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Card>
		)
	}
}
EventFeaturedCard.propTypes = {
	"event": React.PropTypes.shape({
		buttonText: React.PropTypes.string,
		imageSource : React.PropTypes.oneOfType ([
			React.PropTypes.string,
			React.PropTypes.object,
		]),
		secondaryImageSource : React.PropTypes.oneOfType ([
			React.PropTypes.string,
			React.PropTypes.object,
		]),
		primaryText : React.PropTypes.string,
		secondaryTextOne : React.PropTypes.string,
		secondaryTextTwo : React.PropTypes.string,
		miniTeaserContent: React.PropTypes.object,
		interactivityCardContent: React.PropTypes.object
	})
};

export default EventFeaturedCard
