import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {
Card,
Content,
} from 'react-semantify';
import ProfileMiniTeaserCard from './ProfileMiniTeaserCard';
import { createGeneralDateFormat } from '../../../utils/formatDate';
import { ApplyButton } from '../../apply/ApplyButton';
import OpportunityInteractions from './OpportunityInteractions';
import { blockCardCoverImage } from '../../../defaults';

class OpportunityBlockCard extends React.Component {
  constructor() {
    super();
    this.state = {
      showDefaultTillImageLoad: true,
    };
    this.imageFetchFailed = this.imageFetchFailed.bind(this);
  }

  componentWillMount() {
    /* If imageSource is not passed render default image for card cover*/
    if (this.props.imageSource) {
      this.setState({
        imageSource: this.props.imageSource,
      });
    } else {
      this.setState({
        imageSource: blockCardCoverImage,
      });
    }
    /* Default Card classes*/
    this.cardClasses = 'opportunity-block-card block-card centered fluid';

    /* Add classes passed in props to a variable*/
    if (this.props.cardClasses) {
      /* default class applied to story block card for identification */

      this.props.cardClasses.map((cssClass) => {
        this.cardClasses += ' ' + cssClass;
      });
    }
  }
  /* If image recived from api call failed, render default image*/
  imageFetchFailed() {
    this.setState({
      imageSource: blockCardCoverImage,
    });
  }

  render() {
    return (
        <Card className={this.cardClasses}>
            <Content>
              <h5 className="title-min-height">
                <Link to={this.props.primaryTextOnClickLink}>
                  {this.props.primaryText}
                </Link>
              </h5>
              <div className="ui items meta">
                <a
                  href={this.props.secondaryTextOnClickLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{this.props.secondaryText}</span>
                </a>
              </div>
              <div>
                <ApplyButton {...this.props.interactivityCardContent} />
              </div>
            </Content>
            <OpportunityInteractions {...this.props.interactivityCardContent} />
          </Card>
    );
  }
}

export default OpportunityBlockCard;
