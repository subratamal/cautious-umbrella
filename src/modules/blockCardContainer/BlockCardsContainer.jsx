import React, { PropTypes } from 'react';
import { Grid, Column } from 'react-semantify';
import { connect } from 'react-redux';
import _ from 'underscore';
import PageBlockCard from '../pages/components/PageBlockCard';
import OpportunityBlockCard from '../opportunities/components/OpportunityBlockCard';
import { makeBlockCardSelector } from './selectors';
import { generatePageBlockCardsProps } from '../pages/utils';
import { generateOpportunitiesBlockCards } from '../opportunities/utils';

export class BlockCardContainerStatic extends React.Component {
  constructor(props) {
    super(props);
    this.cardArray = [];
    this.noRecrodsFlag = false;
  }
  componentWillMount() {
    const { componentData } = this.props;
    if (componentData) {
      this.cardArray = [];
      this.noRecrodsFlag = false;

      if (this.props.type === 'pages') {
        const tempPropsArray = generatePageBlockCardsProps(componentData);
        _.each(tempPropsArray, (props) => {
          this.cardArray.push(<PageBlockCard {...props} />);
        });
      } else if (this.props.type === 'opportunities') {
        const tempPropsArray = generateOpportunitiesBlockCards(componentData);
        _.each(tempPropsArray, (props) => {
          this.cardArray.push(<OpportunityBlockCard {...props} />);
        });
      }
    }
  }

  componentDidMount() {
    const { componentData } = this.props;
    if (!componentData || !componentData.length) {
      this.props.apiActions();
    }
  }
  componentWillUpdate(nextProps) {
    if ((nextProps.isLoggedIn !== this.props.isLoggedIn)) {
      this.props.apiActions();
    }
    const { componentData } = nextProps;
    if (componentData) {
      this.cardArray = [];
      this.noRecrodsFlag = false;

      if (nextProps.type === 'pages') {
        const tempPropsArray = generatePageBlockCardsProps(componentData);
        _.each(tempPropsArray, (props) => {
          this.cardArray.push(<PageBlockCard {...props} />);
        });
      } else if (nextProps.type === 'opportunities') {
        const tempPropsArray = generateOpportunitiesBlockCards(componentData);
        _.each(tempPropsArray, (props) => {
          this.cardArray.push(<OpportunityBlockCard {...props} />);
        });
      }
    }
  }

  render() {
    const self = this;
    function generateDOM() {
      if (self.props.componentData) {
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

BlockCardContainerStatic.PropTypes = {
  componentData: PropTypes.array,
  apiActions: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  reloadActions: PropTypes.object,
  type: PropTypes.string,
};

function mapStateToProps(state, props) {
  const recordSelector = makeBlockCardSelector();
  const metaPropName = `${props.pageName}${props.view}`;
  const selectorProps = {
    metaPropName,
  };
  return {
    isLoggedIn: state.get('reducer').get('isLoggedIn'),
    isAccountVerified: state.get('account').get('verification').get('isVerified'),
    componentData: recordSelector(state, selectorProps),
  };
}

export const BlockCardContainer = connect(mapStateToProps)(BlockCardContainerStatic);
