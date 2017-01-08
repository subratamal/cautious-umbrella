import React, { PropTypes } from 'react';
import { Content } from 'react-semantify';
import CardWrapper from '../../../components/views/cards/CardWrapper';
import { profilePictureThumbnail } from '../../../defaults';
import { ConnectButton } from '../../connect/ConnectButton';


class ProfileTeaserCard extends React.Component {
  constructor() {
    super();
    this.imageFetchFailed = this.imageFetchFailed.bind(this);
  }

  componentWillMount() {
    let image;
    image = this.props.imageSource ? this.props.imageSource : profilePictureThumbnail;
    this.setState({
      imageSource: image,
    });
  }
  /* If image recived from api call failed, render default image*/
  imageFetchFailed() {
    this.setState({
      imageSource: profilePictureThumbnail,
    });
  }

  render() {
    return (
      <div className="ui items mini-teaser">
              <div className="item">
                <a className="ui mini image" href={this.props.imageOnClickLink}>
                <img className="ui medium rounded image" src={this.props.imageSource} />
                </a>
                <Content>
                  <a href={this.props.primaryTextOnClickLink} className="singleline-ellipsis">{this.props.primaryText}</a>
                  <div className="meta singleline-ellipsis">
                    <a href={this.props.secondaryTextOnClickLink}>{this.props.secondaryText}</a>
                  </div>
                  <div className="extra">
                  <ConnectButton {...this.props.connectButtonData} />
                  </div>
                </Content>
              </div>
        </div>
      );
  }
}

ProfileTeaserCard.propTypes = {
  imageOnClickLink: PropTypes.string.isRequired,
  imageSource: PropTypes.string.isRequired,
  primaryTextOnClickLink: PropTypes.string.isRequired,
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
  isWrapped: PropTypes.bool.isRequired,
  connectButtonData: PropTypes.object.isRequired,
};

export default CardWrapper(ProfileTeaserCard);
