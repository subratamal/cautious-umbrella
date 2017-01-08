import React from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { each } from 'underscore';
import { Card } from 'react-semantify';
import { generateStoryFeaturedCardsProps, generateEventFeaturedCardsProps } from '../../utils/cardsGenerators/featuredCardsGenerator';
import { generateOpportunitiesFeaturedCardsProps } from '../opportunities/utils';
import EventFeaturedCard from '../../components/views/cards/EventFeaturedCard';
import StoryFeaturedCard from '../../components/views/cards/StoryFeaturedCard';
import { PageFeaturedCard, utils as pageUtils } from '../pages';
import { OpportunityFeaturedCard, utils as opportunityUtils } from '../opportunities';
import { primarySliderSettings } from '../../defaults';
import * as utils from '../../utils/utils';
import makeSliderRecordsSelectors from './selectors';

/*
Properties:-
1. Slick Slider
2. Featured Card Ccomponent
3. Card title
*/

const getStaticSlides = function () {
  const adSlidesArray = ['0', '1'];
  const mastHead = require('../../../static/images/NYPSDiscoverPage.png');
  const bgimage = {
    backgroundImage: 'url(' + mastHead + ')',
  };
  const adSlides = adSlidesArray.map((slide, index) => {
    return (
			<div key={'adslide' + index}>
				<Card className="advertisement-card big-feature-card fluid grid">
					<div className="row">
						<a href="#" className="ui image sixteen wide column bg-img" style={bgimage} target="_blank" />
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
    this.emptyFlag = false;
    this.sliderKey = false;
  }

  componentWillMount() {
    const self = this;
    const { componentData } = this.props;
    if (componentData) {
      each(componentData, (entitySlides) => {
        if (entitySlides.type === 'page') {
          const tempStoryPropsArray = pageUtils.generatePageFeaturedCardsProps(entitySlides.records);
          each(tempStoryPropsArray, (props, index) => {
            self.slidesArray.push(
              <div key={`Page:${index}`}><PageFeaturedCard {...props} /></div>
            );
          });
        } else if (entitySlides.type === 'opportunity') {
          const tempStoryPropsArray = opportunityUtils.generateOpportunitiesFeaturedCardsProps(entitySlides.records);
          each(tempStoryPropsArray, (props, index) => {
            self.slidesArray.push(
              <div key={`Opportunity:${index}`}><OpportunityFeaturedCard {...props} /></div>
            );
          });
        }
      });
    }
  }


  componentDidMount() {
    const { componentData, apiActions, dispatch } = this.props;
    if (!componentData || !componentData.length) {
      apiActions();
    }
  }

  shouldComponentUpdate(nextProps) {
    const previousData = this.props.componentData;
    const nextData = nextProps.componentData;
    if (nextData && previousData != null) {
      if ((nextData === previousData) && (nextData.size !== previousData.size)) {
        return false;
      }
    }
    return true;
  }

  componentWillUpdate(nextProps) {
    const self = this;
    const componentData = nextProps.componentData;
    if (nextProps.isLoggedIn !== this.props.isLoggedIn) {
      if (nextProps.isLoggedIn && nextProps.isAccountVerified) {
        this.props.apiActions();
      }
    } else if (componentData) {
      self.slidesArray = [];
      each(componentData, (entitySlides) => {
        if (entitySlides.type === 'page') {
          const tempStoryPropsArray = pageUtils.generatePageFeaturedCardsProps(entitySlides.records);
          each(tempStoryPropsArray, (props, index) => {
            self.slidesArray.push(
              <div key={`Page:${index}`}><PageFeaturedCard {...props} /></div>
            );
          });
        } else if (entitySlides.type === 'opportunity') {
          const tempStoryPropsArray = opportunityUtils.generateOpportunitiesFeaturedCardsProps(entitySlides.records);
          each(tempStoryPropsArray, (props, index) => {
            self.slidesArray.push(
              <div key={`Opportunity:${index}`}><OpportunityFeaturedCard {...props} /></div>
            );
          });
        }
      });
    }
  }

  render() {
    const self = this;
    function generateDOM() {
      if (self.slidesArray.length) {
        let containerSliderOrDiv;
        if (utils.isServer()) {
          containerSliderOrDiv = <div className="my-slider" {...primarySliderSettings}>{ self.slidesArray }</div>;
        } else {
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
  const recordSelector = makeSliderRecordsSelectors();
  return {
    componentData: recordSelector(state, props),
    isLoggedIn: state.get('reducer').get('isLoggedIn'),
    isAccountVerified: state.get('account').get('verification').get('isVerified'),
  };
}

export const PrimaryContentSlider = connect(mapStateToProps)(PrimaryContentSliderStatic);
