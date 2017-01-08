import React from 'react';
import Slider from 'react-slick';
import { Item, Divider } from 'react-semantify';
import { breakPointsDefaults } from '../defaults';


Number.isInteger = Number.isInteger || function check(value) {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
};

export default class SwipeViews extends React.Component {

  constructor(props) {
    super(props);
    this.views = this.props.children;
    const selectedIndex = this.props.selectedIndex || 0;
    const numChildren = React.Children.count(this.views);
    const pageWidthPerCent = 100 / numChildren;
    const translation = selectedIndex * pageWidthPerCent;
    this.state = {
      selectedIndex,
      pageWidthPerCent,
      translation,
      clientX: null,
      animate: true,
      pageWidth: window.innerWidth,
      sliderGoTo: {},
    };
  }

  componentDidMount() {
    this.selectIndex();
  }

  componentWillReceiveProps(nextProps) {
    this.views = [];
    React.Children.map(nextProps.children, (child) => {
      if (!child.props.emptyState) {
        this.views.push(child);
      }
    });
    let currentIndex;
    const numChildren = React.Children.count(this.views);
    const pageWidthPerCent = 100 / numChildren;
    this.setState({ pageWidthPerCent: pageWidthPerCent });
    this.selectIndex(parseInt(nextProps.selectedIndex, 10));
    if (typeof event !== 'undefined' && event.target.parentElement !== undefined) {
      currentIndex = parseInt(event.target.parentElement.getAttribute('data-index'), 10);
    } else {
      currentIndex = this.state.selectedIndex;
    }

    const slickCount = (currentIndex) - 1;
    const sliderGoto = {
      slickGoTo: slickCount,
    };
    if (this.state.pageWidth < parseInt(breakPointsDefaults.largeMobileDevice),10) {
      if (slickCount >= 0 && currentIndex < this.props.children.length - 1) {
        this.setState({
          sliderGoTo: sliderGoto,
        });
      }
    }
  }

  selectIndex(selectedIndex) {
    if (Number.isInteger(selectedIndex)) {
      const translation = selectedIndex * this.state.pageWidthPerCent;
      return this.setState({
        selectedIndex,
        translation,
        clientX: null,
        animate: true,
      });
    }
    if (!this.context.router) {
      return null;
    }
    return null;
  }

  transitionTo(selectedIndex) {
    if (this.props.onIndexChange) {
      this.props.onIndexChange(selectedIndex);
    }
    if (!this.context.router) {
      return null;
    }
    return null;
  }

  _handleTouchMove(event) {
    const clientX = event.changedTouches[0].clientX;
    const dx = (clientX - this.state.clientX);
    const numChildren = React.Children.count(this.views);
    const dxPerCent = dx / ((this.state.pageWidth * numChildren) * 100);
    let translation = this.state.translation - dxPerCent;
    const maxTranslation = this.state.pageWidthPerCent * (numChildren - 1);
    let selectedIndex = this.state.selectedIndex;
    const previousTranslation = selectedIndex * this.state.pageWidthPerCent;
    const tippingPoint = this.state.pageWidthPerCent * 0.3;

    if (!this.state.clientX) {
      return this.setState({
        clientX,
      });
    }

    if (translation < 0) {
      translation = 0;
    } else if (translation > maxTranslation) {
      translation = maxTranslation;
    }

    if (dx > 0 && translation < previousTranslation - tippingPoint) {
      selectedIndex -= 1;
    } else if (dx < 0 && translation > previousTranslation + tippingPoint) {
      selectedIndex += 1;
    }

    this.setState({
      selectedIndex,
      translation,
      clientX,
      animate: false,
    });
    return null;
  }

  _handleClick(selectedIndex, event) {
    const translation = selectedIndex * this.state.pageWidthPerCent;
    this.setState({
      selectedIndex,
      translation,
      clientX: null,
      animate: true,
    });
    if (event.target.localName === 'a') {
      this.transitionTo(selectedIndex);
    }
  }

  _handleTouchEnd() {
    const selectedIndex = this.state.selectedIndex;
    const translation = selectedIndex * this.state.pageWidthPerCent;
    this.setState({
      selectedIndex,
      translation,
      clientX: null,
      animate: true,
    }, this.transitionTo(selectedIndex));
  }

  _handleScroll() {
    const selectedIndex = this.state.selectedIndex;
    const translation = selectedIndex * this.state.pageWidthPerCent;
    this.setState({
      selectedIndex,
      translation,
      clientX: null,
      animate: true,
    });
  }

  render() {
    const numChildren = React.Children.count(this.views);
    const swipeViewsInkStyle = {
      width: `${this.state.pageWidthPerCent}%`,
      marginLeft: `${this.state.translation}%`,
      transitionProperty: this.state.animate ? 'all' : 'none',
    };
    const swipeViewsStyle = {
      transform: 'translateX(-' + this.state.translation + '%)',
      WebkitTransform: 'translateX(-' + this.state.translation + '%)',
      transitionProperty: this.state.animate ? 'all' : 'none',
      WebkitTransitionProperty: this.state.animate ? 'all' : 'none',
      width: React.Children.count(this.views) * 100 + '%',
    };
    const sliderSettings = {
      dots: false,
      infinite: false,
      speed: 500,
      arrows: false,
      variableWidth: true,
      autoplay: false,
      slidesToShow: 7,
      slidesToScroll: 1,
      swipe: false,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            arrows: numChildren > 3,
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div className="SwipeViewsContainer">
        <header className="SwipeViewsHeader">
          <div className="SwipeViewsTabs tabs-secondary-menu">
            <Slider {...sliderSettings} className="tab-slider">
              {React.Children.map(this.views, (child, index) => {

                if(!child.props.emptyState){
                  const className = (index === this.state.selectedIndex ? 'active' : '');
                return (
                  <Item
                    key={index}
                    ref="tabs"
                    className={'SwipeViewsTab ' + className}
                    onClick={this._handleClick.bind(this, index)}
                  >
                    {child.props.title}
                  </Item>
                );
                }

              })}
            </Slider>
            <Divider className="hidden"></Divider>
            <div className="SwipeViewsInk" style={swipeViewsInkStyle} />
          </div>
        </header>
        <div
          className="SwipeViews"
          style={swipeViewsStyle}
        >
          {React.Children.map(this.views, (child, index) => {
            if(!child.props.emptyState){
            return (
              <div
                className="SwipeView"
                key={index}
                style={{width: this.state.pageWidthPerCent + '%'}}
                onScroll={this._handleScroll.bind(this)}
              >
                {child.props.children}
              </div>
            );
          }
          })}
        </div>
      </div>
    );
  }

}

SwipeViews.contextTypes = {
  router: function() { return React.PropTypes.object.isRequired; }
};

SwipeViews.propTypes = {
  children: React.PropTypes.array.isRequired,
  selectedIndex: React.PropTypes.number,
  onIndexChange: React.PropTypes.func,
};
