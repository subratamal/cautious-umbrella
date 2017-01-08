import React from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import EventBlockCard from '../cards/events/EventBlockCard';
import {
	SideBarSliderSettings
} from '../../../defaults'
import {
	generateEventCardsProps
} from '../../../utils/cardsGenerators/blockCardsGenerator'
import {each} from 'underscore';
import {
	Segment
}  from 'react-semantify'

export class SideBarSliderStatic extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			showLoading: false,
			slidesArray: []
		}
		this.cardArray = []
	}

	shouldComponentUpdate(nextProps, nextState) {
		let self = this;
		
		
		let previousData = this.props.componentData.get('data');
		let nextData = nextProps.componentData.get('data');
		if (nextData && previousData != null){

		 if(nextData.equals(previousData) && (nextData.size != previousData.size)){
				return false
		 } 
		}
		return true;

	}

	componentWillMount() {
		let self = this;
		let sliderData = this.props.componentData.get('data');
		if(sliderData && !sliderData.isEmpty()){
			self.successFlag = this.props.componentData.get('success');
			self.error = this.props.componentData.get('error');			
		}
		let cardsData = this.props.componentData.get('data');
		if(cardsData && !cardsData.isEmpty()){
			self.successFlag = this.props.componentData.get('success');
			self.error = this.props.componentData.get('error');
			this.cardArray = [];
			let propsArray = cardsData.toJS();
			// if no records msg is recvd from server
			if (propsArray.Message && propsArray.Message === serverErrors.noRecords) {
				this.noRecrodsFlag = true;
			} 
			else {
				let {
							   reducerName,
								componentName,
								parentComponent 
							} = this.props
					this.noRecrodsFlag = false;
					let tempPropsArray = generateEventCardsProps(propsArray,reducerName,componentName,parentComponent);
					each(tempPropsArray, (props) => {
						self.cardArray.push(<EventBlockCard {...props} />)
				})
			}

		}
	}	

	componentDidMount() {
		let sliderData = this.props.componentData.get('data');
		if(!sliderData){
			let actions = this.props.apiActions;
			actions[this.props.apiCall]();
		}
	}

	componentWillUpdate(nextProps, nextState) {
		/*
			extract success or error from store props
		*/
		let self = this;
		this.successFlag = nextProps.componentData.get('success');
		/*If no error compare new props tp previous ones and load if data changed or no data is present*/
		let previousData = this.props.componentData.get('data');
		let nextData = nextProps.componentData.get('data');

		if (nextData && !nextData.equals(previousData)) {
			if (!nextData.isEmpty()) {
				this.cardArray = []
				let propsArray = nextData.toJS();
		// if no records msg is recvd from server
				if (propsArray.Message && propsArray.Message === serverErrors.noRecords) {
					this.noRecrodsFlag = true;
				} 
				else {
						this.noRecrodsFlag = false;
						let {
							   reducerName,
								componentName,
								parentComponent 
							} = this.props
						let tempPropsArray = generateEventCardsProps(propsArray,reducerName,componentName,parentComponent);
						each(tempPropsArray, (props) => {
							self.cardArray.push(<EventBlockCard {...props} />)
					})

				}
			}
		}
	}
	render() {
		let self = this;
		function generateDOM() {
			if (self.successFlag && !self.props.componentData.get('loader')) {
				if (self.emptyFlag ) {
					return (null)
				} 
				else if(self.noRecrodsFlag){
					return (<div>No Records Found.</div>)
				}

				else{
					return (
						<div className="side-bar sidebar-slider">
							<h4 className="ui header">Events and Opportunities</h4>
							<Slider {...SideBarSliderSettings} className="ui card slick-dots-custom slider-element-custom">
			      			{	self.cardArray.map(function(card,index){
			      					return 	(<div key={index}>{card}</div>)
			      				})
			      			}
			      			</Slider>
			      		</div>
					)
				}
			}
			return null;
		}
		return (
			<div>
			 	{generateDOM()}
		    </div>)
	}
}

function mapStateToProps(state,props) {
	return {
		componentData: state.get(props.reducerName).get(props.componentName)
	}
}

export const SideBarSlider = connect(mapStateToProps)(SideBarSliderStatic)

