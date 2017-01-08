import React from 'react';
import { Segment, List, Divider, Item, Grid, Column } from 'react-semantify';
import StoryMiniTeaserCard from '../../views/cards/StoryMiniTeaserCard';
import { breakPointsDefaults } from '../../../defaults';
import _ from 'underscore';
import { generateStoryMiniTeaserCards } from '../../../utils/cardsGenerators/miniTeaserCardsGenerator';
import { connect } from 'react-redux';
import { isServer, isUnitTesting } from '../../../utils/utils';

export class SideBarStoriesStatic extends React.Component {
/* on load acquire window side and accordingly set a flag on state */
  constructor(props) {
    super(props);
    if (window.innerWidth <= breakPointsDefaults.tablet) {
      this.state = {
        mobileView: true,
      };
    } else {
      this.state = {
        mobileView: false,
      };
    }

    if (isServer() && !isUnitTesting()) {
      this.state = {
        mobileView: false,
      };
    }

    this.teaserArray = [];
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize(e) {
    if (window.innerWidth <= breakPointsDefaults.tablet && this.state.mobileView == false) {
      this.setState({
        mobileView: true,
      });
    } else if (window.innerWidth > breakPointsDefaults.tablet && this.state.mobileView == true) {
      this.setState({
        mobileView: false,
      });
    }
  }

  componentWillMount() {
    this.successFlag = this.props.componentData.get('success');
    this.error = this.props.componentData.get('error');

    if (!this.error) {
      const nextData = this.props.componentData.get('data');

      if (nextData && this.teaserArray.length === 0) {
        if (nextData && !nextData.isEmpty()) {
          const pagesArray = nextData.toJS();
          const tempPropsArray = generateStoryMiniTeaserCards(pagesArray, this.state.mobileView);
          _.each(tempPropsArray, (props) => {
            this.teaserArray.push(<StoryMiniTeaserCard {...props} />);
          });
        } else {
          this.emptyFlag = true;
        }
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    this.successFlag = nextProps.componentData.get('success');
    this.error = nextProps.componentData.get('error');

    if (!this.error) {
      const previousData = this.props.componentData.get('data');
      const nextData = nextProps.componentData.get('data');

      if (nextData && (!nextData.equals(previousData) || this.teaserArray.length === 0)) {
        if (!nextData.isEmpty()) {
          const pagesArray = nextData.toJS();
          const tempPropsArray = generateStoryMiniTeaserCards(pagesArray, this.state.mobileView);
          _.each(tempPropsArray, (props) => {
            this.teaserArray.push(<StoryMiniTeaserCard {...props} />);
          });
        } else {
          this.emptyFlag = true;
        }
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    const actions = this.props.apiActions;
// call action to fetch the data
    actions.fetchSideBarStories();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const self = this;
    function generateDOM() {
      if (self.successFlag) {
        if (self.emptyFlag) {
          return (null);
        } else {
          return (
						<Segment className="side-bar side-bar-pages">
							<h4 className="ui header">Stories</h4>
							<span>
								{createBodyContent(self.teaserArray, self.state.mobileView)}
							</span>
						</Segment>
					);
        }
      }
      return null;
    }

		/* based on condition return grid or list*/
    let createBodyContent = function (teaserArray, mobileFlag) {
      if (mobileFlag) {
        return (
					<Grid className="two column stackable">
						{teaserArray.map(function (card, index) {
  						return (
								<Column key={index} className="eight wide side-bar-page-card">
                	{card}
                </Column>
							);
						})
					}
          </Grid>
				);
      } else {
        	return (
						<List className="divided side-bar-pages relaxed">
							{teaserArray.map(function (card, index) {
  							return (
									<Item key={index}>
                		{card}
                	</Item>
								);
							})
						}
            </List>
					);
      	}
    };

    return generateDOM();
  }
}


function mapStateToProps(state, props) {
  return {
    componentData: state.get(props.reducerName).get(props.componentName),
  };
}

export const SideBarStories = connect(mapStateToProps)(SideBarStoriesStatic);
