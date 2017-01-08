import React, { PropTypes } from 'react';
import { Segment, List, Divider, Item, Grid, Column } from 'react-semantify';
import PageTeaserCard from './PageTeaserCard';
import { bindActionCreators } from 'redux';
import { breakPointsDefaults } from '../../../defaults';
import _ from 'underscore';
import { generatePageTeaserCards } from '../utils';
import { connect } from 'react-redux';
import * as reloadComponentActions from '../../../actions/reloadComponent_action';
import { isServer, isUnitTesting } from '../../../utils/utils';

export class SideBarPagesStatic extends React.Component {
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
      const nextData = this.props.componentData;
      this.teaserArray = [];
      if (nextData && (this.teaserArray.length === 0)) {
        if (nextData.length>0) {
          this.emptyFlag = false;
          const pagesArray = nextData;
          const { reducerName, componentName, parentComponent } = this.props;

          const tempPropsArray = generatePageTeaserCards(pagesArray, this.state.mobileView, reducerName, componentName, parentComponent);
          _.each(tempPropsArray, (props) => {
            this.teaserArray.push(<PageTeaserCard {...props} />);
          });
        } else {
          this.emptyFlag = true;
        }
      }
  }


  componentWillUpdate(nextProps, nextState) {
    if ((nextProps.isLoggedIn != this.props.isLoggedIn)) {
      if (nextProps.isLoggedIn && !nextProps.isAccountVerified) {
      } else {
        const actions = this.props.apiActions;
        actions.fetchPages();
      }
    }
      const previousData = this.props.componentData
      const nextData = nextProps.componentData
      this.teaserArray = [];
      if (nextData && (nextData.length>0 || this.teaserArray.length === 0)) {
          this.emptyFlag = false;
          const pagesArray = nextData;
          const { reducerName, componentName, parentComponent } = this.props;

          const tempPropsArray = generatePageTeaserCards(pagesArray, this.state.mobileView, reducerName, componentName, parentComponent);
          _.each(tempPropsArray, (props) => {
            this.teaserArray.push(<PageTeaserCard {...props} />);
          });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    const actions = this.props.apiActions;
    actions.fetchPages();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const self = this;
    function generateDOM() {
          return (
            <Segment className="side-bar side-bar-pages side-bar-people">
              <h4 className="ui header">Pages</h4>
              {createBodyContent(self.teaserArray, self.state.mobileView)}
            </Segment>
          );
    }

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
          <div className="ui divided items">
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
    isLoggedIn: state.get('reducer').get('isLoggedIn'),
    isAccountVerified: state.get('account').get('verification').get('isVerified'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reloadActions: bindActionCreators(reloadComponentActions, dispatch),
  };
}

export const SideBarPages = connect(mapStateToProps, mapDispatchToProps)(SideBarPagesStatic);
