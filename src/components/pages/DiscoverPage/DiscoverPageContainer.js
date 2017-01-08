import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-semantify';
import { bindActionCreators } from 'redux';
import ProgressBar from 'react-progress-bar-plus';
import DocumentMeta from 'react-document-meta';

// Layout Components
import { PageBody } from '../../views/PageBody';
import { PrimarySlider } from '../../views/PrimarySlider';
import { SideBar } from '../../views/SideBar';
import { PageHeaderText } from '../../views/PageHeaderText';
import { PrimaryContent } from '../../views/PrimaryContent';
import { SubContent } from '../../views/SubContent';

// Discover Page Components
import { PrimaryContentSlider } from '../../views/PrimaryContentSlider';
import { BlockCardContainer } from '../../views/cards/BlockCardContainer';
import { SideBarPages } from '../../views/SideBarComponents/SideBarPages';
import { SideBarProfiles } from '../../views/SideBarComponents/SideBarProfiles';
import { SideBarTopics } from '../../views/SideBarComponents/SideBarTopics';
import SideBarAdvertisement from '../../views/SideBarComponents/SideBarAdvertisement';
import SideBarLoginSignup from '../../views/SideBarComponents/SideBarLoginSignup';
import { ServerErrorModal } from '../../elements/ServerErrorModal';

import { generateComponentProps } from '../../../utils/pageComponentsPropsGenerator';

import { discoverPageConfig as pageConfig } from '../../../defaults';
import * as discoverPageActions from '../../../actions/discoverPage_firebase_actions';
import { fetchTopics, fetchProfiles, fetchPages, fetchBodyStories, fetchBodyEvents, fetchPrimarySliderContent } from '../../../actions/discoverPage_firebase_actions';

import { discoverPageMeta } from '../../../utils/metaTags';
import * as utils from '../../../utils/utils';

class DiscoverPageComponent extends React.Component {
  static propTypes = {
      apiActions: PropTypes.object
  }

  static fetchData({ dispatch, params = {}, query = {}, locale }) {
    return Promise.all(
      [fetchTopics, fetchProfiles, fetchPages, fetchBodyStories, fetchBodyEvents, fetchPrimarySliderContent].map(actionCreator => dispatch(actionCreator({ params, query, locale })))
    );
  }

  componentWillMount() {
    this.emptyComponents = {};
  }

  componentWillUpdate(nextProps, nextState) {
    this.emptyComponents = nextProps.componentData.get('emptyComponents').toJS();
    if (nextProps.componentData.get('pageError')) {
      $('.ui.modal.serverError')
        .modal('setting', 'closable', false)
        .modal('show');
    }
  }

  render() {
    // Utility function call to create page component props
    const successListLength = this.props.componentData.get('successComponents').size;
    let percent;
    if (successListLength) {
      percent = (successListLength / pageConfig.totalComponents) * 100;
    } else {
      percent = 10;
    }

    const componentProps = generateComponentProps(pageConfig, this.props.apiActions, this.emptyComponents);


    return (
        <DocumentMeta {...discoverPageMeta}>
        { utils.isServer() ? '' : <ServerErrorModal></ServerErrorModal> }
        <PageBody tabsUrl="discover">
          <PageHeaderText>
          <div className="ui text container page-title-text">
            <h1 className="ui header center aligned">Discover</h1>
          </div>
          </PageHeaderText>
          <PrimarySlider>
            <PrimaryContentSlider {...componentProps.primarySlider} />
          </PrimarySlider>
          <SideBar>
            <SideBarLoginSignup tabTitle="Login/Signup" computerOnly emptyState={this.props.isLoggedIn} />
            <SideBarPages {...componentProps.sideBarPages} ></SideBarPages>
            <SideBarProfiles {...componentProps.sideBarProfiles}></SideBarProfiles>
            <SideBarTopics {...componentProps.sideBarTopics}></SideBarTopics>
          </SideBar>

          <PrimaryContent>
            <SubContent {...componentProps.stories}>
              <BlockCardContainer {...componentProps.stories}> </BlockCardContainer>
            </SubContent>

            <SubContent {...componentProps.events}>
              <BlockCardContainer {...componentProps.events}> </BlockCardContainer>
            </SubContent >
          </PrimaryContent>
        </PageBody>
        <ProgressBar percent={percent} spinner={false} />
        {!this.props.isTokenReceived ?
        <div className="ui active page dimmer">
          <div className="ui text loader custom-loader">
            <Icon className="header cd monogram logo loaderimage" />
          </div>
        </div> : null}
        </DocumentMeta>
    );
  }
}

function mapStateToProps(state) {
  return {
    componentData: state.get('discoverPage').get(pageConfig.parentComponent),
    isLoggedIn: state.get('reducer').get('isLoggedIn'),
    isTokenReceived: state.get('reducer').get('isTokenReceived'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    apiActions: bindActionCreators(discoverPageActions, dispatch),
  };
}

// Connects dispatch and props to component
export default connect(mapStateToProps, mapDispatchToProps)(DiscoverPageComponent);
