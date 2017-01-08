import React, { PropTypes } from 'react';
import { Item, Content } from 'react-semantify';
import CardWrapper from '../../../components/views/cards/CardWrapper';
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

class ProfileMiniTeaserCard extends React.Component {
  constructor() {
    super();
    this.imageFetchFailed = this.imageFetchFailed.bind(this);
  }

  componentWillMount() {
    const image = this.props.imageSource ? this.props.imageSource : profilePictureThumbnail;
    this.setState({
      imageSource: image,
    });
  }
  imageFetchFailed() {
    this.setState({
      imageSource: profilePictureThumbnail,
    });
  }

  render() {
    return (
			<div className="ui items mini-teaser profile-min-teaser">
				<Item>
						<a className="ui mini image" href={this.props.imageOnClickLink} rel="noreferrer noopener" target="_blank" id={this.props.userProfile === true ? 'id-header-profile-teaser-display-picture' : ''}>
            <img className="ui medium rounded image" alt="" src={this.state.imageSource} onError={this.imageFetchFailed} />
						</a>
					<Content>
							<a href={this.props.primaryTextOnClickLink} rel="noreferrer noopener" target="_blank" id={this.props.userProfile === true ? 'id-header-profile-teaser-name' : ''} className={this.props.userProfile === true ? 'ui primary-text' : 'ui singleline-ellipsis primary-text'}>{this.props.primaryText}</a>
							{this.props.userProfile === true ?
								<a href={this.props.secondaryTextOnClickLink} rel="noreferrer noopener" target="_blank" className="meta singleline-ellipsis location">
									{this.props.secondaryText}
								</a>
								:
								<div className="meta singleline-ellipsis location">
									{this.props.secondaryText}
								</div>
							}
					</Content>
				 </Item>
			</div>
		);
  }
}

ProfileMiniTeaserCard.propTypes = {
  imageSource: PropTypes.string,
  imageOnClickLink: PropTypes.string,
  secondaryText: PropTypes.string,
  showFullTextClass: PropTypes.string,
  primaryTextOnClickLink: PropTypes.string,
  secondaryTextOnClickLink: PropTypes.string,
  primaryText: PropTypes.string,
  userProfile: PropTypes.bool,
};

export default CardWrapper(ProfileMiniTeaserCard);
