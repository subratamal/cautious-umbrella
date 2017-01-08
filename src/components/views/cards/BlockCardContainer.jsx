import React from 'react'
import {
Grid,
Column,
Row
} from 'react-semantify'
import {
bindActionCreators
} from 'redux'
import api from '../../../api/api'
import { serverErrors } from '../../../constants/messagesConfig'
import StoryBlockCard from './StoryBlockCard';
import EventBlockCard from './events/EventBlockCard'
import PageBlockCard from './PageBlockCard'
import _ from 'underscore'
import {
generateStoryCardsProps,
generateEventCardsProps,
generatePageBlockCards
} from '../../../utils/cardsGenerators/blockCardsGenerator'
import {
connect
} from 'react-redux';
import * as reloadComponentActions from '../../../actions/reloadComponent_action'

/*
A container which renders an array card in a responsive manner
- renders 3 cards in a row for devices above tablet
- renders 2 cards for tablet
- renders 1 card for mobile

Properties -
	cardGeneratorFn -  a function which returns an array containing any of the Block Cards (Story,Page,Event,Profile)
	type - used for deciding which api call to make, "stories" "events"
*/
let componentName;
export class BlockCardContainerStatic extends React.Component {
constructor(props) {
	super(props);
	this.cardArray = [];
	this.noRecrodsFlag = false;
	this.resetFlag = false;
	this.callApi = this.callApi.bind(this);
}
componentDidUpdate(prevProps, prevState) {
	if(this.props.componentData && this.props.componentData.get('reset')){
		this.props.apiActions.reloadDefaultPages();

	}
}
componentWillUpdate(nextProps, nextState) {
	/*On login state change reload the component*/
	this.resetFlag = false;
	if ((nextProps.isLoggedIn != this.props.isLoggedIn)) {
		if(nextProps.isLoggedIn && !nextProps.isAccountVerified){

		}else{
			this.props.reloadActions.reloadComponent(this.props.componentName, this.props.parentComponent)
		this.callApi();
		}

	}
	if(nextProps.componentData && nextProps.componentData.get('reset')){
		this.resetFlag = true

	}
	if (nextProps.componentData && !nextProps.componentData.get('loader')) {

		this.successFlag = nextProps.componentData.get('success');
		this.error = nextProps.componentData.get('error');
		/*If no error compare new props tp previous ones and
		load if data changed or no data is present*/

		if (!this.error) {
			let previousData = (this.props.componentData ? this.props.componentData.get('data') : null);
			let nextData = nextProps.componentData.get('data');
			this.cardArray = [];
			if (nextData && (!nextData.equals(previousData) || this.cardArray.length === 0)) {

				if (!nextData.isEmpty()) {
					let propsArray = nextData.toJS();

					if (propsArray.Message && propsArray.Message === serverErrors.noRecords) {
						this.noRecrodsFlag = true;
					} else {
						// based on type of card, call util and create cards

						this.noRecrodsFlag = false;
						let {
							reducerName,
							componentName,
							parentComponent
						} = this.props

						if (nextProps.type === "stories") {
							let tempPropsArray = generateStoryCardsProps(propsArray, reducerName, componentName, parentComponent);

							_.each(tempPropsArray, (props) => {
								this.cardArray.push(<StoryBlockCard {...props} />)
							})
						} else if (nextProps.type === "events") {
							let tempPropsArray = generateEventCardsProps(propsArray, reducerName, componentName, parentComponent);
							_.each(tempPropsArray, (props) => {
								this.cardArray.push(<EventBlockCard {...props} />)
							})
						} else if (nextProps.type === "pages") {
							let tempPropsArray = generatePageBlockCards(propsArray, reducerName, componentName, parentComponent);


							_.each(tempPropsArray, (props) => {
								this.cardArray.push(<PageBlockCard {...props} />)
							})
						}
					}
				} else {
					this.emptyFlag = true;
				}

			}
		}
	}
}

componentWillMount() {
	let self = this;
	let cardsData = this.props.componentData.get('data');
	if (cardsData && !cardsData.isEmpty()) {
		self.successFlag = this.props.componentData.get('success');
		self.error = this.props.componentData.get('error');
		this.cardArray = [];
		let propsArray = cardsData.toJS();

		// if no records msg is recvd from server
		if (propsArray.Message && propsArray.Message === serverErrors.noRecords) {
			this.noRecrodsFlag = true;
		} else {
			// based on type of card, call util and create cards
			this.noRecrodsFlag = false;
			let {
				reducerName,
				componentName,
				parentComponent
			} = this.props
			if (this.props.type === "stories") {
				let tempPropsArray = generateStoryCardsProps(propsArray, reducerName, componentName, parentComponent);
				_.each(tempPropsArray, (props) => {
					this.cardArray.push(<StoryBlockCard {...props} />)
				})
			} else if (this.props.type === "events") {

				let tempPropsArray = generateEventCardsProps(propsArray, reducerName, componentName, parentComponent);
				_.each(tempPropsArray, (props) => {
					this.cardArray.push(<EventBlockCard {...props} />)
				})
			} else if (this.props.type === "pages") {
				let tempPropsArray = generatePageBlockCards(propsArray, reducerName, componentName, parentComponent);
				_.each(tempPropsArray, (props) => {
					this.cardArray.push(<PageBlockCard {...props} />)
				})
			}
		}

	}
}

callApi() {

	let actions = this.props.apiActions;
	if(typeof(this.props.apiCall)!='undefined'){
		actions[this.props.apiCall]()
	}else if (this.props.type === "stories") {
		actions.fetchBodyStories()
	} else if (this.props.type === "events") {
		actions.fetchBodyEvents();
	} else if (this.props.type === "pages") {
		actions.fetchPageBlock();
	}
}

componentDidMount() {
	let cardsData = this.props.componentData.get('data');
	let loader = this.props.componentData.get('loader');
	let actions = this.props.apiActions;
	if (!cardsData ) {
		if(!loader)
			this.callApi();
	} else {
		// if data tell reducer to set success
		actions.setSuccessState(cardsData.toJS(), this.props.componentName);
	}

}

render() {
	let self = this;

	function generateDOM() {
		if (self.successFlag && !self.props.componentData.get('loader')) {
			if (self.noRecrodsFlag) {
				return (<div>No Records Found.</div>)
			}
			else if(self.resetFlag){
				return null;
			}
			else {
				return (
					<div className="ui card-section block-card-container">
					<Grid className="three column doubling ">
		      		{self.cardArray.map(function(card,index){
		      			return (
		      				<Column key={index}>
		      					{card}
		      				</Column>
		      			)
		      		})}
		      	</Grid>
		      	</div>
				)
			}
		} else if (self.props.componentData.get('loader')) {
			return (<div className="ui active loader inline centered"></div>)
		}
		return null;
	}
	return (
		<div className="ui card-section block-card-container">
		 	{generateDOM()}
	    </div>

	)
}
}

function mapStateToProps(state, props) {
return {
		componentData: state.get(props.reducerName).get(props.componentName),
		isLoggedIn: state.get("reducer").get("isLoggedIn"),
        isAccountVerified: state.get("account").get("verification").get("isVerified")
	}

}


function mapDispatchToProps(dispatch) {
return {
	reloadActions: bindActionCreators(reloadComponentActions, dispatch)
	}
}
export const BlockCardContainer = connect(mapStateToProps, mapDispatchToProps)(BlockCardContainerStatic)
