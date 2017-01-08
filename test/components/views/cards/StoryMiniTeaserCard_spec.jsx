import React  from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import StoryMiniTeaserCard from '../../../../src/components/views/cards/StoryMiniTeaserCard'
import {miniTeaserCardValues} from '../../../test_constants'

/*
1. Renders Wrapped Mini Teaser
2. Renders Mini Teaser Without Wrap
3. Renders Image
4. Renders Primary Text
5. Renders Secondary Text
*/

const {renderIntoDocument, scryRenderedDOMComponentsWithTag,scryRenderedDOMComponentsWithClass, 
Simulate, findRenderedComponentWithClass}
= ReactAddonsTestUtils;

//Creating a container to test the components 
var container = document.createElement('div');

describe("Story Mini Teaser Card", () => {
	it('renders Wrapped Mini Teaser', () =>{
		var storyMiniTeaserCard = ReactDOM.render(<StoryMiniTeaserCard isWrapped={true}></StoryMiniTeaserCard>, container);
		var containers = scryRenderedDOMComponentsWithClass(storyMiniTeaserCard,'card');
		expect(containers.length).to.be.equal(1);	
		ReactDOM.unmountComponentAtNode(container);	
	})
	it('renders Wrapper By Default', () =>{
		var storyMiniTeaserCard = ReactDOM.render(<StoryMiniTeaserCard></StoryMiniTeaserCard>, container);
		var containers = scryRenderedDOMComponentsWithClass(storyMiniTeaserCard,'card');
		expect(containers.length).to.be.equal(1);	
		ReactDOM.unmountComponentAtNode(container);	
	})
	it('renders Mini Teaser Without Wrap', () =>{
		var storyMiniTeaserCard = ReactDOM.render(<StoryMiniTeaserCard isWrapped={false} ></StoryMiniTeaserCard>, container);
		var containers = scryRenderedDOMComponentsWithClass(storyMiniTeaserCard,'card');
		expect(containers.length).to.be.equal(0);	
		ReactDOM.unmountComponentAtNode(container);	
	})

	it('renders Image ', () =>{
		var storyMiniTeaserCard = ReactDOM.render(<StoryMiniTeaserCard ></StoryMiniTeaserCard>, container);
		var containers = scryRenderedDOMComponentsWithTag(storyMiniTeaserCard,'img');
		expect(containers.length).to.be.equal(1);
		ReactDOM.unmountComponentAtNode(container);	
	})

	it('renders Primary Text ', () =>{
		var storyMiniTeaserCard = ReactDOM.render(<StoryMiniTeaserCard primaryText={miniTeaserCardValues.primaryText}></StoryMiniTeaserCard>, container);
		var containers = scryRenderedDOMComponentsWithClass(storyMiniTeaserCard,'primary-text');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(miniTeaserCardValues.primaryText)	
		ReactDOM.unmountComponentAtNode(container);	
	})
	it('renders Secondary Text ', () =>{
		var storyMiniTeaserCard = ReactDOM.render(<StoryMiniTeaserCard secondaryText={miniTeaserCardValues.secondaryText}></StoryMiniTeaserCard>, container);
		var containers = scryRenderedDOMComponentsWithClass(storyMiniTeaserCard,'secondary-text');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(miniTeaserCardValues.secondaryText)	
		ReactDOM.unmountComponentAtNode(container);	
	})

})