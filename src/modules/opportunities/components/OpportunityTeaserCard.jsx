import React from 'react';
import { Link } from 'react-router';
import {
  Content,
} from 'react-semantify';
import { pageThumbnail } from '../../../defaults';
import { ApplyButton } from '../../apply/ApplyButton';

import cardWrapper from './CardWrapper';

class OpportunityTeaserCard extends React.Component {
  constructor(props) {
    super(props);
    this.imageFetchFailed = this.imageFetchFailed.bind(this);
  }
  componentWillMount() {
    const image = this.props.imageSource ? this.props.imageSource : pageThumbnail;
    this.setState({
      imageSource: image,
    });
  }
  imageFetchFailed() {
    this.setState({
      imageSource: pageThumbnail,
    });
  }
  render() {
    const self = this;
    return (
      <div className="ui items mini-teaser page-mini-teaser">
        <div className="item">
          <Content>
            <Link to={this.props.primaryTextOnClickLink}>
              <div>{this.props.primaryText}</div>
            </Link>
            <div className="meta secondary-text location singleline-ellipsis">
              <a href={this.props.secondaryTextOnClickLink} target="_blank">
                  {this.props.secondaryText}
              </a>
            </div>
            <div>
              <ApplyButton {...this.props.interactivityCardData} />
            </div>
          </Content>
        </div>
      </div>
		);
  }
}

OpportunityTeaserCard.propTypes = {
  imageSource: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  primaryTextOnClickLink: React.PropTypes.string,
  primaryText: React.PropTypes.string,
  secondaryText: React.PropTypes.string,
};

export default cardWrapper(OpportunityTeaserCard);
