import React, { PropTypes } from 'react';
import { Grid, Column } from 'react-semantify';
import { connect } from 'react-redux';
import _ from 'underscore';
// TODO need to import following  from individual module interfaces
import PageBlockCard from '../pages/components/PageBlockCard';
import { generatePageBlockCardsProps } from '../pages/utils';

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
      if ((nextProps.isLoggedIn && nextProps.isAccountVerified) || !nextProps.isLoggedIn) {
        this.props.apiActions();
      }
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
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.get('reducer').get('isLoggedIn'),
    isAccountVerified: state.get('account').get('verification').get('isVerified'),
  };
}

export const BlockCardContainer = connect(mapStateToProps)(BlockCardContainerStatic);
