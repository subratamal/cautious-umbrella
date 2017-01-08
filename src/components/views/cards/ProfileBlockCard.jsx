import React, { PropTypes } from 'react';
import { Button, Content, Card } from 'react-semantify';
import { BlockCardCoverImage } from '../../../defaults';

/*
Properties -
imageOnClickLink - url to be navigated on image click
imageSource - image src
secondaryImageSource: secondary image
primaryText -  primary text
primaryTextOnClickLink - url to be navigated on primary text click
secondaryText - secondary text
secondaryTextOnClickLink - url to be navigated on secondary text click
buttonText -CTA button
cardClasses - array of classes on card
*/

class ProfileBlockCard extends React.Component {
  componentWillMount() {
    /* If imageSource is not passed render default image for card cover */
    if (!this.props.imageSource) {
      this.imageSource = BlockCardCoverImage;
    } else {
      this.imageSource = this.props.imageSource;
    }
    /* Add classes passed in props to a variable */
    if (this.props.cardClasses) {
			/* default class applied to profile block card for identification */
      this.cardClasses = 'block-card profile-block-card';
      this.props.cardClasses.map((cssClass) => {
        this.cardClasses += ` ${cssClass}`;
        return null;
      });
    }
  }
  render() {
    return (
      <Card className={this.cardClasses}>
        <div className="ui move reveal image">
          <Content className="cover-image">
            <a className="ui centered image cover-image-link" href={this.props.imageOnClickLink} >
              <img className="ui fluid image" src={this.imageSource} alt="" />
            </a>
          </Content>
        </div>
        <Content>
          <div className="ui center aligned container">
            <a
              className="ui centered tiny image"
              href={this.props.imageOnClickLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="ui centered medium rounded image"
                src={this.props.secondaryImageSource}
                alt=""
              />
            </a>
            <div className="ui list">
              <a
                href={this.props.primaryTextOnClickLink}
                className="singleline-ellipsis"
                target="_blank"
                rel="noopener noreferrer"
              >
              {this.props.primaryText}</a>
              <div className="meta singleline-ellipsis location">
                <a
                  href={this.props.secondaryTextOnClickLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >{this.props.secondaryText}</a>
              </div>
            </div>
            <Button className="mini red inverted">{this.props.buttonText}</Button>
          </div>
        </Content>
      </Card>
  );
  }
}

ProfileBlockCard.propTypes = {
  buttonText: PropTypes.isRequired,
  secondaryText: PropTypes.isRequired,
  primaryText: PropTypes.isRequired,
  imageOnClickLink: PropTypes.isRequired,
  cardClasses: PropTypes.isRequired,
  primaryTextOnClickLink: PropTypes.isRequired,
  secondaryImageSource: PropTypes.isRequired,
  imageSource: PropTypes.isRequired,
  secondaryTextOnClickLink: PropTypes.isRequired,
};

export default ProfileBlockCard;
