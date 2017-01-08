import React  from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import PageMiniTeaserCard from '../../../../src/components/views/cards/PageMiniTeaserCard'
import {miniTeaserCardValues} from '../../../test_constants'

/*
1. Renders Wrapped Mini Teaser
2. Renders Wrapper By Default
3. Renders Mini Teaser Without Wrap
4. Renders Image
5. Renders Primary Text
6. Renders Secondary Text
*/

const {renderIntoDocument, scryRenderedDOMComponentsWithTag,scryRenderedDOMComponentsWithClass, 
Simulate, findRenderedComponentWithClass}
= ReactAddonsTestUtils;

//Creating a container to test the components 
var container = document.createElement('div');

describe("Page Mini Teaser Card", () => {
	it('renders Wrapped Mini Teaser', () =>{
		var pageMiniTeaserCard = ReactDOM.render(<PageMiniTeaserCard isWrapped={true}></PageMiniTeaserCard>, container);
		var containers = scryRenderedDOMComponentsWithClass(pageMiniTeaserCard,'card');
		expect(containers.length).to.be.equal(1);	
		ReactDOM.unmountComponentAtNode(container);	
	})
	it('renders Wrapper By Default', () =>{
		var pageMiniTeaserCard = ReactDOM.render(<PageMiniTeaserCard></PageMiniTeaserCard>, container);
		var containers = scryRenderedDOMComponentsWithClass(pageMiniTeaserCard,'card');
		expect(containers.length).to.be.equal(1);	
		ReactDOM.unmountComponentAtNode(container);	
	})
	it('renders Mini Teaser Without Wrap', () =>{
		var pageMiniTeaserCard = ReactDOM.render(<PageMiniTeaserCard isWrapped={false} ></PageMiniTeaserCard>, container);
		var containers = scryRenderedDOMComponentsWithClass(pageMiniTeaserCard,'card');
		expect(containers.length).to.be.equal(0);	
		ReactDOM.unmountComponentAtNode(container);	
	})

	it('renders Image ', () =>{
		var pageMiniTeaserCard = ReactDOM.render(<PageMiniTeaserCard ></PageMiniTeaserCard>, container);
		var containers = scryRenderedDOMComponentsWithTag(pageMiniTeaserCard,'img');
		expect(containers.length).to.be.equal(1);
		ReactDOM.unmountComponentAtNode(container);	
	})

	it('renders Primary Text ', () =>{
		var pageMiniTeaserCard = ReactDOM.render(<PageMiniTeaserCard primaryText={miniTeaserCardValues.primaryText}></PageMiniTeaserCard>, container);
		var containers = scryRenderedDOMComponentsWithClass(pageMiniTeaserCard,'primary-text');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(miniTeaserCardValues.primaryText)	
		ReactDOM.unmountComponentAtNode(container);	
	})
	it('renders Secondary Text ', () =>{
		var pageMiniTeaserCard = ReactDOM.render(<PageMiniTeaserCard secondaryText={miniTeaserCardValues.secondaryText}></PageMiniTeaserCard>, container);
		var containers = scryRenderedDOMComponentsWithClass(pageMiniTeaserCard,'secondary-text');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(miniTeaserCardValues.secondaryText)	
		ReactDOM.unmountComponentAtNode(container);	
	})

})