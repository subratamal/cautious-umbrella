import React  from 'react';
import ReactDOM from 'react-dom';
import {
  scryRenderedComponentsWithType as withType,
  scryRenderedDOMComponentsWithClass as withClass,
  scryRenderedDOMComponentsWithTag as WithTag
} from 'react-addons-test-utils';
import {expect} from 'chai';
import {SideBarSlider} from '../../../../src/components/views/SideBarComponents/SideBarSlider'
import * as homePageActions from '../../../../src/actions/homePage_actions'
import { Map, fromJS } from 'immutable' 
import {store} from '../../../testStore_creator';
import {Provider} from 'react-redux';
import {event_block_card_teaser} from '../../../test_constants'
/*
1. Renders Container
2. Renders header
3. Renders Topic 
*/

//Creating a container to test the components 
var container = document.createElement('div');

afterEach = () => {
  unMount(container)
}
describe("Sidebar Slider", () => {
	// afterEach(function() {
	// 	ReactDOM.unmountComponentAtNode(container);	
	// });
	it('renders Slider', () =>{
		var sideBarSlider = ReactDOM.render(
			<Provider store = {store}>
				<SideBarSlider reducerName='homePage' componentName = 'SideBarSlider' apiActions = {homePageActions} apiCall="fetchSidebarSliderData"></SideBarSlider>
			</Provider>
			, container);  
		let teaser = [event_block_card_teaser]
		store.dispatch(homePageActions.setSuccessState(teaser,'SideBarSlider'));
		let slider = withClass(sideBarSlider,'slick-dots-custom');
		expect(slider.length).to.equal(1);	
	})

	it('renders Title ', () =>{
		let sideBarSlider = ReactDOM.render(
			<Provider store = {store}>
				<SideBarSlider  reducerName='homePage' componentName = 'SideBarSlider' apiActions = {homePageActions} apiCall="fetchSidebarSliderData"></SideBarSlider>
			</Provider>
			, container); 
		let teaser = [event_block_card_teaser]
		store.dispatch(homePageActions.setSuccessState(teaser,'SideBarSlider'))
		let header = withClass(sideBarSlider,'ui header');
		expect(header.length).to.equal(1);
	})
})