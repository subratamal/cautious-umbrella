import React, { Component, PropTypes } from 'react';
import {
Button,
Icon,
Item,
Content,
Card,
Grid,
Column,
} from 'react-semantify';
import { Link } from 'react-router';
import { ApplyButton } from '../../apply/ApplyButton';
import currencies from '../../../../static/currencies';
import { PageMiniTeaserCard } from '../../pages';
import OpportunityInteractions from '../../opportunities/components/OpportunityInteractions';
import { breakPointsDefaults } from '../../../defaults';
/*
Properties -
imageSource: Cover image of event
primaryText: header of featured event
secondaryTextOne: active label of featured event
secondaryTextTwo: location of featured event
buttonText: cta button text
activeLabel: active state of event
imageOnClickLink: cover image click
primaryTextOnClickLink: primary text click
*/


const OpportunityFeaturedCard = props => {
  const state = { windowWidth: window.innerWidth };
  const mastHead = props.opportunity.imageSource;
  const bgimage = {
    backgroundImage: 'url(' + mastHead + ')',
  };
  const isMobileLandscape = (state.windowWidth <= breakPointsDefaults.largeMobileDevice) ? 1 : 0;
  // Handle grid classes.
  const featuredCardStackable = isMobileLandscape ? 'stackable' : '';
  let currencyIcon = '$';
  const payment = props.opportunity.details.compensation ? props.opportunity.details.compensation.value : 'Unpaid';
  if (payment !== 'Unpaid') {
    currencyIcon = currencies[props.opportunity.details.compensation.currency].symbol;
  }
  return (
      <Card className={'opportunity-featured-card big-feature-card ' + featuredCardStackable + ' fluid grid'}>
        <div className="row">
          <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column description">
            <div className="ui stackable fluid vertically padded grid">
              <div className="ui fluid card hide-block-shadow description">
                <div className="content">
                  <div className="ui items">
                    <Item>
                      <Content>
                        <Grid>
                          <div className="column row">
                            <Column className="wide">
                              <h3 className="event-header">
                                <Link to={props.opportunity.primaryTextOnClickLink}>{props.opportunity.primaryText}</Link>
                              </h3>
                            </Column>
                          </div>
                        </Grid>
                        <div className="meta">
                          <p className="single-ellipsis"> {props.opportunity.secondaryText} </p>
                        </div>
                      </Content>
                    </Item>
                    { !isMobileLandscape ? <div className="ui hidden divider" /> : null }
                    <div className="ui grid">
                      <div className="opportunity-icon-details">
                        <Icon className="clock" />
                        <h5>
                          <div> {props.opportunity.details.deadline} </div>
                        </h5>
                      </div>
                      <div className="opportunity-icon-details">
                        <div className="icon">{currencyIcon}</div>
                        <h5>
                          <div className="single-ellipsis"> {payment} </div>
                        </h5>
                      </div>
                        { props.opportunity.details.vacancies ?
                          <div className="opportunity-icon-details">
                            <Icon className="users" />
                            <h5>
                                <div className="single-ellipsis"> {`${props.opportunity.details.vacancies} Vacancies`} </div>
                              </h5>
                          </div>
                          :
                          null
                        }
                    </div>
                  </div>
                </div>
                { isMobileLandscape ? <div className="ui hidden divider" /> : null }
                <div className="big-feature-card-footer">
                  <Grid className="horizontally padded">
                    <div className="row">
                      <div className={isMobileLandscape ? 'sixteen wide column' : 'twelve wide column' }>
                        <PageMiniTeaserCard {...props.profileMiniTeaserCardContent} isWrapped={false} />
                      </div>
                      <div className={isMobileLandscape ? 'sixteen wide column' : 'four wide column' }>
                        <ApplyButton large {...props.interactivityCardContent} />
                      </div>
                    </div>
                  </Grid>
                  <div className="ui fluid extra card hide-block-shadow">
                    <OpportunityInteractions {...props.interactivityCardContent} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
};
OpportunityFeaturedCard.propTypes = {
  opportunities: React.PropTypes.shape({
    buttonText: React.PropTypes.string,
    imageSource: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
    secondaryImageSource: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
    primaryText: React.PropTypes.string,
    secondaryTextOne: React.PropTypes.string,
    secondaryTextTwo: React.PropTypes.string,
    miniTeaserContent: React.PropTypes.object,
    interactivityCardContent: React.PropTypes.object,
  }),
};

export default OpportunityFeaturedCard;
