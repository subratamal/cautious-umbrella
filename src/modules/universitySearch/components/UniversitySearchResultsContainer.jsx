import React, { PropTypes } from 'react';
import { Grid, Column } from 'react-semantify';
import { connect } from 'react-redux';
import _ from 'underscore';
// TODO need to import following  from individual module interfaces
import PageBlockCard from '../../pages/components/PageBlockCard';
import { generatePageBlockCardsProps } from '../../pages/utils';
import { makeGetSearchRecordsSelectors, getSearchLoader } from '../selectors';

class UniversitySearchResultsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.cardArray = [];
    this.noRecrodsFlag = false;
  }

  componentWillUpdate(nextProps) {
    const { componentData, searchLoader } = nextProps;
    this.cardArray = [];
    if (componentData && !searchLoader) {
      if (!componentData.length) {
        this.noRecrodsFlag = true;
      } else {
        this.noRecrodsFlag = false;
        const tempPropsArray = generatePageBlockCardsProps(componentData);
        _.each(tempPropsArray, (props) => {
          this.cardArray.push(<PageBlockCard {...props} />);
        });
      }
    }
  }

  componentWillMount() {
    const { componentData } = this.props;
    if (componentData) {
      this.cardArray = [];
      this.noRecrodsFlag = false;
      const tempPropsArray = generatePageBlockCardsProps(componentData);
      _.each(tempPropsArray, (props) => {
        this.cardArray.push(<PageBlockCard {...props} />);
      });
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

UniversitySearchResultsContainer.PropTypes = {
  componentData: PropTypes.array,
};

function mapStateToProps(state, props) {
  const recordsSelector = makeGetSearchRecordsSelectors();
  return {
    componentData: recordsSelector(state, props),
    searchLoader: getSearchLoader(state),
  };
}

export default connect(mapStateToProps)(UniversitySearchResultsContainer);
