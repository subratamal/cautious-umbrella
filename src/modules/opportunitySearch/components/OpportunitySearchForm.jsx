import React, { PropTypes } from 'react';
import { Icon } from 'react-semantify';
import { isEmpty } from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { validationErrors } from '../../../constants/messagesConfig';
import oauth_config from '../../../../config/oauth';
import { createOpportunityNavigationUrl } from '../../../utils/createNavigationUrl';
import { opportunitiesTypesList } from '../../../../static/opportunitiesTypes';
import { searchTextBind } from '../actions';
import { env } from '../../../../config';
import { breakPointsDefaults } from '../../../defaults';
import { getTokenByName } from '../../../utils/utils';


export const validate = (values) => {
  const errors = {};
  if (!values.opportunityName) {
    errors.opportunityName = validationErrors.required;
  }
  return errors;
};

export const fields = ['opportunityName', 'type', 'location'];

class OpportunitySearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.onActiveSearch = this.onActiveSearch.bind(this);
    this.closeActiveSearchForm = this.closeActiveSearchForm.bind(this);
    this.getSubTypeDropDown = this.getSubTypeDropDown.bind(this);
    this.searchTextBind = this.searchTextBind.bind(this);
    this.state = {
      subtypeFilter: null,
    };
  }
  componentDidMount() {
    const $dropdown = $('.opportunity-search-form .ui.search.location.dropdown');
    if ($dropdown.dropdown) {
      $dropdown.dropdown({
        maxSelections: 3,
        forceSelection: false,
      });
    }
    const $searchDropdown = $('.opportunity-search-form .ui.search');
    if ($searchDropdown.search) {
      $searchDropdown.search({
        type: 'category',
        dataType: 'json',
        searchDelay: 500,
        apiSettings: {
          url: `${env.ELASTICSEARCH_URL}/home/opportunities?&limit=5&offset=0&type=opportunities&title={query}`,
          // /home/pages?subtype=page_university,page_institution&limit=5&offset=0&type=page&title={query}
          beforeXHR: (xhr) => {
            const token = getTokenByName('oAuthToken');
            xhr.setRequestHeader('Authorization', token);
          },
          onResponse: (pageResponse) => {
            let response = {
              results: {},
            };
            if (!pageResponse) {
              return;
            }
            if (pageResponse.Message) {
              response = {
                results: [],
              };
              return response;
            }
            $.each(pageResponse, (index, item) => {
              const pageUrl = createOpportunityNavigationUrl(item.id);
              const language = item.id || 'Unknown';
              const maxResults = 10;
              if (index >= maxResults) {
                return false;
              }

              if (response.results[language] === undefined) {
                response.results[language] = {
                  // name: imgElem,
                  results: [],
                };
              }
			          // add result to category
              response.results[language].results.push({
                title: item.title,
                description: item.subtype,
                url: pageUrl,
              });
            });
            return response;
          },
        },
        onSelect: (result) => {
          if (result !== false) {
            window.location = result.url;
          } else {
            const url = document.getElementsByClassName('category active')[0].children[1].href;
            window.location = url;
          }
        },
      });
    }

    const $subtypeDropdown = $('.opportunity-search-form .ui.subtype.dropdown');
    if ($subtypeDropdown.dropdown) {
      const self = this;
      $subtypeDropdown.dropdown({
        maxSelections: 6,
        onChange(val) {
          self.setState({
            subtypeFilter: val,
          });
        },
      });
    }
    $('.opportunity-search-form .ui.category.search').dropdown('refresh');
  }
  componentDidUpdate() {
    // $('.opportunity-search-form .ui.category.search').dropdown('refresh');
  }
  onActiveSearch(e) {
    e.preventDefault();
    this.setState({
      showDefaultListOnCover: false,
    });
    if (this.props.searchMode === false) {
      const { searchFormActions, dispatch } = this.props;
      dispatch(searchFormActions.setSearchMode(true));
      if (this.state.subtypeFilter || !isEmpty(this.props.searchText)) {
        this.props.searchFormActions.processOpportunitySearch(this.props.searchText, this.state.subtypeFilter);
      }
    }
  }
  getSearchBtnForMobile() {
    if (this.props.searchMode === false && window.innerWidth <= breakPointsDefaults.largeMobileDevice) {
      return (
  			<div className="fields">
					<div className="ui hidden divider" />
	  			<div className="ui center aligned container eight wide field" />
	  			<div className="ui center aligned container eight wide field">
					<button className="ui primary button" onClick={this.onActiveSearch} type="submit">Search</button>
				</div>
			</div>
    );
    }
    return null;
  }
  getTypesList() {
    if (this.props.searchMode === true) {
      const typeList = opportunitiesTypesList.types.default.map(name =>
          <div className="item" data-value={name} key={name}>
            {name}
          </div>
        );
      return typeList;
    }
    return null;
  }
  getSubTypeDropDown() {
    const dropdownList = ['subtype'];
    if (this.props.searchMode === true) {
      const lists = dropdownList.map((item, index) => (
	  			<div className="five wide field" key={item + index}>
			  		<div className="ui multiple search subtype normal selection dropdown">
			  			<input type="hidden" name={item} />
			  			<i className="dropdown icon" />
							<div className="default text">Select Type</div>
				  		<div className="menu">
	                        {this.getTypesList()}
	                 	</div>
	             	</div>
			  	</div>
	  		)
	  	, this);
      return lists;
    }
    return null;
  }
  closeActiveSearchForm() {
    const { searchFormActions, dispatch } = this.props;
    dispatch(searchFormActions.resetAndCloseSearch());
    dispatch(searchFormActions.setSearchMode(false));
    this.setState({
      searchText: '',
    });
  }
  handleOnSubmit() {
    if (this.state.subtypeFilter || !isEmpty(this.props.searchText)) {
      this.props.searchFormActions.processOpportunitySearch(this.props.searchText, this.state.subtypeFilter);
    }
  }
  searchTextBind(e) {
    this.props.searchTextBind(e.target.value);
  }
  render() {
    const { fields: { opportunityName, type, location }, resetForm, handleSubmit, submitting } = this.props;
    const searchText = this.props.searchText;
    return (
  		<form className="ui form horizontal opportunity-search-form" onSubmit={handleSubmit(this.handleOnSubmit)}>
			{
			this.props.searchMode === true ?
			<div className="closeBtn" onClick={this.closeActiveSearchForm}>
				<Icon className="close" />
			</div> : ''
			}
			<div className="field">
				<div className="fields">
					{this.props.searchMode === true ? '' :
						<div className="four wide field" />
					}
					<div className={this.props.searchMode === true ? 'five wide field' : 'eight wide field'}>
						<div className="ui category search focus">
							<div
  className={this.props.searchMode === false
								&& window.innerWidth > breakPointsDefaults.largeMobileDevice
								? 'ui action left icon input' : 'ui left icon input'}
       >
								<Icon className="search " />
								<input ref="opportunityName" value={searchText} onChange={this.searchTextBind} type="text" className="prompt" placeholder="Type opportunity name..." />
								{this.props.searchMode === false && window.innerWidth > breakPointsDefaults.largeMobileDevice ?
								<button className="ui primary button" type="submit" onClick={this.onActiveSearch}>Search</button>
								: ''}
							</div>
						</div>
						{window.innerWidth <= breakPointsDefaults.largeMobileDevice ?
						<div className="ui hidden divider" /> : null }
				  	</div>
            {
              this.getSubTypeDropDown()
            }
				  	{ this.props.searchMode === true ? (window.innerWidth <= breakPointsDefaults.largeMobileDevice ?
				  	<div className="three wide field">
							<div className="ui hidden divider" />
				  		<button className="ui primary button" onClick={this.handleOnSubmit}>Go</button>
				  	</div> : <div className="three wide field">
				  		<button className="ui primary button" onClick={this.handleOnSubmit}>Go</button>
				  	</div>)
				  	: null}
				</div>
				{
			  		this.getSearchBtnForMobile()
				}
			</div>
		</form>
  );
  }
}

OpportunitySearchForm.propTypes = {
  searchMode: PropTypes.bool,
  searchFormActions: PropTypes.object,
  dispatch: PropTypes.func,
  apiActions: PropTypes.object,
  searchTextBind: PropTypes.func,
  searchText: PropTypes.string,
  subtypeFilter: PropTypes.array,
};

const OpportunityMastHeadForm = reduxForm({
  form: 'opportunitySearchForm',
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(), //--> workaround for converting redux-form state to immutable
})(OpportunitySearchForm);

function mapStateToProps(state) {
  return {
    searchText: state.get('opportunitySearchReducer').get('searchText'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchTextBind: bindActionCreators(searchTextBind, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityMastHeadForm);
