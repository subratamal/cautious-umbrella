import React  from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import {Card} from 'react-semantify';
import {expect} from 'chai';
import {BlockCardContainer} from '../../../../src/components/views/cards/BlockCardContainer'
import * as discoverPageActions from '../../../../src/actions/discoverPage_actions'
import {store} from '../../../testStore_creator';
import {Provider} from 'react-redux';

/*
1.Remders a card section
2.Renders Given Number of cards
*/

var cardGenerator = function () {
			var cardArray = [(<Card></Card>),(<Card></Card>),(<Card></Card>)];
			return cardArray;
		} 

const { renderIntoDocument, scryRenderedDOMComponentsWithTag,scryRenderedDOMComponentsWithClass, 
Simulate, findRenderedComponentWithClass }
= ReactAddonsTestUtils;

//Creating a container to test the components 
var container = document.createElement('div');

describe("Block Card Container ", () => {
	it('renders Card Section', () =>{
		var storyBlock = ReactDOM.render(<Provider store = {store}>
					<BlockCardContainer reducerName='discoverPage' componentName = 'DiscoverStories' cardGeneratorFn={cardGenerator} apiActions = {discoverPageActions}>
				</BlockCardContainer></Provider>, 
				container);
		var containers = scryRenderedDOMComponentsWithClass(storyBlock,'card-section');
		expect(containers.length).to.be.above(1);	
		ReactDOM.unmountComponentAtNode(container);	
	})
})