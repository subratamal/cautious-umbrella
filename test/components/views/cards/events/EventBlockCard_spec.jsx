import React  from 'react';
import ReactDOM, {unmountComponentAtNode as unMount} from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import EventBlockCard from '../../../../../src/components/views/cards/events/EventBlockCard'
import {eventBlockCardValues} from '../../../../test_constants'
import * as pageActions from '../../../../../src/actions/discoverPage_actions'
import {store} from '../../../../testStore_creator';
import {Provider} from 'react-redux';
import {event_entity_data} from '../../../../storeData/block_card_data.js'

/*
1. Renders Card Container
1. Renders Image
2. Renders Primary Text 
3. Renders Secondary text
4. Renders Event Mini Teaser
5. Renders Card with provided classes
*/

const {renderIntoDocument, scryRenderedDOMComponentsWithTag,scryRenderedDOMComponentsWithClass, 
Simulate, findRenderedComponentWithClass}
= ReactAddonsTestUtils;

//Creating a container to test the components 
var container = document.createElement('div');

afterEach = () => {
	unMount(container)
}
store.dispatch(pageActions.setSuccessState([event_entity_data],'DiscoverEvents'));


describe("Event Block Card ", () => {
	it('renders Card Container', () =>{
		var eventBlock = ReactDOM.render(<Provider store = {store}><EventBlockCard {...eventBlockCardValues} ></EventBlockCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(eventBlock,'card');
		expect(containers.length).to.be.equal(1);	
	})
	it('renders Image', () =>{
		var eventBlock = ReactDOM.render(<Provider store = {store}><EventBlockCard {...eventBlockCardValues} ></EventBlockCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithTag(eventBlock,'img');
		expect(containers.length).to.be.above(0);	
	})
	it('renders Primary Text', () =>{
		var eventBlock = ReactDOM.render(<Provider store = {store}><EventBlockCard {...eventBlockCardValues}></EventBlockCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithTag(eventBlock,'h5');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(eventBlockCardValues.event.primaryText)	
	})
	it('renders  Secondary Text', () =>{
		var eventBlock = ReactDOM.render(<Provider store = {store}><EventBlockCard {...eventBlockCardValues}></EventBlockCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(eventBlock,'location');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(eventBlockCardValues.event.secondaryText)	
	})
	it('renders Event Mini Teaser', () =>{
		var eventBlock = ReactDOM.render(<Provider store = {store}><EventBlockCard {...eventBlockCardValues}></EventBlockCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(eventBlock,'mini-teaser');
		expect(containers.length).to.be.equal(1);	
	})

	it('renders Card with provided classes', () =>{
		var eventBlock = ReactDOM.render(<Provider store = {store}><EventBlockCard {...eventBlockCardValues}></EventBlockCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(eventBlock,eventBlockCardValues.event.cardClassesApplied);
		expect(containers.length).to.be.equal(1);	
	})
})
