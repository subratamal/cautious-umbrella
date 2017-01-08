import React  from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import ProfileBlockCard from '../../../../src/components/views/cards/ProfileBlockCard'
import {blockCardValues} from '../../../test_constants'

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

//Creating a container to test the components 
let container = document.createElement('div');

describe("Profile Block Card", () => {
	it('renders Image', () => {
		let profileBlock = ReactDOM.render(<ProfileBlockCard ></ProfileBlockCard>, container);
		let containers = scryRenderedDOMComponentsWithTag(profileBlock,'img');
		expect(containers.length).to.be.equal(2);	
		ReactDOM.unmountComponentAtNode(container);	
	})
	it('renders Primary Text ', () => {
		let profileBlock = ReactDOM.render(<ProfileBlockCard primaryText={blockCardValues.primaryText}></ProfileBlockCard>, container);
		let containers = scryRenderedDOMComponentsWithClass(profileBlock,'singleline-ellipsis');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(blockCardValues.primaryText)	
		ReactDOM.unmountComponentAtNode(container);	
	})
	it('renders  Secondary Text ', () => {
		let profileBlock = ReactDOM.render(<ProfileBlockCard secondaryText={blockCardValues.secondaryText}></ProfileBlockCard>, container);
		let containers = scryRenderedDOMComponentsWithClass(profileBlock,'singleline-ellipsis');
		expect(containers.length).to.be.above(0);
		expect(containers[1].textContent).to.be.equal(blockCardValues.secondaryText)	
		ReactDOM.unmountComponentAtNode(container);	
	})
	it('renders Button Text', () => {
		let profileBlock = ReactDOM.render(<ProfileBlockCard buttonText={blockCardValues.buttonText}></ProfileBlockCard>, container);
		let containers = scryRenderedDOMComponentsWithClass(profileBlock,'mini');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(blockCardValues.buttonText)	
		ReactDOM.unmountComponentAtNode(container);
	})
	it('applied classes on card', () => {
		let profileBlock = ReactDOM.render(<ProfileBlockCard cardClasses={blockCardValues.cardClasses}></ProfileBlockCard>, container);
		let containers = scryRenderedDOMComponentsWithClass(profileBlock,blockCardValues.cardClassesApplied);
		expect(containers.length).to.be.equal(1);
		ReactDOM.unmountComponentAtNode(container);
	})
})