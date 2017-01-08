/* Side Bar Pages Component
- Renders a list of ProfileMiniTeaserCard
*/
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment, Item, Grid, Column } from 'react-semantify';
import _ from 'underscore';

import ProfileTeaserCard from '../../views/cards/ProfileTeaserCard';
import { breakPointsDefaults } from '../../../defaults';
import { generateProfileTeaserCards } from '../../../utils/cardsGenerators/teaserCardsGenerator';
import * as reloadComponentActions from '../../../actions/reloadComponent_action';
import { isServer, isUnitTesting } from '../../../utils/utils';

export class SideBarProfilesStatic extends React.Component {
	static propTypes = {
    props: PropTypes.shape({
      componentData: PropTypes.object,
			reducerName: PropTypes.string,
			componentName: PropTypes.string,
			parentComponent: PropTypes.object
    })
  }

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
    this.successFlag = this.props.componentData.get('success');
    this.error = this.props.componentData.get('error');

    if (!this.error) {
      const nextData = this.props.componentData.get('data');
      this.teaserArray = [];
      if (nextData && (this.teaserArray.length === 0)) {
        if (nextData && !nextData.isEmpty()) {
          this.emptyFlag = false;
          const profilesArray = nextData.toJS();
          const { reducerName, componentName, parentComponent } = this.props;
          const tempPropsArray = generateProfileTeaserCards(profilesArray, this.state.mobileView, reducerName, componentName, parentComponent);
          _.each(tempPropsArray, (props) => {
            this.teaserArray.push(<ProfileTeaserCard {...props} />);
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
    actions.fetchProfiles();
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
    }

    this.successFlag = nextProps.componentData.get('success');
    this.error = nextProps.componentData.get('error');

    if (!this.error) {
      const previousData = this.props.componentData.get('data');
      const nextData = nextProps.componentData.get('data');
      this.teaserArray = [];
      if (nextData && (!nextData.equals(previousData) || this.teaserArray.length === 0)) {
        if (!nextData.isEmpty()) {
          this.emptyFlag = false;
          const profilesArray = nextData.toJS();
          const { reducerName, componentName, parentComponent } = this.props;
          const tempPropsArray = generateProfileTeaserCards(profilesArray, this.state.mobileView, reducerName, componentName, parentComponent);
          _.each(tempPropsArray, (props) => {
            this.teaserArray.push(<ProfileTeaserCard {...props} />);
          });
        } else {
          this.emptyFlag = true;
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

  render() {
    const self = this;
    function generateDOM() {
      if (self.successFlag) {
        if (self.emptyFlag) {
          return (null);
        	} else {
          return (
						<Segment className="side-bar side-bar-pages">
       				<h4 className="ui header">{self.props?self.props.tabTitle:""}</h4>
								{createBodyContent(self.teaserArray, self.state.mobileView)}
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
						<div className="ui  divided items">
							{teaserArray.map(function (card, index) {
  							return (
									<Item key={index}>
                		{card}
                </Item>
								);
							})
						}
						</div>
					);
      	}
    	};
    return generateDOM();
  }
}


function mapStateToProps(state, props) {
  return {
    componentData: state.get(props.reducerName).get(props.componentName),
    isLoggedIn: state.get('reducer').get('isLoggedIn'),
    isAccountVerified: state.get('account').get('verification').get('isVerified'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reloadActions: bindActionCreators(reloadComponentActions, dispatch),
  };
}

export const SideBarProfiles = connect(mapStateToProps, mapDispatchToProps)(SideBarProfilesStatic);
