import React from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import {
Segment,
List,
Divider,
Item,
Grid,
Column,
Button,
} from 'react-semantify';
import { makeSideBarListsSelector } from './selectors';
import { breakPointsDefaults } from '../../defaults';
import { generateListProps } from './utils';

export class SideBarListsStatic extends React.Component {
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

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    const actions = this.props.apiActions;
    if (!this.props.componentData && typeof (this.props.apiCall) !== 'undefined') {
      actions[this.props.apiCall]();
    }
  }

  componentDidUpdate(prevProps) {
    const actions = this.props.apiActions;
    if (!this.props.componentData && typeof (this.props.apiCall) !== 'undefined') {
      actions[this.props.apiCall]();
    }
    // else {
    //   actions.fetchPages();
    // }
    const data = this.props.componentData;
    const prevData = prevProps.componentData;
    this.teaserArray = [];
    if (data && (data != prevData || this.teaserArray.length === 0)) {
      if (data.length !== 0) {
        const dataArray = data;
        const tempPropsArray = generateListProps(dataArray, this.state.mobileView);
        _.each(tempPropsArray, (props) => {
          this.teaserArray.push(
              <a href={props.url} target="_blank">
                <Button className="basic" style={{ marginBottom: '0.5em' }}>{props.primaryText}</Button>
              </a>
            );
        });
      } else {
        this.emptyFlag = true;
      }
    }
  }

  render() {
    const self = this;
    function generateDOM() {
      return (
            <Segment className="side-bar side-bar-pages side-bar-people">
              <h4 className="ui header" >{self.props.tabTitle}</h4>
              {createBodyContent(self.teaserArray, self.state.mobileView)}
            </Segment>

          );
      return null;
    }

/* based on condition return grid or list*/
    let createBodyContent = function (teaserArray, mobileFlag) {
      if (mobileFlag) {
        return (
          <Grid className="two column stackable">
            {teaserArray.map((card, index) => {
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
          <div className="ui items">
          {teaserArray.map((card, index) => {
            return card;
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
  const recordSelector = makeSideBarListsSelector();
  const metaPropName = `${props.pageName}${props.view}`;
  const selectorProps = {
    metaPropName,
  };
  return {
    componentData: recordSelector(state, selectorProps),
  };
}

export const SideBarList = connect(mapStateToProps)(SideBarListsStatic);
