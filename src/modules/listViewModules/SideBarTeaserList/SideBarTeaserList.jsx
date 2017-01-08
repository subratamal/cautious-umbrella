import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment, Item, Grid, Column } from 'react-semantify';
import _ from 'underscore';
import ProfileTeaserCard from '../../profile';
import { breakPointsDefaults } from '../../../defaults';
import { generateProfileTeaserCards } from '../../../utils/cardsGenerators/profileCardsGenerator';
import { isServer, isUnitTesting } from '../../../utils/utils';
import { makeGetRecordsSelectors } from './selector';

class SideBarTeaserList extends React.Component {
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
    // Override the state.mobileView incase of server rendering.
    if (isServer() && !isUnitTesting()) {
      this.state = {
        mobileView: false,
      };
    }
    // Show loader till data is recieved
    this.teaserArray = [];
    this.handleResize = this.handleResize.bind(this);
  }

  componentWillMount() {
    const { componentData,type } = this.props;
    if (componentData) {
      switch (type) {
        case 'profile': {
          const tempPropsArray = generateProfileTeaserCards(componentData, this.state.mobileView);
          _.each(tempPropsArray, (props) => {
            this.successFlag = true;
            this.teaserArray.push(<ProfileTeaserCard {...props} />);
          });
          break;
        }
        default:
          console.error('No Entity Type Provided for teasers');
          this.teaserArray = [];
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    if (!this.props.componentData) {
      this.props.apiActions();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if ((nextProps.isLoggedIn != this.props.isLoggedIn)) {
      if (nextProps.isLoggedIn && !nextProps.isAccountVerified) {

      } else {
        this.props.reloadActions.reloadComponent(this.props.componentName, this.props.parentComponent);
        const actions = this.props.apiActions;

        // call action to fetch the data
        actions.fetchProfiles();
      }
    } else {
      const { componentData, type } = nextProps;
      if (componentData) {
        switch (type) {
          case 'profile': {
            const tempPropsArray = generateProfileTeaserCards(componentData, this.state.mobileView);
            _.each(tempPropsArray, (props) => {
              this.successFlag = true;
              this.teaserArray.push(<ProfileTeaserCard {...props} />);
            });
            break;
          }
          default:
            console.error('No Entity Type Provided for teasers');
            this.teaserArray = [];
        }
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
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

  createBodyContent(teaserArray, mobileFlag) {
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
      <div className="ui  divided items">
        {teaserArray.map((card, index) => (
            <Item key={index}>
              {card}
          </Item>
          )
        )
      }
      </div>
    );
  }

  render() {
    const self = this;
    function generateDOM() {
      if (self.props.componentData) {
        return (
					<Segment className="side-bar side-bar-pages">
     				<h4 className="ui header">{self.props ? self.props.tabTitle : ''}</h4>
							{this.createBodyContent(self.teaserArray, self.state.mobileView)}
					</Segment>
				);
      }
      return null;
    }
    return generateDOM();
  }
}


function mapStateToProps(state, props) {
  const recordSelector = makeGetRecordsSelectors();
  const metaPropName = `${props.pageName}${props.view}${props.type}`;
  const selectorProps = {
    metaPropName,
    type: props.type,
  };
  return {
    componentData: recordSelector(state, selectorProps),
    isLoggedIn: state.get('reducer').get('isLoggedIn'),
    isAccountVerified: state.get('account').get('verification').get('isVerified'),
  };
}

export default connect(mapStateToProps)(SideBarTeaserList);
