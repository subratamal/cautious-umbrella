import React  from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import PageBlockCard from '../../../../src/components/views/cards/PageBlockCard'
import {pageBlockCardValues} from '../../../test_constants'
import {Provider} from 'react-redux';
import {store} from '../../../testStore_creator';
import * as pageActions from '../../../../src/actions/universityPage_actions'

import {page_entity_data} from '../../../storeData/block_card_data.js'

/*
1. Renders Image
2. Renders Primary Text
3. Renders Secondary Text
4. Renders Button Text
5. Applied classes on card
*/

const {renderIntoDocument, scryRenderedDOMComponentsWithTag,scryRenderedDOMComponentsWithClass,
Simulate, findRenderedComponentWithClass}
= ReactAddonsTestUtils;


store.dispatch(pageActions.setSuccessState([page_entity_data],'UniversityRecommended'));

//Creating a container to test the components
var container = document.createElement('div');

describe("Page Block Card", () => {
	it('renders Image', () =>{
		var pageBlock = ReactDOM.render(<Provider store = {store}><PageBlockCard {...pageBlockCardValues}></PageBlockCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithTag(pageBlock,'img');
		expect(containers.length).to.be.equal(2);	
		ReactDOM.unmountComponentAtNode(container);
	})
	it('renders Primary Text', () =>{
		var pageBlock = ReactDOM.render(<Provider store = {store}><PageBlockCard {...pageBlockCardValues}></PageBlockCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(pageBlock,'singleline-ellipsis');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(pageBlockCardValues.primaryText)
		ReactDOM.unmountComponentAtNode(container);
	})
	it('renders Secondary Text', () =>{
		var pageBlock = ReactDOM.render(<Provider store = {store}><PageBlockCard {...pageBlockCardValues}></PageBlockCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(pageBlock,'location');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(pageBlockCardValues.secondaryText)
		ReactDOM.unmountComponentAtNode(container);
	})
	it('applied classes on card', () => {
		var pageBlock = ReactDOM.render(<Provider store = {store}><PageBlockCard {...pageBlockCardValues}></PageBlockCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(pageBlock,pageBlockCardValues.cardClassesApplied);
		expect(containers.length).to.be.equal(1);
		ReactDOM.unmountComponentAtNode(container);
	})
})
