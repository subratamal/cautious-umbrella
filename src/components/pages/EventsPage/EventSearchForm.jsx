import React, { Component, PropTypes } from 'react';
import {
  Divider,
  Icon,
  Menu,
  Item,
} from 'react-semantify';
import { isEmpty } from 'underscore';

import { reduxForm } from 'redux-form';
import { FieldError } from '../../elements/FieldError';
import { validationErrors } from '../../../constants/messagesConfig';
import { breakPointsDefaults } from '../../../defaults';
import { env } from '../../../../config';
import oauth_config from '../../../../config/oauth';
import { createEntityNavigationUrl } from '../../../utils/createNavigationUrl';
import { citiesList } from '../../../../static/cities';
import { typesList } from '../../../../static/types';
import * as eventsPageActions from '../../../actions/eventsPage_actions';
import { pageThumbnail } from '../../../defaults';

const { ELASTICSEARCH_URL } = env;
/*
  Properties:-
  1. eventsName: input field for search event
  2. Type: type of event
  3. location: select particular location to search
  4. go button: CTA button
  5. onActiveSearch: open active search form function
  6. closeActiveSearchForm: close active search form, going back state
  7. getSearchBtnForMobile: search btn render
  8. getLocationList: city list render function
  9. getEventsDropDown: event search form dropdown render function
  10. getDefaultEventsList && getDefaultEvents: combined both function used for default events list render

*/
/* Validation rules as per redux-form*/
export const validate = (values, allValues) => {
  const errors = {};
  if (!values.eventsName) {
    errors.eventsName = validationErrors.required;
  }
  return errors;
};


/* Validation rules as per redux-form*/
export const fields = ['eventsName', 'type', 'location'];

class EventSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this._handleOnSubmit = this._handleOnSubmit.bind(this);
    this.onActiveSearch = this.onActiveSearch.bind(this);
    this.closeActiveSearchForm = this.closeActiveSearchForm.bind(this);
    this.getEventsDropDown = this.getEventsDropDown.bind(this);
    this.showDefaultList = this.showDefaultList.bind(this);//
    this.hideDefaultList = this.hideDefaultList.bind(this);//
    this.searchTextBind = this.searchTextBind.bind(this);//
    this.state = { locationFilter: null };
  }

  _handleOnSubmit() {
    if (this.state.locationFilter || !isEmpty(this.refs.eventsName.value) || this.state.subtypeFilter) {
      this.props.apiActions.processEventSearchFromElastic(this.state.locationFilter, this.refs.eventsName.value, this.state.subtypeFilter);
    }
  }

  onActiveSearch(e) {
    e.preventDefault();
    this.setState({
      showDefaultListOnCover: false,
    });
    if (this.props.resultHeader === false) {
      let { searchFormAction, dispatch } = this.props;
      dispatch(searchFormAction.setResultHeader(true));
      if (this.state.locationFilter || !isEmpty(this.refs.eventsName.value)) {
        this.props.apiActions.processEventSearchFromElastic(this.state.locationFilter, this.refs.eventsName.value, this.state.subtypeFilter);
      }
    }
  }
  closeActiveSearchForm() {
    let { searchFormAction, dispatch } = this.props;
    dispatch(eventsPageActions.setResultAvailableFalse());
    dispatch(eventsPageActions.emptyBeforeReload());
    dispatch(searchFormAction.setResultHeader(false));
  }
  getSearchBtnForMobile() {
    if (this.props.resultHeader === false && window.innerWidth <= breakPointsDefaults.largeMobileDevice) {
      return (
  <div className="fields">
  <div className="ui center aligned container eight wide field" />
  <div className="ui center aligned container eight wide field">
<button className="ui primary button" onClick={this.onActiveSearch} type="submit">Search</button>
</div>
</div>
  );
    } else {
      return '';
    }
  }
  getLocationList(fieldName) {
    if (this.props.resultHeader === true) {
      if (fieldName == 'Location') {
        const cityList = citiesList.cities.default.map((name) => {
          return (
              <div className="item" data-value={name} key={name}>
                {name}
              </div>
            );
        });
        return cityList;
      } else if (fieldName == 'Type') {
        const typeList = typesList.types.default.map((name) => {
          return (
              <div className="item" data-value={name} key={name}>
                {name}
              </div>
            );
        });
        return typeList;
      }
    } else {
      return '';
    }
  }
  getEventsDropDown() {
    const dropdownList = [{ name: 'Type', innerText: 'Type of Event', classVariable: 'ui multiple search subtype normal selection dropdown' }, { name: 'Location', innerText: 'Location', classVariable: 'ui multiple search location normal selection dropdown' }];
    if (this.props.resultHeader === true) {
      const lists = dropdownList.map(function (item, index) {
        return (
          <div className="three wide field" key={item.name + index}>
            {index && window.innerWidth <= breakPointsDefaults.largeMobileDevice ?
            <div className="ui hidden divider" /> : '' }
            <div className={item.classVariable}>
              <input type="hidden" name={item.name} />
              <i className="dropdown icon" />
              <div className="default text">{item.innerText}</div>
              <div className="menu">
                {this.getLocationList(item.name)}
              </div>
            </div>
          </div>
        );
      }, this);
      return lists;
    } else {
      return '';
    }
  }
  showDefaultList() {
    if (this.refs.eventsName.value === '')
      this.setState({
        showDefaultListOnCover: true,
      });
  }
  hideDefaultList() {
    this.setState({
      showDefaultListOnCover: false,
    });
  }
  searchTextBind() {
    this.setState({
      showDefaultListOnCover: false,
    });
    this.props.apiActions.searchTextSync(this.refs.eventsName.value);
  }
  getDefaultEventsList(defaultList) {
    const lists = defaultList.data.map((item, index) => {
      const pageUrl = createEntityNavigationUrl(item.id, item.type);
      return (
        <div className="category" key={index} >
          <div className="name">
            <a href={pageUrl} className="content">
              <img src={typeof (item.cover_picture) == 'undefined' ? '' : item.cover_picture.image_100_100} className="ui mini image rounded" />
            </a>
          </div>
          <a className="result" href={pageUrl}>
            <div className="content">
              <div className="title">{item.title}</div>
              <div className="description">{item.location.formatted_address}</div>
            </div>
          </a>
        </div>
      );
    }, this);
    return lists;
  }
  getDefaultEvent(defaultList) {
    return (
      <div className="results transition visible">
        {this.getDefaultEventsList(defaultList)}
      </div>
    );
  }
  componentDidMount() {
    if (this.props.resultHeader === false) {
      const $dropdown = $('.university-search-form .ui.search.location.dropdown');
      if ($dropdown.dropdown) $dropdown.dropdown({
        maxSelections: 3,
        forceSelection: false,
      });
      const $searchDropdown = $('.university-search-form .ui.search');
      if ($searchDropdown.search) {
        $searchDropdown.search({
          type: 'category',
          dataType: 'json',
          searchDelay: 500,
          apiSettings: {
          // url: API_URL +'/v1/events?fields=group_teaser,location&limit=10&offset=0&title:like{query}%',
            url: ELASTICSEARCH_URL + '/home/events?limit=5&offset=0&type=event&title={query}',
            beforeXHR(xhr) {
              const token = oauth_config.oAuthToken;
              xhr.setRequestHeader('Authorization', token);
            },
            onResponse(pageResponse) {
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
                const pageUrl = createEntityNavigationUrl(item.id, item.type);
                const language = item.id || 'Unknown';
                const maxResults = 10;
                if (index >= maxResults) {
                  return false;
                }

                let imgElem = '';
                if (item && {}.hasOwnProperty.call(item, 'cover_picture')) {
                  imgElem = `<a href=${pageUrl} class="content"><img src=${item.cover_picture.image_100_100} class="ui mini image rounded"/></a>`;
                } else {
                  imgElem = `<a href=${pageUrl} class="content"><img src=${pageThumbnail} class="ui mini image rounded"/></a>`;
                }
              // create new language category
                if (response.results[language] === undefined) {
                  response.results[language] = {
                    name: imgElem,
                    results: [],
                  };
                }
            // add result to category
                response.results[language].results.push({
                  title: item.title,
                  description: item.location ? item.location.formatted_address : '',
                  url: pageUrl,
                });
              });
              return response;
            },
          },
          onSelect(result, response) {
            if (result !== false) {
              window.location = result.url;
            } else {
              const url = document.getElementsByClassName('category active')[0].children[1].href;
              window.location = url;
            }
          },
        });
      }
    } else {
      this.refs.eventsName.focus();
    }
    const $locDropdown = $('.university-search-form .ui.location.dropdown');
    if ($locDropdown.dropdown) {
      const self = this;
      $locDropdown.dropdown({
        maxSelections: 3,
        forceSelection: false,
        onChange(val) {
          self.setState({
            locationFilter: val,
          });
        },
      });
    }
    const $subtypeDropdown = $('.university-search-form .ui.subtype.dropdown');
    if ($subtypeDropdown.dropdown) {
      const self = this;
      $subtypeDropdown.dropdown({
        maxSelections: 6,
        forceSelection: false,
        onChange(val) {
          self.setState({
            subtypeFilter: val,
          });
        },
      });
    }
    $('.university-search-form .ui.category.search').dropdown('refresh');
  }

  componentDidUpdate() {
    $('.university-search-form .ui.category.search').dropdown('refresh');
  }

  render() {
    const { fields: { eventsName, type, location }, resetForm, handleSubmit, submitting } = this.props;
    const searchText = this.props.componentData.get('searchText') ? this.props.componentData.get('searchText') : '';
    return (
    <form className="ui form horizontal university-search-form" onSubmit={handleSubmit(this._handleOnSubmit)}>
    {
    this.props.resultHeader === true ?
    <div className="closeBtn" onClick={this.closeActiveSearchForm.bind(this)}>
      <Icon className="close" />
    </div> : ''
    }
    <div className="field">
      <div className="fields">
        { this.props.resultHeader === true ? '' :
          <div className="four wide field" />
        }
        <div className={this.props.resultHeader === true ? 'five wide field' : 'eight wide field'}>
          <div className="ui category search focus">
            <div className={this.props.resultHeader === false
              && window.innerWidth > breakPointsDefaults.largeMobileDevice
              ? 'ui action left icon input' : 'ui left icon input'}>
              <Icon className="search " />
              <input ref="eventsName" value={searchText} type="text" onChange={this.searchTextBind} className="prompt" placeholder="Type Event name..." />
              {this.props.resultHeader === false && window.innerWidth > breakPointsDefaults.largeMobileDevice ?
                <button className="ui primary button" type="submit" onClick={this.onActiveSearch}>Search</button>
                : ''}
            </div>
          {/*
          onFocus = {this.showDefaultList} onBlur={this.hideDefaultList}
          this.props.resultHeader === false && this.state.showDefaultListOnCover  ?
          this.getDefaultEvent(this.props.deafultArray)
          :null*/}
        </div>
        {window.innerWidth <= breakPointsDefaults.largeMobileDevice ?
          <div className="ui hidden divider" /> : '' }
          </div>
          {
            this.getEventsDropDown()
          }
          {
            this.props.resultHeader === true ? (window.innerWidth <= breakPointsDefaults.largeMobileDevice ?
              <div className="three wide field">
                <div className="ui hidden divider" />
                  <button className="ui primary button" onClick={this._handleOnSubmit}>Go</button>
              </div> : <div className="three wide field">
                  <button className="ui primary button" onClick={this._handleOnSubmit}>Go</button>
                </div>) : ''
          }
        </div>
        {
          this.getSearchBtnForMobile()
        }
      </div>
    </form>
    );
  }
}


const EventsHeadForm = reduxForm({
  form: 'eventSearchForm',
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(), // --> workaround for converting redux-form state to immutable
})(EventSearchForm);

export default EventsHeadForm;
