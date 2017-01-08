import React  from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {SideBarStories} from '../../../../src/components/views/SideBarComponents/SideBarStories'
import {story_mini_teaser} from '../../../test_constants'
import StoryMiniTeaserCard from '../../../../src/components/views/cards/StoryMiniTeaserCard'
import * as pageActions from '../../../../src/actions/universityPage_actions'
import { Map, fromJS } from 'immutable' 
import {store} from '../../../testStore_creator';
import {Provider} from 'react-redux';
import {
	breakPointsDefaults
} from '../../../../src/defaults'

/*
1. Renders Container
2. Renders  List
3. Renders List Of SideBarPagess

*/


const {renderIntoDocument, scryRenderedDOMComponentsWithTag,scryRenderedDOMComponentsWithClass, 
Simulate, findRenderedComponentWithClass}
= ReactAddonsTestUtils;

//Creating a container to test the components 
var container = document.createElement('div');

describe("Sidebar Stories", () => {
	it('renders Container', () =>{
		window.innerWidth = breakPointsDefaults.tablet + 1;
		var sideBarStoriesContainer = ReactDOM.render(
			<Provider store = {store}>
				<SideBarStories reducerName='universityPage' componentName = 'SideBarStories' apiActions = {pageActions}></SideBarStories>
			</Provider>
			, container); 
		let teaser = [story_mini_teaser]
		store.dispatch(pageActions.setSuccessState(teaser,'SideBarStories'));

		var containers = scryRenderedDOMComponentsWithClass(sideBarStoriesContainer,'segment');
		expect(containers.length).to.be.equal(1);	
		ReactDOM.unmountComponentAtNode(container);	
	})
	it('renders List for bigger devices', () =>{
		window.innerWidth = breakPointsDefaults.tablet + 1;
		var sideBarStoriesContainer = ReactDOM.render(
			<Provider store = {store}>
				<SideBarStories reducerName='universityPage' componentName = 'SideBarStories' apiActions = {pageActions}></SideBarStories>
			</Provider>
			, container); 
		let teaser = [story_mini_teaser]
		store.dispatch(pageActions.setSuccessState(teaser,'SideBarStories'));
		var containers = scryRenderedDOMComponentsWithClass(sideBarStoriesContainer,'list');
		expect(containers.length).to.be.equal(1);	
		ReactDOM.unmountComponentAtNode(container);	
	})

	it('renders Grid  for small devices', () =>{
		window.innerWidth = breakPointsDefaults.tablet - 1;
		var sideBarStoriesContainer = ReactDOM.render(
			<Provider store = {store}>
				<SideBarStories reducerName='universityPage' componentName = 'SideBarStories' apiActions = {pageActions}></SideBarStories>
			</Provider>
			, container); 
		let teaser = [story_mini_teaser]
		store.dispatch(pageActions.setSuccessState(teaser,'SideBarStories'));
		
		
		var containers = scryRenderedDOMComponentsWithClass(sideBarStoriesContainer,'grid');
		expect(containers.length).to.be.equal(1);	
		ReactDOM.unmountComponentAtNode(container);	
	})

})