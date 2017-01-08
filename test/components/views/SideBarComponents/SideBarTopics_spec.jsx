import React  from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {SideBarTopics} from '../../../../src/components/views/SideBarComponents/SideBarTopics'
import * as discoverPageActions from '../../../../src/actions/discoverPage_actions'
import { Map, fromJS } from 'immutable' 
import {store} from '../../../testStore_creator';
import {Provider} from 'react-redux';
/*
1. Renders Container
2. Renders header
3. Renders Topic 
*/

const {renderIntoDocument, scryRenderedDOMComponentsWithTag,scryRenderedDOMComponentsWithClass, 
Simulate, findRenderedComponentWithClass}
= ReactAddonsTestUtils;

//Creating a container to test the components 
var container = document.createElement('div');


describe("Sidebar Topics", () => {
	afterEach(function() {
		ReactDOM.unmountComponentAtNode(container);	
	});
	it('renders Container', () =>{
		var sideBarTopicsContainer = ReactDOM.render(
			<Provider store = {store}>
				<SideBarTopics reducerName='discoverPage' componentName = 'SideBarTopics' apiActions = {discoverPageActions}></SideBarTopics>
			</Provider>
			, container);  
		let topics = [{name : 'topic1', id : '123', type : 'topics'}];
		store.dispatch(discoverPageActions.setSuccessState(topics,'SideBarTopics'));
		var containers = scryRenderedDOMComponentsWithClass(sideBarTopicsContainer,'segment');
		expect(containers.length).to.be.equal(1);	
		
	})
	it('renders header', () =>{
		var sideBarTopicsContainer = ReactDOM.render(
			<Provider store = {store}>
				<SideBarTopics reducerName='discoverPage'  componentName = 'SideBarTopics' apiActions = {discoverPageActions}></SideBarTopics>
			</Provider>
			, container); 
		let topics = [{name : 'topic1', id : '123', type : 'topics'}];
		store.dispatch(discoverPageActions.setSuccessState(topics,'SideBarTopics')); 
		var containers = scryRenderedDOMComponentsWithClass(sideBarTopicsContainer,'header');
		expect(containers.length).to.be.equal(1);
		expect(containers[0].textContent).to.be.equal('Topics');	
		
	}) 
	it('renders success state', () =>{
		var sideBarTopicsContainer = ReactDOM.render(
			<Provider store = {store}>
				<SideBarTopics reducerName='discoverPage' componentName = 'SideBarTopics' apiActions = {discoverPageActions}></SideBarTopics>
			</Provider>
			, container);  
		let topics = [{name : 'topic1', id : '123', type : 'topics'}];
		store.dispatch(discoverPageActions.setSuccessState(topics,'SideBarTopics'));
		var containers = scryRenderedDOMComponentsWithClass(sideBarTopicsContainer,'button');
		expect(containers.length).to.be.equal(1);
	})
})