import React  from 'react';
import ReactDOM, {unmountComponentAtNode as unMount} from 'react-dom';
import {
  scryRenderedComponentsWithType as withType,
  scryRenderedDOMComponentsWithClass as withClass,
  scryRenderedDOMComponentsWithTag as WithTag
} from 'react-addons-test-utils';
import {expect} from 'chai';
import StoryFeaturedCard from '../../../../src/components/views/cards/StoryFeaturedCard'
import {storyFeaturedCardValues} from '../../../test_constants'
import * as pageActions from '../../../../src/actions/discoverPage_actions'
import {store} from '../../../testStore_creator';
import {Provider} from 'react-redux';
import {event_entity_data} from '../../../storeData/block_card_data.js'
import {story_entity_data} from '../../../storeData/block_card_data.js'

/*
1. Renders Primary text
2. Renders Secondary text
3. Reders Button text
*/

let container = document.createElement('div');
store.dispatch(pageActions.setSuccessState([ { data : [story_entity_data] }, {  data : [event_entity_data] } ],'PrimaryContentSlider'))

afterEach = () => {
  unMount(container)
}
describe("Story Featured Card", () => {
	it('renders Primary Text ', () =>{
		let story_featured = ReactDOM.render(<Provider store = {store}><StoryFeaturedCard {...storyFeaturedCardValues} /></Provider>, container);
		let header = withClass(story_featured,'story-header');
		expect(header.length).to.equal(1);
	})

	it('renders  Secondary Text ', () =>{
		let story_featured = ReactDOM.render(<Provider store = {store}><StoryFeaturedCard {...storyFeaturedCardValues} /></Provider>, container);
		let subHeader = withClass(story_featured,'story-location');
		expect(subHeader.length).to.equal(1);
	})
})
