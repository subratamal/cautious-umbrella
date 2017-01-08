import React  from 'react';
import ReactDOM, {unmountComponentAtNode as unMount} from 'react-dom';
import {
  scryRenderedComponentsWithType as withType,
  scryRenderedDOMComponentsWithClass as withClass,
  scryRenderedDOMComponentsWithTag as WithTag,
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
  Simulate
} from 'react-addons-test-utils';
import {expect} from 'chai';
import {Provider} from 'react-redux';
import {store} from '../../../testStore_creator';
import  EventSearchForm from '../../../../src/components/pages/EventsPage/EventSearchForm'
import {setResultHeader} from '../../../../src/actions/eventsPage_actions'
import * as pageActions from '../../../../src/actions/eventsPage_actions'

let container = document.createElement('div');

afterEach = () => {
  unMount(container)
}
describe("Events Search form", () => {
	it('renders form field with masthead', () =>{
		
	})

})
