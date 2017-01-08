import React from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { each } from 'underscore';
import { Card } from 'react-semantify';
import { bindActionCreators } from 'redux';
import { generateStoryFeaturedCardsProps, generateEventFeaturedCardsProps, generatePageFeaturedCardsProps } from '../../utils/cardsGenerators/featuredCardsGenerator';
import api from '../../api/api';
import EventFeaturedCard from '../views/cards/EventFeaturedCard';
import StoryFeaturedCard from '../views/cards/StoryFeaturedCard';
import UniversityPageFeaturedCard from '../pages/UniversityPage/UniversityPageFeaturedCard';
import { primarySliderSettings } from '../../defaults';
import * as reloadComponentActions from '../../actions/reloadComponent_action';
import * as utils from '../../utils/utils';

/*
Properties:-
1. Slick Slider
2. Featured Card Ccomponent
3. Card title
*/

const getStaticSlides = function () {
  const adSlidesArray = ['0', '1'];
  const mastHead = require('../../../static/images/NYPSDiscoverPage.png');
  let bgimage = {
    backgroundImage: 'url(' + mastHead + ')',
  };
  const adSlides = adSlidesArray.map((slide, index) => {
    return (
			<div key={'adslide' + index}>
				<Card className="advertisement-card big-feature-card fluid grid">
					<div className="row">
						<a href="#" className="ui image sixteen wide column bg-img" style={bgimage} target="_blank"></a>
					</div>
				</Card>
			</div>
		);
  });
  return adSlides;
};

export class PrimaryContentSliderStatic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      slidesArray: [],
    };
    this.slidesArray = [];
    this.callApi = this.callApi.bind(this);
    this.emptyFlag = false;
    this.sliderKey = false;
  }

  componentWillMount() {
    const self = this;
    const sliderData = this.props.componentData.get('data');

    if (sliderData) {
      self.successFlag = this.props.componentData.get('success');
      self.error = this.props.componentData.get('error');
      let { reducerName, componentName, parentComponent } = this.props;
      each(sliderData.toJS(), (record) => {
        if (record.cardType == 'stories') {
          const tempStoryPropsArray = generateStoryFeaturedCardsProps(record.data, reducerName, componentName, record.sliderDataIndex, parentComponent);
          each(tempStoryPropsArray, (props, index) => {
            self.slidesArray.push(
              <div key={`Story:${index}`}><StoryFeaturedCard {...props} /></div>
            );
          });
        } else if (record.cardType == 'events') {
          const tempStoryPropsArray = generateEventFeaturedCardsProps(record.data, reducerName, componentName, record.sliderDataIndex, parentComponent);
          each(tempStoryPropsArray, (props, index) => {
            self.slidesArray.push(
              <div key={'Event:' + index}><EventFeaturedCard {...props} /></div>
            );
          });
        } else if (record.cardType == 'pages') {
          const tempStoryPropsArray = generatePageFeaturedCardsProps(record.data, reducerName, componentName, record.sliderDataIndex, parentComponent);
          each(tempStoryPropsArray, (props, index) => {
            self.slidesArray.push(
              <div key={'Page:' + index}><UniversityPageFeaturedCard {...props} /></div>
            );
          });
        }
      });
    }
  }

  callApi() {
    const actions = this.props.apiActions;
    actions[this.props.apiCall]();
  }

  componentDidMount() {
    const sliderData = this.props.componentData.get('data');
    const actions = this.props.apiActions;

    if (!sliderData) {
      this.callApi();
    } else {
      actions.setSuccessState(sliderData.toJS(), this.props.componentName);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const self = this;

    const previousData = this.props.componentData.get('data');
    const nextData = nextProps.componentData.get('data');
    if (nextData && previousData != null) {
      if (nextData.equals(previousData) && (nextData.size != previousData.size)) {
        return false;
      }
    }
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    const self = this;

    this.emptyFlag = false;
    if (nextProps.isLoggedIn != this.props.isLoggedIn) {
      if (nextProps.isLoggedIn && !nextProps.isAccountVerified) {} else {
        this.props.reloadActions.reloadComponent(this.props.componentName, this.props.parentComponent);
        this.sliderKey = !this.sliderKey;
        this.callApi();
      }
    } else {
      this.successFlag = nextProps.componentData.get('success');
      this.error = nextProps.componentData.get('error');
      if (!this.error) {
        const previousData = this.props.componentData.get('data');
        const nextData = nextProps.componentData.get('data');
        if (nextData && !nextData.equals(previousData) && (!previousData || nextData.size != previousData.size)) {
          if (!nextData.isEmpty()) {
            this.slidesArray = [];
            let { reducerName, componentName, parentComponent } = this.props;
            each(nextData.toJS(), (record) => {
              if (record.cardType == 'stories') {
                const tempStoryPropsArray = generateStoryFeaturedCardsProps(record.data, reducerName, componentName, record.sliderDataIndex, parentComponent);
                each(tempStoryPropsArray, (props, index) => {
                  self.slidesArray.push(<div key={'Story:' + index}><StoryFeaturedCard {...props} /></div>);
                });
              } else if (record.cardType == 'events') {
                const tempStoryPropsArray = generateEventFeaturedCardsProps(record.data, reducerName, componentName, record.sliderDataIndex, parentComponent);
                each(tempStoryPropsArray, (props, index) => {
                  self.slidesArray.push(<div key={'Event' + index}><EventFeaturedCard {...props} /></div>);
                });
              } else if (record.cardType == 'pages') {
                const tempStoryPropsArray = generatePageFeaturedCardsProps(record.data, reducerName, componentName, record.sliderDataIndex, parentComponent);
                each(tempStoryPropsArray, (props, index) => {
                  self.slidesArray.push(<div key={'Page' + index}><UniversityPageFeaturedCard {...props} /></div>);
                });
              }
            });
          } else {
            this.emptyFlag = true;
          }
        }
      }
    }
  }

  render() {
    const self = this;
    function generateDOM() {
      if (self.successFlag) {
        if (self.emptyFlag) {
          return (null);
        }

        let containerSliderOrDiv;
        if(utils.isServer()){
          containerSliderOrDiv = <div className="my-slider" {...primarySliderSettings}>{ self.slidesArray }</div>;
        } else{
          containerSliderOrDiv = <Slider className="my-slider" {...primarySliderSettings}>{ self.slidesArray }</Slider>;
        }

        return (
          <div key={self.sliderKey} className="featured-card-slider">
            <h4 className="ui dividing header">{self.props.title}</h4>
            { containerSliderOrDiv }
          </div>
        );
      }
      return null;
    }

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

export const PrimaryContentSlider = connect(mapStateToProps, mapDispatchToProps)(PrimaryContentSliderStatic);
