import React from 'react';
import { each } from 'underscore';
import {
  Segment,
  Card,
  Item,
} from 'react-semantify';
import OpportunityTeaserCard from './OpportunityTeaserCard';
import { generateOpportunitiesMiniTeaserCards } from '../utils';
import { breakPointsDefaults } from '../../../defaults';


class SideBarSimilarOpportunitiesStatic extends React.Component {
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
    this.teaserArray = [];
    this.handleResize = this.handleResize.bind(this);
  }

  componentWillUpdate(nextProps) {
    const nextData = nextProps.componentData;
    if (nextData) {
      this.teaserArray = [];
      const opportunitiesArray = nextData;
      const tempPropsArray =
          generateOpportunitiesMiniTeaserCards(opportunitiesArray, this.state.mobileView);
      each(tempPropsArray, (props) => {
        this.teaserArray.push(props);
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
    const populated = this.teaserArray.length > 0;
    const self = this;

    function generateDOM() {
      let returnValue = null;
      if (populated) {
        returnValue = (
          <Card className="fluid recruiter-details-card">
            <Segment>
              <h4>Similar Opportunities</h4>
              <div className="ui divided items similar-opportunities">
              {
                 self.teaserArray.map((props, index) =>
                   <Item key={index}>
                     <OpportunityTeaserCard key={index} {...props} />
                   </Item>
                 )
              }
              </div>
            </Segment>
          </Card>
        );
      }
      return returnValue;
    }

    return (<div>
              {generateDOM()}
    </div>
      );
  }
}

SideBarSimilarOpportunitiesStatic.propTypes = {
  componentData: React.PropTypes.array,
  apiActions: React.PropTypes.object,
  opportunityId: React.PropTypes.any,
  apiCall: React.PropTypes.any,
};

export default SideBarSimilarOpportunitiesStatic;
