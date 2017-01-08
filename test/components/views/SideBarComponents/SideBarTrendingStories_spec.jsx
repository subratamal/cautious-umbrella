import React  from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {SideBarTrendingStories} from '../../../../src/components/views/SideBarComponents/SideBarTrendingStories'
import {story_mini_teaser} from '../../../test_constants'
import StoryMiniTeaserCard from '../../../../src/components/views/cards/StoryMiniTeaserCard'
import * as pageActions from '../../../../src/actions/homePage_actions'
import { Map, fromJS } from 'immutable' 
import {store} from '../../../testStore_creator';
import {Provider} from 'react-redux';
import {
	breakPointsDefaults
} from '../../../../src/defaults'

/*
1. Renders Container
2. Renders  List
3. Renders List Of SideBarTrendingPage

*/


const {renderIntoDocument, scryRenderedDOMComponentsWithTag,scryRenderedDOMComponentsWithClass, 
Simulate, findRenderedComponentWithClass}
= ReactAddonsTestUtils;

//Creating a container to test the components 
let container = document.createElement('div');

describe("Sidebar Trending Stories", () => {
	it('renders Container', () =>{
		window.innerWidth = breakPointsDefaults.tablet + 1;
		let sideBarTrendingStoriesContainer = ReactDOM.render(
			<Provider store = {store}>
				<SideBarTrendingStories reducerName='homePage' componentName = 'sideBarTrendingStories' apiActions = {pageActions}></SideBarTrendingStories>
			</Provider>
			, container); 
		let teaser = [story_mini_teaser]
		store.dispatch(pageActions.setSuccessState(teaser,'sideBarTrendingStories'));

		let containers = scryRenderedDOMComponentsWithClass(sideBarTrendingStoriesContainer,'segment');
		expect(containers.length).to.be.equal(1);	
		ReactDOM.unmountComponentAtNode(container);	
	})
	it('renders List for bigger devices', () =>{
		window.innerWidth = breakPointsDefaults.tablet + 1;
		let sideBarTrendingStoriesContainer = ReactDOM.render(
			<Provider store = {store}>
				<SideBarTrendingStories reducerName='homePage' componentName = 'sideBarTrendingStories' apiActions = {pageActions}></SideBarTrendingStories>
			</Provider>
			, container); 
		let teaser = [story_mini_teaser]
		store.dispatch(pageActions.setSuccessState(teaser,'sideBarTrendingStories'));
		let containers = scryRenderedDOMComponentsWithClass(sideBarTrendingStoriesContainer,'list');
		expect(containers.length).to.be.equal(1);	
		ReactDOM.unmountComponentAtNode(container);	
	})

	it('renders Grid  for small devices', () =>{
		window.innerWidth = breakPointsDefaults.tablet - 1;
		let sideBarTrendingStoriesContainer = ReactDOM.render(
			<Provider store = {store}>
				<SideBarTrendingStories reducerName='homePage' componentName = 'sideBarTrendingStories' apiActions = {pageActions}></SideBarTrendingStories>
			</Provider>
			, container); 
		let teaser = [story_mini_teaser]
		store.dispatch(pageActions.setSuccessState(teaser,'sideBarTrendingStories'));
		
		
		let containers = scryRenderedDOMComponentsWithClass(sideBarTrendingStoriesContainer,'grid');
		expect(containers.length).to.be.equal(1);	
		ReactDOM.unmountComponentAtNode(container);	
	})

})