import React  from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import ProfileMiniTeaserCard from '../../../../src/components/views/cards/ProfileMiniTeaserCard'
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

describe("Profile Mini Teaser Card", () => {
	it('renders Wrapped Mini Teaser', () =>{
		var profileMiniTeaserCard = ReactDOM.render(<ProfileMiniTeaserCard isWrapped={true}></ProfileMiniTeaserCard>, container);
		var containers = scryRenderedDOMComponentsWithClass(profileMiniTeaserCard,'card');
		expect(containers.length).to.be.equal(1);	
		ReactDOM.unmountComponentAtNode(container);	
	})
	it('renders Wrapper By Default', () =>{
		var profileMiniTeaserCard = ReactDOM.render(<ProfileMiniTeaserCard></ProfileMiniTeaserCard>, container);
		var containers = scryRenderedDOMComponentsWithClass(profileMiniTeaserCard,'card');
		expect(containers.length).to.be.equal(1);	
		ReactDOM.unmountComponentAtNode(container);	
	})
	it('renders Mini Teaser Without Wrap', () =>{
		var profileMiniTeaserCard = ReactDOM.render(<ProfileMiniTeaserCard isWrapped={false} ></ProfileMiniTeaserCard>, container);
		var containers = scryRenderedDOMComponentsWithClass(profileMiniTeaserCard,'card');
		expect(containers.length).to.be.equal(0);	
		ReactDOM.unmountComponentAtNode(container);	
	})

	it('renders Image ', () =>{
		var profileMiniTeaserCard = ReactDOM.render(<ProfileMiniTeaserCard ></ProfileMiniTeaserCard>, container);
		var containers = scryRenderedDOMComponentsWithTag(profileMiniTeaserCard,'img');
		expect(containers.length).to.be.equal(1);
		ReactDOM.unmountComponentAtNode(container);	
	})

	it('renders Primary Text ', () =>{
		var profileMiniTeaserCard = ReactDOM.render(<ProfileMiniTeaserCard primaryText={miniTeaserCardValues.primaryText}></ProfileMiniTeaserCard>, container);
		var containers = scryRenderedDOMComponentsWithClass(profileMiniTeaserCard,'singleline-ellipsis');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(miniTeaserCardValues.primaryText)	
		ReactDOM.unmountComponentAtNode(container);	
	})
	it('renders Secondary Text ', () =>{
		var profileMiniTeaserCard = ReactDOM.render(<ProfileMiniTeaserCard secondaryText={miniTeaserCardValues.secondaryText}></ProfileMiniTeaserCard>, container);
		var containers = scryRenderedDOMComponentsWithClass(profileMiniTeaserCard,'singleline-ellipsis');
		expect(containers.length).to.be.above(0);
		expect(containers[1].textContent).to.be.equal(miniTeaserCardValues.secondaryText)	
		ReactDOM.unmountComponentAtNode(container);	
	})

})