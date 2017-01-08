import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { SideBarEvents } from '../../../../src/components/views/SideBarComponents/SideBarEvents';
import { event_mini_teaser } from '../../../test_constants';
import EventMiniTeaserCard from '../../../../src/components/views/cards/events/EventMiniTeaserCard';
import * as pageActions from '../../../../src/actions/universityPage_actions';
import { store } from '../../../testStore_creator';
import { breakPointsDefaults } from '../../../../src/defaults';

/*
1. Renders Container
2. Renders  List
3. Renders List Of SideBarPagess
*/

const { renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass,
Simulate, findRenderedComponentWithClass }
= ReactAddonsTestUtils;

// Creating a container to test the components
const container = document.createElement('div');

describe('Sidebar Events', () => {
  it('renders Container', () => {
    window.innerWidth = breakPointsDefaults.tablet + 1;
    const sideBarEventsContainer = ReactDOM.render(
			<Provider store={store}>
			<SideBarEvents reducerName="universityPage" componentName="SideBarEvents" apiActions={pageActions}></SideBarEvents>
			</Provider>
			, container);
    const teaser = [event_mini_teaser];
    store.dispatch(pageActions.setSuccessState(teaser, 'SideBarEvents'));

    const containers = scryRenderedDOMComponentsWithClass(sideBarEventsContainer, 'segment');
    expect(containers.length).to.be.equal(1);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('renders List for bigger devices', () => {
    window.innerWidth = breakPointsDefaults.tablet + 1;
    const sideBarEventsContainer = ReactDOM.render(
			<Provider store={store}>
			  <SideBarEvents reducerName="universityPage" componentName="SideBarEvents" apiActions={pageActions} />
			</Provider>
			, container);

    const teaser = [event_mini_teaser];
    store.dispatch(pageActions.setSuccessState(teaser, 'SideBarEvents'));
    const containers = scryRenderedDOMComponentsWithClass(sideBarEventsContainer, 'list');
    expect(containers.length).to.be.equal(1);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('renders Grid  for small devices', () => {
    window.innerWidth = breakPointsDefaults.tablet - 1;
    const sideBarEventsContainer = ReactDOM.render(
			<Provider store={store}>
			<SideBarEvents reducerName="universityPage" componentName="SideBarEvents" apiActions={pageActions}></SideBarEvents>
			</Provider>
			, container);
    const teaser = [event_mini_teaser];
    store.dispatch(pageActions.setSuccessState(teaser, 'SideBarEvents'));

    const containers = scryRenderedDOMComponentsWithClass(sideBarEventsContainer, 'grid');
    expect(containers.length).to.be.equal(1);
    ReactDOM.unmountComponentAtNode(container);
  });
});
