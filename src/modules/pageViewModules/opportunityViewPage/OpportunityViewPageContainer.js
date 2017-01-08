import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SideBar } from '../../../components/views/SideBar';
import { OpportunitiesView, actions as opportunitiesActions } from '../../opportunities';
import { PagesView, actions as pageActions } from '../../pages';
import { PrimaryContent } from '../../../components/views/PrimaryContent';
import { PageBody } from '../../../components/views/PageBody';
import TitleBar from './TitleBar';
import ShareModal from '../../opportunities/components/ShareModal';
import DocumentMeta from 'react-document-meta';
import { opportunityPageMeta } from '../../../utils/metaTags';
import { SubContent } from '../../../components/views/SubContent';
import { opportunityViewPageConfig as pageConfig } from '../../../defaults';
import { generateComponentProps } from '../../../utils/pageComponentsPropsGenerator';

class OpportunitiesViewComponent extends React.Component {
  static fetchData({ dispatch, params = {}, query = {}, locale }) {
    return Promise.all(
      [opportunitiesActions.fetchOpportunitiesViewData].map(actionCreator => dispatch(actionCreator({ params, query, locale })))
    );
  }

  constructor(props) {
    super(props);
    this.viewPageData = null;
    this.emptyComponents = {};
  }

  render() {
    const componentProps = generateComponentProps(pageConfig, this.props.opportunitiesActions, this.emptyComponents);
    return (<div>
      <TitleBar props={this.props} componentProps={componentProps} />
      <PageBody singleEntityViewPage>
        <PrimaryContent>
          <SubContent>
            <OpportunitiesView {...componentProps.opportunityTitleCard} params={this.props.params} viewType="viewPage" />
          </SubContent>
          <SubContent>
            <OpportunitiesView {...componentProps.opportunityDetailsCard} />
          </SubContent>
        </PrimaryContent>
        <SideBar>
          <PagesView {...componentProps.sideBarOpportunityAuthor} />
          <PagesView {...componentProps.sideBarAuthorDetails} />
          <OpportunitiesView {...componentProps.sideBarSimilarOpportunities} />
        </SideBar>
      </PageBody>
      <ShareModal shareData={this.props.shareData} />
    </div>);
  }
}

OpportunitiesViewComponent.propTypes = {
  params: React.PropTypes.shape({
    opportunityId: React.PropTypes.any,
  }),
  isLoggedIn: React.PropTypes.bool,
  componentData: React.PropTypes.any,
  isResultAvailable: React.PropTypes.bool,
  opportunityId: React.PropTypes.any,
  opportunitiesActions: React.PropTypes.object,
  viewData: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.get('reducer').get('isLoggedIn'),
    shareData: state.get('opportunityReducer').get('shareData'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    opportunitiesActions: bindActionCreators(opportunitiesActions, dispatch),
    pagesActions: bindActionCreators(pageActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OpportunitiesViewComponent);
