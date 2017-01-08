import React from 'react';
import {Provider} from 'react-redux';
import { expect } from 'chai';

import {
  scryRenderedComponentsWithType as WithType,
  scryRenderedDOMComponentsWithClass as WithClass,
  renderIntoDocument as render
} from 'react-addons-test-utils';
import * as homePageActions  from '../../../src/actions/homePage_actions'

import {store} from '../../testStore_creator';

import {ShareButtons} from 'react-share';
const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} = ShareButtons;

import ShareModal from '../../../src/components/views/ShareModal';
/*
  1. Should render Facebook , GooglePlus, Linkedin and Twitter share buttons
  2. Should render Share link url
*/

describe("Share Modal for home feed", () => {
	it('Should render Facebook , GooglePlus, Linkedin and Twitter share buttons', () => {
 		const share_modal  = render(
      <Provider store={store}>
        <ShareModal />
      </Provider>
 		)

 		const facebook_component = WithType(share_modal, FacebookShareButton);
    expect(facebook_component.length).to.equal(1);
    
    const googleplus_component = WithType(share_modal, GooglePlusShareButton);
    expect(googleplus_component.length).to.equal(1);
    
    const linkedin_component = WithType(share_modal, LinkedinShareButton);
    expect(linkedin_component.length).to.equal(1);
    
    const twitter_component = WithType(share_modal, TwitterShareButton);
    expect(twitter_component.length).to.equal(1);
 	});

  it('Should render Share link url', () => {
    let shareData = {
      heading: 'share modal',
      url: '#'
    };
    store.dispatch(homePageActions.setFeedShareData(shareData));
    const share_modal  = render(
      <Provider store={store}>
        <ShareModal />
      </Provider>
    )

    const shareLink = WithClass(share_modal, 'share-url');
    expect(shareLink.length).to.equal(1);
  });
})
