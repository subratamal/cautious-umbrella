import React  from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {InteractivityCardStatic as InteractivityCard} from '../../../../src/components/views/cards/InteractivityCard'
import {interactivityCardValues,interactivity_card_props} from '../../../test_constants'
import {store} from '../../../testStore_creator';
import {Provider} from 'react-redux';
import {fromJS} from 'immutable'


/*
1. Renders icon
2. check save text
*/

const {renderIntoDocument, scryRenderedDOMComponentsWithTag,scryRenderedDOMComponentsWithClass, 
Simulate, findRenderedComponentWithClass}
= ReactAddonsTestUtils;

//Creating a container to test the components 
var container = document.createElement('div');


describe("Interactivity Card", () => {
	it('renders Save ', () =>{
		let cardData = fromJS({
			saved : '0'
		})
		var profileTeaser = ReactDOM.render(<Provider store = {store}><InteractivityCard {...interactivity_card_props} cardData = {cardData}></InteractivityCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(profileTeaser,'item');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(interactivityCardValues.saveText);	
		var tagName = scryRenderedDOMComponentsWithClass(profileTeaser,'save');
		expect(tagName.length).to.be.equal(1);
		ReactDOM.unmountComponentAtNode(container);	
	})
	it('renders Saved  ', () =>{
		let cardData = fromJS({
			saved : '1'
		})
		var profileTeaser = ReactDOM.render(<Provider store = {store}><InteractivityCard {...interactivity_card_props} cardData = {cardData}></InteractivityCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(profileTeaser,'item');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(interactivityCardValues.savedText);	
		var tagName = scryRenderedDOMComponentsWithClass(profileTeaser,'active save');
		expect(tagName.length).to.be.equal(1);
		ReactDOM.unmountComponentAtNode(container);	
	})

	it('renders recommend ', () =>{
		let cardData = fromJS({
			recommended : '0',

		})
		var profileTeaser = ReactDOM.render(<Provider store = {store}><InteractivityCard {...interactivity_card_props}  cardData = {cardData}></InteractivityCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(profileTeaser,'item');
		expect(containers.length).to.be.above(0);
		var tagName = scryRenderedDOMComponentsWithClass(profileTeaser,' empty heart');
		expect(tagName.length).to.be.equal(1);
		ReactDOM.unmountComponentAtNode(container);	
	})
	it('renders recommended  ', () =>{
		let cardData = fromJS({
			recommended : '1',
			recommend_count : '2'
		})
		var profileTeaser = ReactDOM.render(<Provider store = {store}><InteractivityCard {...interactivity_card_props} cardData = {cardData}></InteractivityCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(profileTeaser,'item');
		expect(containers.length).to.be.above(0);
		expect(containers[1].textContent).to.be.equal('2');	
		var tagName = scryRenderedDOMComponentsWithClass(profileTeaser,'active heart');
		expect(tagName.length).to.be.equal(1);
		ReactDOM.unmountComponentAtNode(container);	
	})
})