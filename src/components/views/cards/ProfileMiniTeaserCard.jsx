/* Page Card Mini Teaser*/
import React, { PropTypes } from 'react';
import {
Item,
Content,
Card,
} from 'react-semantify';
import CardWrapper from './CardWrapper';
import { profilePictureThumbnail } from '../../../defaults';

/*
Properties -
imageOnClickLink - url to be navigated on image click
imageSource - image src
primaryText -  primary text
primaryTextOnClickLink - url to be navigated on primary text click
secondaryText - secondary text
secondaryTextOnClickLink - url to be navigated on secondary text click
isWrapped - boolean to add or remove card wrapper (default = true)
*/

/*
class .mini-teaser is wirtten in item.overrides which
- Makes the mini teaser responsive as required
- Overrides default behaviour added by semnatic mobile device dimentions
*/

const ProfileMiniTeaserCard = props => {
  let image;
  image = props.imageSource ? props.imageSource : profilePictureThumbnail;
  let state = { imageSource: image };
/* If image recived from api call failed, render default image*/
  const imageFetchFailed = () => {
    state = { imageSource: profilePictureThumbnail };
  };

  return (
    <div className="ui items mini-teaser profile-min-teaser">
      <Item>
        <a className="ui mini image" href={props.imageOnClickLink} target="_blank" id={props.userProfile === true ? 'id-header-profile-teaser-display-picture' : ''}>
          <img className="ui medium rounded image" src={state.imageSource} onError={imageFetchFailed} />
        </a>
        <Content>
          <a href={props.primaryTextOnClickLink} target="_blank" id={props.userProfile === true ? 'id-header-profile-teaser-name' : ''} className={props.userProfile === true ? 'ui primary-text' : 'ui singleline-ellipsis primary-text'}>{props.primaryText}</a>
            {props.userProfile === true ?
              <a href={props.secondaryTextOnClickLink} target="_blank" className="meta singleline-ellipsis location">
                {props.secondaryText}
              </a>
              :
              <div className="meta singleline-ellipsis location">
                {props.secondaryText}
              </div>
            }
      </Content>
    </Item>
</div>
);
};

ProfileMiniTeaserCard.propTypes = {
  imageOnClickLink: PropTypes.string,
  primaryTextOnClickLink: PropTypes.string,
  secondaryTextOnClickLink: PropTypes.string,
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
  userProfile: PropTypes.bool,
};

export default CardWrapper(ProfileMiniTeaserCard);
