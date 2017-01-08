import React  from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import StoryBlockCard from '../../../../src/components/views/cards/StoryBlockCard'
import {storyBlockCardValues} from '../../../test_constants'
import {store} from '../../../testStore_creator';
import * as pageActions from '../../../../src/actions/discoverPage_actions'
import {Provider} from 'react-redux';
import {story_entity_data} from '../../../storeData/block_card_data.js'
/*
1. Renders Card Container
1. Renders Image
2. Renders Primary Text
3. Renders Secondary text (Date)
4. Renders Profile Mini Teaser
5. Renders Card with provided classes
*/

const {renderIntoDocument, scryRenderedDOMComponentsWithTag,scryRenderedDOMComponentsWithClass,
Simulate, findRenderedComponentWithClass}
= ReactAddonsTestUtils;

store.dispatch(pageActions.setSuccessState([story_entity_data],'DiscoverStories'));
//Creating a container to test the components
var container = document.createElement('div');

describe("Story Block Card ", () => {
	it('renders Card Container', () =>{
		var storyBlock = ReactDOM.render(<Provider store = {store}><StoryBlockCard {...storyBlockCardValues}></StoryBlockCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(storyBlock,'card');
		expect(containers.length).to.be.equal(1);
		ReactDOM.unmountComponentAtNode(container);
	})
	it('renders Image', () =>{
		var storyBlock = ReactDOM.render(<Provider store = {store}><StoryBlockCard {...storyBlockCardValues}></StoryBlockCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithTag(storyBlock,'img');
		expect(containers.length).to.be.above(0);
		ReactDOM.unmountComponentAtNode(container);
	})
	it('renders Primary Text', () =>{
		storyBlockCardValues.secondaryText = storyBlockCardValues.secondaryTextUnixDate
		var storyBlock = ReactDOM.render(<Provider store = {store}><StoryBlockCard {...storyBlockCardValues}></StoryBlockCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithTag(storyBlock,'h5');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(storyBlockCardValues.primaryText)
		ReactDOM.unmountComponentAtNode(container);
	})
	it('renders  Secondary Text (Date) ', () =>{
		var storyBlock = ReactDOM.render(<Provider store = {store}><StoryBlockCard {...storyBlockCardValues}></StoryBlockCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(storyBlock,'date');
		expect(containers.length).to.be.above(0);
		expect(containers[0].textContent).to.be.equal(storyBlockCardValues.secondaryTextRenderedDate)
		ReactDOM.unmountComponentAtNode(container);
	})
	it('renders Profile Mini Teaser', () =>{
		var storyBlock = ReactDOM.render(<Provider store = {store}><StoryBlockCard {...storyBlockCardValues}></StoryBlockCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(storyBlock,'mini-teaser');
		expect(containers.length).to.be.equal(1);
		ReactDOM.unmountComponentAtNode(container);
	})

	it('renders Card with provided classes', () =>{
		var storyBlock = ReactDOM.render(<Provider store = {store}><StoryBlockCard {...storyBlockCardValues}></StoryBlockCard></Provider>, container);
		var containers = scryRenderedDOMComponentsWithClass(storyBlock,storyBlockCardValues.cardClassesApplied);
		expect(containers.length).to.be.equal(1);
		ReactDOM.unmountComponentAtNode(container);
	})


})
