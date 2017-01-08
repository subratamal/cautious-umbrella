import React from 'react';
import ReactDOM from 'react-dom';
import ReactAddonsTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { SideBarPages } from '../../../../src/components/views/SideBarComponents/SideBarPages';
import { page_mini_teaser } from '../../../test_constants';
import PageMiniTeaserCard from '../../../../src/components/views/cards/PageMiniTeaserCard';
import * as discoverPageActions from '../../../../src/actions/discoverPage_actions';
import { Map, fromJS } from 'immutable';
import { store } from '../../../testStore_creator';
import { Provider } from 'react-redux';
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

describe('Sidebar Pages', () => {
  it('renders Container', () => {
    window.innerWidth = breakPointsDefaults.tablet + 1;
    const sideBarPagesContainer = ReactDOM.render(
<Provider store={store}>
<SideBarPages reducerName="discoverPage" componentName="SideBarPages" apiActions={discoverPageActions}></SideBarPages>
</Provider>
, container);
    const teaser = [page_mini_teaser];
    store.dispatch(discoverPageActions.setSuccessState(teaser, 'SideBarPages'));

    const containers = scryRenderedDOMComponentsWithClass(sideBarPagesContainer, 'segment');
    expect(containers.length).to.be.equal(1);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('renders List for bigger devices', () => {
    window.innerWidth = breakPointsDefaults.tablet + 1;
    const sideBarPagesContainer = ReactDOM.render(
<Provider store={store}>
<SideBarPages reducerName="discoverPage" componentName="SideBarPages" apiActions={discoverPageActions}></SideBarPages>
</Provider>
, container);
    const teaser = [page_mini_teaser];
    store.dispatch(discoverPageActions.setSuccessState(teaser, 'SideBarPages'));
    const containers = scryRenderedDOMComponentsWithClass(sideBarPagesContainer, 'divided');
    expect(containers.length).to.be.equal(1);
    ReactDOM.unmountComponentAtNode(container);
  });

  it('renders Grid for small devices', () => {
    window.innerWidth = breakPointsDefaults.tablet - 1;
    const sideBarPagesContainer = ReactDOM.render(
			<Provider store={store}>
				<SideBarPages reducerName="discoverPage" componentName="SideBarPages" apiActions={discoverPageActions}></SideBarPages>
			</Provider>
			, container);
    const teaser = [page_mini_teaser];
    store.dispatch(discoverPageActions.setSuccessState(teaser, 'SideBarPages'));


    const containers = scryRenderedDOMComponentsWithClass(sideBarPagesContainer, 'grid');
    expect(containers.length).to.be.equal(1);
    ReactDOM.unmountComponentAtNode(container);
  });
});
