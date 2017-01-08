import React from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { SideBarProfiles } from '../../../../src/components/views/SideBarComponents/SideBarProfiles';
import { profile_mini_teaser } from '../../../test_constants';
import ProfileMiniTeaserCard from '../../../../src/components/views/cards/ProfileMiniTeaserCard';
import * as discoverPageActions from '../../../../src/actions/discoverPage_actions';
import { Map, fromJS } from 'immutable';
import { store } from '../../../testStore_creator';
import { Provider } from 'react-redux';
import {
breakPointsDefaults,
} from '../../../../src/defaults';

/*
1. Renders Container
2. Renders Header
3. Renders profile mini teaser
*/

const { renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass,
Simulate, findRenderedComponentWithClass }
= ReactAddonsTestUtils;

// Creating a container to test the components
const container = document.createElement('div');

describe('Sidebar Profiles', () => {
  afterEach(function () {
    ReactDOM.unmountComponentAtNode(container);
  });
  it('renders Container', () => {
    window.innerWidth = breakPointsDefaults.tablet + 1;
    const sideBarProfilesContainer = ReactDOM.render(
<Provider store={store}>
<SideBarProfiles reducerName="discoverPage" componentName="SideBarProfiles" apiActions={discoverPageActions}></SideBarProfiles>
</Provider>
, container);
    const teasers = [profile_mini_teaser];
    store.dispatch(discoverPageActions.setSuccessState(teasers, 'SideBarProfiles'));
    const containers = scryRenderedDOMComponentsWithClass(sideBarProfilesContainer, 'segment');
    expect(containers.length).to.be.equal(1);
    ReactDOM.unmountComponentAtNode(container);
  });
  it('renders header', () => {
    window.innerWidth = breakPointsDefaults.tablet + 1;
    const sideBarProfilesContainer = ReactDOM.render(
<Provider store={store}>
<SideBarProfiles tabTitle="People" reducerName="discoverPage" componentName="SideBarProfiles" apiActions={discoverPageActions}></SideBarProfiles>
</Provider>
, container);
    const teasers = [profile_mini_teaser];
    store.dispatch(discoverPageActions.setSuccessState(teasers, 'SideBarProfiles'));
    const containers = scryRenderedDOMComponentsWithClass(sideBarProfilesContainer, 'header');
    expect(containers.length).to.be.equal(1);
    expect(containers[0].textContent).to.be.equal('People');
    ReactDOM.unmountComponentAtNode(container);
  });
  it('renders success state', () => {
// checks if passed teaser is getting loaded on not
    const sideBarProfilesContainer = ReactDOM.render(
<Provider store={store}>
<SideBarProfiles reducerName="discoverPage" componentName="SideBarProfiles" apiActions={discoverPageActions}></SideBarProfiles>
</Provider>
, container);
    const teasers = [profile_mini_teaser];
    store.dispatch(discoverPageActions.setSuccessState(teasers, 'SideBarProfiles'));

    const containers = scryRenderedDOMComponentsWithClass(sideBarProfilesContainer, 'mini-teaser');
    expect(containers.length).to.be.equal(1);
    ReactDOM.unmountComponentAtNode(container);
  });
});
