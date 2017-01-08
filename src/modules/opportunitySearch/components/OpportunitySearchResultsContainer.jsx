import React, { PropTypes } from 'react';
import { Grid, Column } from 'react-semantify';
import { connect } from 'react-redux';
import _ from 'underscore';
// TODO need to import following  from individual module interfaces
import OpportunityBlockCard from '../../opportunities/components/OpportunityBlockCard';
import { generateOpportunitiesResultsBlockCards } from '../../opportunities/utils';
import { makeGetSearchRecordsSelectors, getSearchLoader } from '../selectors';

class OpportunitySearchResultsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.cardArray = [];
  }

  componentWillMount() {
    const { componentData } = this.props;
    if (componentData) {
      this.cardArray = [];
      const tempPropsArray = generateOpportunitiesResultsBlockCards(componentData);
      _.each(tempPropsArray, (props) => {
        this.cardArray.push(<OpportunityBlockCard {...props} />);
      });
    }
  }

  componentWillUpdate(nextProps) {
    const { componentData, searchLoader } = nextProps;
    this.cardArray = [];
    if (componentData && !searchLoader) {
      if (componentData.length) {
        const tempPropsArray = generateOpportunitiesResultsBlockCards(componentData);
        _.each(tempPropsArray, (props) => {
          this.cardArray.push(<OpportunityBlockCard {...props} />);
        });
      }
    }
  }

  render() {
    const self = this;
    function generateDOM() {
      if (self.props.searchLoader) {
        return (<div className="ui active loader inline centered" />);
      } else if (self.props.componentData && self.props.componentData.length) {
        return (
            <div className="ui card-section block-card-container">
              <Grid className="three column doubling ">
                {self.cardArray.map((card, index) => (
                    <Column key={index}>
                      {card}
                    </Column>
                  )
                )}
                </Grid>
            </div>
          );
      } else if (self.props.componentData && !self.props.componentData.length) {
        return (<div>No Records Found.</div>);
      }
      return null;
    }
    return (
      <div className="ui card-section block-card-container">
        {generateDOM()}
      </div>
    );
  }
}

OpportunitySearchResultsContainer.PropTypes = {
  componentData: PropTypes.array,
};

function mapStateToProps(state, props) {
  const recordsSelector = makeGetSearchRecordsSelectors();
  return {
    componentData: recordsSelector(state, props),
    searchLoader: getSearchLoader(state),
  };
}

export default connect(mapStateToProps)(OpportunitySearchResultsContainer);
