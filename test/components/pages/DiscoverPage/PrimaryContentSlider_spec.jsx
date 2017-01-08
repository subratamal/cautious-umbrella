import React  from 'react';
import ReactDOM, {unmountComponentAtNode as unMount} from 'react-dom';
import {
  scryRenderedComponentsWithType as withType,
  scryRenderedDOMComponentsWithClass as withClass,
  scryRenderedDOMComponentsWithTag as WithTag
} from 'react-addons-test-utils';
import {expect} from 'chai';
import {PrimaryContentSlider} from '../../../../src/components/views/PrimaryContentSlider'
import * as discoverPageActions from '../../../../src/actions/discoverPage_actions'
import { Map, fromJS } from 'immutable' 
import {store} from '../../../testStore_creator';
import {Provider} from 'react-redux';
import {event_entity_data} from '../../../storeData/block_card_data.js'
import {story_entity_data} from '../../../storeData/block_card_data.js'

/*
1. Renders Title
2. Renders Slider
*/

let container = document.createElement('div');


store.dispatch(discoverPageActions.setSuccessState([ { data : [story_entity_data] }, {  data : [event_entity_data] } ],'PrimaryContentSlider'))

afterEach = () => {
  unMount(container)
}
describe("Primary Slider", () => {
	it('renders Slider', () =>{
		let content_slider = ReactDOM.render(
			<Provider store = {store}>
				<PrimaryContentSlider reducerName='discoverPage' componentName = 'PrimaryContentSlider' apiActions = {discoverPageActions} apiCall="fetchPrimarySliderContent"></PrimaryContentSlider>
			</Provider>
			, container);  
		
		let slider = withClass(content_slider,'featured-card-slider');
		expect(slider.length).to.equal(1);
	})

	it('renders Title ', () =>{
		let content_slider = ReactDOM.render(
			<Provider store = {store}>
				<PrimaryContentSlider  reducerName='discoverPage' componentName = 'PrimaryContentSlider' apiActions = {discoverPageActions} apiCall="fetchPrimarySliderContent"></PrimaryContentSlider>
			</Provider>
			, container); 
		
		let header = withClass(content_slider,'ui header');
		expect(header.length).to.equal(1);
	})

})
