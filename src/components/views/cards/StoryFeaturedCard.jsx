import React , {Component, PropTypes} from 'react'
import {
  Button,
  Icon,
  Item,
  Content,
  Card,
  Grid,
  Column
} from 'react-semantify';
import { breakPointsDefaults } from '../../../defaults'
/*
Properties -
imageSource: Cover image of story
primaryText: header of featured story
secondaryTextOne: active label of featured story
secondaryTextTwo: location of featured story
buttonText: cta button text
activeLabel: active state of story
imageOnClickLink: cover image click
primaryTextOnClickLink: primary text click
*/

import {InteractivityCard} from './InteractivityCard';
import ProfileMiniTeaserCard from './ProfileMiniTeaserCard';

class StoryFeaturedCard extends React.Component {
  constructor() {
    super();
    this.state = {windowWidth: window.innerWidth};
  }
  render() {
    let mastHead = this.props.story.imageSource;
    let bgimage = {
      backgroundImage: "url("+ mastHead + ")"
    };
    // Handle grid classes.
    let featuredCardStackable = (this.state.windowWidth <= breakPointsDefaults.largeMobileDevice) ? 'stackable' : '';

    return (
      <Card className={"big-feature-card " + featuredCardStackable + " fluid grid"}>
        <div className="row">
          <a href={this.props.story.imageOnClickLink} className="ui image ten wide computer eight wide tablet eight wide mobile column bg-img" style={bgimage} target="_blank">
          </a>
          <div className="six wide computer eight wide tablet eight wide mobile column description">
            <div className="ui stackable fluid vertically padded grid">
              <div className="ui fluid card hide-block-shadow description">
                <div className="content">
                  <div className="ui items">
                    <Item>
                      <Content>
                        <Grid>
                          <div className="column row">
                            <Column className="wide">
                              <h3 className="story-header">
                                <a href={this.props.story.primaryTextOnClickLink} target="_blank">
                                  {this.props.story.primaryText}
                                </a>
                              </h3>
                            </Column>
                          </div>
                        </Grid>
                        <div className="meta">
                          <p className="single-ellipsis"> {this.props.story.secondaryTextOne} </p>
                          <p className="single-ellipsis story-location"> {this.props.story.secondaryTextTwo} </p>
                        </div>
                      </Content>
                    </Item>
                  </div>

                </div>
                <div className="extra content big-feature-card-footer">
                  <div className="ui fluid card hide-block-shadow">
                    <ProfileMiniTeaserCard {...this.props.profileMiniTeaserCardContent} isWrapped = {false}/>
                    <InteractivityCard {...this.props.interactivityCardContent}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

StoryFeaturedCard.propTypes = {
  "story": React.PropTypes.shape({
    buttonText: React.PropTypes.string,
    imageSource : React.PropTypes.oneOfType ([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
    secondaryImageSource : React.PropTypes.oneOfType ([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
    primaryText : React.PropTypes.string,
    secondaryTextOne : React.PropTypes.string,
    secondaryTextTwo : React.PropTypes.string,
    interactivityCardContent: React.PropTypes.object
  })
};

export default StoryFeaturedCard
