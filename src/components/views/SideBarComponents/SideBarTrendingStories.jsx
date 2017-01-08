import React from 'react'
import {
	Segment,
	List,
	Divider,
	Item,
	Grid,
	Column
} from 'react-semantify';
import StoryMiniTeaserCard from '../../views/cards/StoryMiniTeaserCard'
import {
	breakPointsDefaults
} from '../../../defaults'
import _ from 'underscore'
import {generateTrendingMiniTeaserCards} from '../../../utils/cardsGenerators/miniTeaserCardsGenerator'
import { connect } from 'react-redux';

export class SideBarTrendingStatic extends React.Component {
	/*on load acquire window side and accordingly set a flag on state */
	constructor(props) {
		super(props);
		if (window.innerWidth <= breakPointsDefaults.tablet) {
			this.state = {
				mobileView: true
			};
		} else {
			this.state = {
				mobileView: false
			};
		}
		//Show loader till data is recieved
		this.teaserArray = [];
		this.handleResize = this.handleResize.bind(this);
	}
	handleResize(e) {
		if (window.innerWidth <= breakPointsDefaults.tablet && this.state.mobileView == false) {
			this.setState({
				mobileView: true
			});
		} else if (window.innerWidth > breakPointsDefaults.tablet && this.state.mobileView == true) {
			this.setState({
				mobileView: false
			});
		}
	}

	componentWillUpdate(nextProps, nextState) {

		/*
			extract success or error from store props
		*/
		this.successFlag = nextProps.componentData.get('success');
		this.error = nextProps.componentData.get('error');
		/*If no error compare new props tp previous ones and load if data changed or no data is present*/
		if (!this.error) {
			let previousData = this.props.componentData.get('data');
			let nextData = nextProps.componentData.get('data');

			if (nextData && (!nextData.equals(previousData) || this.teaserArray.length === 0)) {
				if (!nextData.isEmpty()) {
					let pagesArray = nextData.toJS();
					let tempPropsArray = generateTrendingMiniTeaserCards(pagesArray, this.state.mobileView);
					_.each(tempPropsArray, (props) => {
						this.teaserArray.push(<StoryMiniTeaserCard {...props} showFullTextClass="showFullText"/>)
					})
				} else {
					this.emptyFlag = true;
				}

			}
		}
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		let actions = this.props.apiActions;
		// call action to fetch the data 
		actions.fetchTrendingStories();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	render() {

		let self = this
		function generateDOM() {
			if (self.successFlag) {
				if (self.emptyFlag) {
					return (null)
				} else {
					return (
						<Segment className="side-bar side-bar-pages">
							<h4 className="ui header">Trending in Campus Diaries</h4>
							<span>
								{createBodyContent(self.teaserArray,self.state.mobileView)}
							</span>
						</Segment>

					)
				}
			} 
			return null;
		}

		/*based on condition return grid or list*/
		let createBodyContent = function(teaserArray, mobileFlag) {
			if (mobileFlag) {
				return (
					<Grid className="two column stackable">
					{teaserArray.map(function(card, index) {
							return (
								<Column key={index} className="eight wide side-bar-page-card">
	                				{card}            		
	                			</Column>
							)
						})
					}
	            	</Grid>
				)
			} else {
				return (

					<List className="divided side-bar-pages relaxed">
					{teaserArray.map(function(card, index) {
							return (
								<Item key={index}>
	                				{card}           		
	                			</Item>
							)
						})
					}
            	</List>

				)
			}
		}

		return generateDOM();
	}
}



function mapStateToProps(state,props) {
	return {
		componentData: state.get(props.reducerName).get(props.componentName)
	}
}

export const SideBarTrendingStories = connect(mapStateToProps)(SideBarTrendingStatic)