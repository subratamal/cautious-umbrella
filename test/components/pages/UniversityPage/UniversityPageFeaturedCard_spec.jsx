import React  from 'react';
import ReactDOM, {unmountComponentAtNode as unMount} from 'react-dom';
import {
  scryRenderedComponentsWithType as withType,
  scryRenderedDOMComponentsWithClass as withClass,
  scryRenderedDOMComponentsWithTag as WithTag
} from 'react-addons-test-utils';
import {expect} from 'chai';
import UniversityPageFeaturedCard from '../../../../src/components/pages/UniversityPage/UniversityPageFeaturedCard'
import generatePropsData from '../../../../src/examples/ExampleCard'
import {Provider} from 'react-redux';
import {store} from '../../../testStore_creator';
import * as pageActions from '../../../../src/actions/universityPage_actions'
import {pageFeaturedCardCardValues} from '../../../test_constants'

import {page_entity_data} from '../../../storeData/block_card_data.js'

/*
1. Renders Primary text
2. Renders Secondary text
3. Reders Button text
*/

store.dispatch(pageActions.setSuccessState([ { data : [page_entity_data] } ],'PrimaryContentSlider'))



let container = document.createElement('div');

afterEach = () => {
  unMount(container)
}
describe("University Page Featured Card", () => {
	it('renders Primary Text ', () =>{
		let page_featured = ReactDOM.render(<Provider store = {store}><UniversityPageFeaturedCard {...pageFeaturedCardCardValues} /></Provider>, container);
		let header = withClass(page_featured,'header');
		expect(header.length).to.equal(1);
	})

	it('renders  Secondary Text ', () =>{
		let page_featured = ReactDOM.render(<Provider store = {store}><UniversityPageFeaturedCard {...pageFeaturedCardCardValues} /></Provider>, container);
		let subHeader = withClass(page_featured,'location');
		expect(subHeader.length).to.equal(1);
	})

})
