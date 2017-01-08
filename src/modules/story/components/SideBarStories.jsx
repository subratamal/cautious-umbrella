import React, { PropTypes } from 'react';
import _ from 'underscore';
import { Segment, List, Item, Grid, Column } from 'react-semantify';
import StoryMiniTeaserCard from './StoryMiniTeaserCard';
import { breakPointsDefaults } from '../../../defaults';
import { generateStoryMiniTeaserCards } from '../../../utils/cardsGenerators/miniTeaserCardsGenerator';
import { isServer, isUnitTesting } from '../../../utils/utils';

export default class SideBarStories extends React.Component {
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

  componentWillMount() {
    const componentData = this.props.componentData;
    if (componentData) {

      const tempPropsArray = generateStoryMiniTeaserCards(componentData, this.state.mobileView);
      _.each(tempPropsArray, (props) => {
        this.successFlag = true;
        this.teaserArray.push(<StoryMiniTeaserCard {...props} />);
      });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    const { componentData } = this.props;
    if (!componentData || !componentData.length) {
      this.props.apiActions();
    }
  }

  componentWillUpdate(nextProps) {
    const componentData = nextProps.componentData;
    if (componentData) {
      this.teaserArray = [];
      const tempPropsArray = generateStoryMiniTeaserCards(componentData, this.state.mobileView);
      _.each(tempPropsArray, (props) => {
        this.successFlag = true;
        this.teaserArray.push(<StoryMiniTeaserCard {...props} />);
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    if (window.innerWidth <= breakPointsDefaults.tablet && this.state.mobileView === false) {
      this.setState({
        mobileView: true,
      });
    } else if (window.innerWidth > breakPointsDefaults.tablet && this.state.mobileView === true) {
      this.setState({
        mobileView: false,
      });
    }
  }

  render() {
    /* based on condition return grid or list*/
    const createBodyContent = (teaserArray, mobileFlag) => {
      if (mobileFlag) {
        return (
					<Grid className="two column stackable">
						{teaserArray.map((card, index) => (
                <Column key={index} className="eight wide side-bar-page-card">
                	{card}
                </Column>
							)
						)
					}
          </Grid>
				);
      }
      return (
						<List className="divided side-bar-pages relaxed">
							{teaserArray.map((card, index) => (<Item key={index}>{card}</Item>))}
            </List>
					);
    };
    const self = this;
    function generateDOM() {
      if (self.props.componentData) {
        return (
						<Segment className="side-bar side-bar-pages">
							<h4 className="ui header">Stories</h4>
							<span>
								{createBodyContent(self.teaserArray, self.state.mobileView)}
							</span>
						</Segment>
					);
      }
      return null;
    }
    return generateDOM();
  }
}

SideBarStories.propTypes = {
  componentData: PropTypes.array,
  apiActions: PropTypes.object,
};
