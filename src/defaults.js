/* Block card cover image if not received in API call*/
export const blockCardCoverImage = require('../static/images/thumbs.png');
export const profilePictureThumbnail = require('../static/images/user_neutral.png');
export const pageThumbnail = require('../static/images/thumbs_100_100.png');
/* Default CD logo*/
export const cdlogo = require('../static/images/logo.png');
/* Screen Breakpoints*/
export const breakPointsDefaults = Object.assign({
  mobile: '320',
  largeMobileDevice: '480',
  tablet: '768',
  computer: '992',
  largeMonitor: '1200',
  widescreenMonitor: '1920',
});

/* slick slider settings for primary content slider*/
export const primarySliderSettings = Object.assign({
  dots: true,
  speed: 3000,
  arrows: false,
  autoplay: true,
  lazyLoad: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  pauseOnHover: true,
  adaptiveHeight: true,
  responsive: [{
    breakpoint: 480,
    settings: {
      autoplay: false,
      speed: 500,
    },
  }],

});


export const SideBarSliderSettings = Object.assign({
  dots: true,
  speed: 1000,
  arrows: false,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  pauseOnHover: true,
  responsive: [{
    breakpoint: 480,
    settings: {
      autoplay: false,
    },
  }],

});

/* Component display names to be used to set store state for Discover Page */
/*
pageComponents - list used by reducer to create component variables on store
componentPropsConfig - config object used by util function to add props,
key represents identifier in 'pageComponents' object
*/
export const discoverPageConfig = Object.assign({
  pageComponents: {
    sideBarTopics: 'SideBarTopics',
    sideBarPages: 'SideBarPages',
    sideBarProfiles: 'SideBarProfiles',
    stories: 'DiscoverStories',
    events: 'DiscoverEvents',
    primarySlider: 'PrimaryContentSlider',
  },
  componentPropsConfig: [
    {
      key: 'primarySlider',
      title: 'Featured',
      apiCall: 'fetchPrimarySliderContent',
    },
    {
      tabTitle: 'Topics',
      key: 'sideBarTopics',
    },
    {
      tabTitle: 'Profiles',
      key: 'sideBarProfiles',
    },
    {
      tabTitle: 'Pages',
      key: 'sideBarPages',
    },
    {
      key: 'stories',
      showHeader: true,
      type: 'stories',
      tabTitle: 'Stories',

    },
    {
      key: 'events',
      showHeader: true,
      type: 'events',
      tabTitle: 'Events',
    },
  ],
  parentComponent: 'DiscoverPage',
  reducerName: 'discoverPage',
  totalComponents: 6, // should equal to api calls
});

/* Component display names to be used to set store state for University Page */
/*
pageComponents - list used by reducer to create component variables on store
componentPropsConfig - config object used by util function to add props,
key represents identifier in 'pageComponents' object
*/
export const universityPageConfig = Object.assign({
  pageComponents: {
    sideBarStories: 'SideBarStories',
    pages: 'UniversityRecommended',
    primarySlider: 'PrimaryContentSlider',
    sideBarEvents: 'SideBarEvents',
    searchForm: 'UniversityMastHead',
  },
  componentPropsConfig: [
    {
      key: 'primarySlider',
      sliderEntityType: 'page',
      title: 'Featured Colleges',
      apiCall: 'fetchPrimarySliderContent',
    },
    {
      tabTitle: 'Campus Stories',
      key: 'sideBarStories',
      view: 'SideBar',
      pageName: 'universityPage',
    },
    {
      tabTitle: 'Events',
      key: 'sideBarEvents',
      view: 'SideBar',
      pageName: 'universityPage',
    },
    {
      key: 'pages',
      showHeader: false,
      tabTitle: 'Pages',
      view: 'PrimaryContent',
      type: 'pages',
      pageName: 'universityPage',
    },
    {
      key: 'searchForm',
    },
  ],
  parentComponent: 'UniversityPage',
  reducerName: 'universityPage',
  totalComponents: 4, // should equal to api calls

});


export const eventsPageConfig = Object.assign({
  pageComponents: {
    sideBarTopics: 'SideBarTopics',
    sideBarPages: 'SideBarPages',
    sideBarProfiles: 'SideBarProfiles',
    primarySlider: 'PrimaryContentSlider',
    eventsUpcoming: 'EventsUpcoming',
    eventsPast: 'EventsPast',
    searchForm: 'EventHead',
    eventSearch: 'EventSearch',
  },
  componentPropsConfig: [
    {
      tabTitle: 'Topics',
      key: 'sideBarTopics',
    },
    {
      tabTitle: 'Active Venues and Organizers',
      key: 'sideBarPages',
    },
    {
      tabTitle: 'Recent Attendees/Participants',
      key: 'sideBarProfiles',
    },
    {
      title: 'Events You Must Attend',
      apiCall: 'fetchPrimarySliderContent',
      key: 'primarySlider',
    },
    {
      key: 'eventsUpcoming',
      apiCall: 'fetchUpcomingEvents',
      type: 'events',
    },
    {
      key: 'eventsPast',
      apiCall: 'fetchPastEvents',
      type: 'events',
    },
    {
      key: 'searchForm',
    },
    {
      key: 'eventSearch',
      type: 'events',
    },
  ],
  parentComponent: 'EventsPage',
  reducerName: 'eventsPage',
  totalComponents: 7,
});

/* Component display names to be used to set store state for Landing Page */
export const landingPageConfig = Object.assign({
  pageComponents: {
    sideBarTopics: 'SideBarTopics',
    sideBarPages: 'SideBarPages',
    sideBarProfiles: 'SideBarProfiles',
    stories: 'DiscoverStories',
    events: 'DiscoverEvents',
    primarySlider: 'PrimaryContentSlider',
    pageView: 'LandingPageView',
  },
  componentPropsConfig: [
    {
      key: 'primarySlider',
      title: 'Featured',
      apiCall: 'fetchPrimarySliderContent',
    },
    {
      tabTitle: 'Topics',
      key: 'sideBarTopics',
    },
    {
      tabTitle: 'Profiles',
      key: 'sideBarProfiles',
    },
    {
      tabTitle: 'Pages',
      key: 'sideBarPages',
    },
    {
      key: 'stories',
      showHeader: true,
      type: 'stories',
      tabTitle: 'Stories',
    },
    {
      key: 'events',
      showHeader: true,
      type: 'events',
      tabTitle: 'Events',
    },
    {
      key: 'pageView',
    },
  ],
  parentComponent: 'LandingPage',
  reducerName: 'landingPage',
  totalComponents: 6,
});

/* Component display names to be used to set store state for Home Page */
export const homePageConfig = Object.assign({
  pageComponents: {
    sideBarTrendingStories: 'sideBarTrendingStories',
    sideBarSlider: 'SideBarSlider',
    sideBarProfiles: 'SideBarProfiles',
    HomePageFeed: 'HomePageFeed',
    ShareFeed: 'ShareFeed',
    HomePageFeedEvent: 'HomePageFeedEvent',
    HomePageFeedStory: 'HomePageFeedStory',
  },
  componentPropsConfig: [
    {
      tabTitle: 'User Profile',
      key: 'sideBarProfiles',
    },
    {
      tabTitle: 'Trending',
      key: 'sideBarTrendingStories',
    },
    {
      key: 'HomePageFeed',
    },
    {
      tabTitle: 'Events',
      key: 'sideBarSlider',
      apiCall: 'fetchSidebarSliderData',
    },
    {
      key: 'ShareFeed',
    },
    {
      key: 'HomePageFeedEvent',
    },
    {
      key: 'HomePageFeedStory',
    },
  ],
  parentComponent: 'HomePage',
  reducerName: 'homePage',
  totalComponents: 3,
});

export const opportunitiesPageConfig = Object.assign({
  pageComponents: {
    primarySlider: 'PrimaryContentSlider',
    weeklyOpportunities: 'WeeklyOpportunities',
    internships: 'Internships',
    fullTime: 'FullTime',
    partTimeFreelance: 'PartTimeFreelance',
    scholarships: 'Scholarships',
    fellowships: 'Fellowships',
    campusAmbassador: 'CampusAmbassador',
    collaboration: 'Collaboration',
    sideBarPages: 'SideBarPages',
    sideBarLocations: 'SideBarLocations',
    sideBarWorkAreas: 'SideBarWorkAreas',
    sideBarSkills: 'SideBarSkills',
    searchForm: 'OpportunitiesMastHead',
    searchedOpportunities: 'SearchedOpportunities',
  },
  componentPropsConfig: [
    {
      title: 'Featured',
      apiCall: 'fetchPrimarySliderContent',
      key: 'primarySlider',
      sliderEntityType: 'opportunity',
      view: 'PrimarySlider',
      pageName: 'opportunitiesPage',
    },
    {
      key: 'weeklyOpportunities',
      apiCall: 'fetchWeeklyOpportunities',
      type: 'opportunities',
      view: 'WeeklyOpportunities',
      pageName: 'opportunitiesPage',
    },
    {
      key: 'internships',
      apiCall: 'fetchInternships',
      type: 'opportunities',
      view: 'Internships',
      pageName: 'opportunitiesPage',
    },
    {
      key: 'fullTime',
      apiCall: 'fetchFullTime',
      type: 'opportunities',
      view: 'FullTime',
      pageName: 'opportunitiesPage',
    },
    {
      key: 'partTimeFreelance',
      apiCall: 'fetchPartTimeFreelance',
      type: 'opportunities',
      view: 'PartTimeFreelance',
      pageName: 'opportunitiesPage',
    },
    {
      key: 'scholarships',
      apiCall: 'fetchScholarships',
      type: 'opportunities',
      view: 'Scholarships',
      pageName: 'opportunitiesPage',
    },
    {
      key: 'fellowships',
      apiCall: 'fetchFellowships',
      type: 'opportunities',
      view: 'Fellowships',
      pageName: 'opportunitiesPage',
    },
    {
      key: 'campusAmbassador',
      apiCall: 'fetchCampusAmbassador',
      type: 'opportunities',
      view: 'CampusAmbassador',
      pageName: 'opportunitiesPage',
    },
    {
      key: 'collaboration',
      apiCall: 'fetchCollaboration',
      type: 'opportunities',
      view: 'Collaboration',
      pageName: 'opportunitiesPage',
    },
    {
      key: 'sideBarPages',
      tabTitle: 'Top Companies',
      view: 'SideBar',
      pageName: 'opportunitiesPage',
    },
    {
      key: 'sideBarLocations',
      apiCall: 'fetchSideBarLocations',
      view: 'SideBarLocations',
      pageName: 'opportunitiesPage',
    },
    {
      key: 'sideBarWorkAreas',
      apiCall: 'fetchSideBarWorkAreas',
      view: 'SideBarWorkAreas',
      pageName: 'opportunitiesPage',
    },
    {
      key: 'sideBarSkills',
      apiCall: 'fetchSideBarSkills',
      view: 'SideBarSkills',
      pageName: 'opportunitiesPage',
    },
    {
      key: 'searchForm',
      view: 'SearchForm',
      pageName: 'opportunitiesPage',
    },
    {
      key: 'searchedOpportunities',
      type: 'opportunities',
      view: 'SearchedOpportunities',
      pageName: 'opportunitiesPage',
    },
  ],
  parentComponent: 'OpportunitiesPage',
  reducerName: 'opportunities',
  totalComponents: 4,
});

export const opportunityViewPageConfig = Object.assign({
  pageComponents: {
    opportunityTitleCard: 'OpportunityTitleCard',
    opportunityDetailsCard: 'OpportunityDetailsCard',
    sideBarSimilarOpportunities: 'SideBarSimilarOpportunities',
    sideBarAuthorTeaser: 'SidebarAuthorTeaser',
    sideBarAuthorDetails: 'SideBarAuthorDetails',
    sideBarOpportunityAuthor: 'SideBarOpportunityAuthor',
    secondaryTitleBarAuthor: 'SecondaryTitleBarAuthor',
    secondaryTitleBarOpportunity: 'SecondaryTitleBarOpportunity',
    secondaryTitleBarOpportunityName: 'SecondaryTitleBarOpportunityName',
  },
  componentPropsConfig: [
    {
      key: 'opportunityTitleCard',
      view: 'OpportunityTitleCard',
      pageName: 'opportunityViewPage',
    },
    {
      key: 'opportunityDetailsCard',
      view: 'OpportunityDetailsCard',
      pageName: 'opportunityViewPage',
    },
    {
      key: 'sideBarOpportunityAuthor',
      view: 'SideBarOpportunityAuthor',
      pageName: 'opportunityViewPage',
    },
    {
      key: 'sideBarAuthorDetails',
      view: 'SideBarAuthorDetails',
      pageName: 'opportunityViewPage',
    },
    {
      key: 'sideBarSimilarOpportunities',
      view: 'SideBarSimilarOpportunities',
      pageName: 'opportunityViewPage',
    },
    {
      key: 'secondaryTitleBarAuthor',
      view: 'SecondaryTitleBarAuthor',
      pageName: 'opportunityViewPage',
    },
    {
      key: 'secondaryTitleBarOpportunity',
      view: 'SecondaryTitleBarOpportunity',
      pageName: 'opportunityViewPage',
    },
    {
      key: 'secondaryTitleBarOpportunityName',
      view: 'SecondaryTitleBarOpportunityName',
      pageName: 'opportunityViewPage',
    },
  ],
  parentComponent: 'opportunityDetails',
  reducerName: 'opportunities',
  totalComponents: 1,
});

export const viewPageConfig = Object.assign({
  opportunityViewPage: {
    opportunityComponents: ['opportunityViewPageOpportunityTitleCard', 'opportunityViewPageOpportunityDetailsCard', 'opportunityViewPageSecondaryTitleBarOpportunity', 'opportunityViewPageSecondaryTitleBarOpportunityName'],
    pageComponents: ['opportunityViewPageSecondaryTitleBarAuthorPages', 'opportunityViewPageSideBarAuthorDetailsPages', 'opportunityViewPageSideBarOpportunityAuthorPages'],
  },
});

export const changeHtmlToString = function (stringData) {
  const isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
  if (isHTML(stringData)) {
    return stringData.replace(/<\/?[^>]+(>|$)/g, '');
  } else {
    return stringData;
  }
};
