/* Constants used for test cases */
export const loginFormTestValues = Object.assign({
  usernameEmailFailure: 'a@b',
  usernameEmailSuccess: 'sonic@gmailtest.com',
  passwordLengthFailure: 'abc12',
  passwordLengthSuccess: 'abc123',
});

export const page_mini_teaser = Object.freeze({
  id: '123',
  display_picture: {
    large: require('../static/images/user_neutral.png'),
  },
  type: 'pages',
  title: 'Page',
  location: {
    city: 'city',
  },
});
export const profile_mini_teaser = Object.freeze({
  id: '123',
  display_picture: {
    large: require('../static/images/user_neutral.png'),
  },
  type: 'users',
  name: 'User Name',
  current_campus: {
    data: [{
      rel_value: 'Campus Name',
    }],
  },
});
export const story_mini_teaser = Object.freeze({
  id: '123',
  cover_picture: {
    image_100_100: require('../static/images/user_neutral.png'),
  },
  type: 'users',
  name: 'User Name',
  current_campus: {
    data: [{
      rel_value: 'Campus Name',
    }],
  },
});
export const event_mini_teaser = Object.freeze({
  id: '123',
  cover_picture: {
    image_100_100: require('../static/images/user_neutral.png'),
  },
  type: 'users',
  name: 'User Name',
  current_campus: {
    data: [{
      rel_value: 'Campus Name',
    }],
  },
});

export const reducerTestValues = Object.assign({
  user_name: 'sonicyx',
  user_email: 'sonic@gmailtest.com',
});

export const interactivityCardValues
 = Object.assign({

   'saveText': 'Save',
   'savedText': 'Saved',

 });
export const interactivity_card_props = Object.assign({
  componentName: 'DiscoverStories',
  parentComponent: 'DiscvoerPage',
  reducerName: 'discoverPage',
  storeIndex: 0,
});

export const teaserCardValues = Object.assign({
  'primaryText': 'primary text',
  'secondaryText': 'secondary text',
  'buttonText': 'button text',
});
export const miniTeaserCardValues = Object.assign({
  'primaryText': 'Primary Text',
  'secondaryText': 'Secondary Text',
});
// remove blovkCard values
export const blockCardValues = Object.assign({
  'primaryText': 'Primary Text',
  'secondaryText': 'Secondary Text',
  'buttonText': 'button text',
  'cardClasses': ['test1', 'test2'],
  'cardClassesApplied': ['test1', 'test2'],
});
export const eventBlockCardValues = Object.assign({
  event: {
    'primaryText': 'Primary Text',
    'secondaryText': 'Secondary Text',
    'buttonText': 'button text',
    'cardClasses': ['test1', 'test2'],
    'cardClassesApplied': ['test1', 'test2'],
  },
  interactivityCardContent: {
    componentName: 'DiscoverEvents',
    parentComponent: 'DiscvoerPage',
    reducerName: 'discoverPage',
    storeIndex: 0,
  },
});
export const storyBlockCardValues = Object.assign({
  'primaryText': 'TestHeader',
  'secondaryTextUnixDate': '1462880865',
  'secondaryTextRenderedDate': '10 May, 2016',
  'cardClasses': ['hide-block-card-shadow', 'hide-teaser'],
  'cardClassesApplied': 'hide-block-card-shadow hide-teaser',
  interactivityCardContent: {
    componentName: 'DiscoverStories',
    parentComponent: 'DiscvoerPage',
    reducerName: 'discoverPage',
    storeIndex: 0,
  },
});
export const pageBlockCardValues = Object.assign({
  'primaryText': 'Primary Text',
  'secondaryText': 'Secondary Text',
  'buttonText': 'button text',
  'cardClasses': ['test1', 'test2'],
  'cardClassesApplied': ['test1', 'test2'],
  followButtonData: {
    componentName: 'UniversityRecommended',
    parentComponent: 'UniversityPage',
    reducerName: 'universityPage',
    storeIndex: 0,
  },
});
export const profileBlockCardValues = Object.assign({
  primaryText: 'Primary Text',
  secondaryText: 'Secondary Text',
  buttonText: 'button text',
  cardClasses: ['test1', 'test2'],
  cardClassesApplied: ['test1', 'test2'],
  connectButtonData: {
    componentName: 'UniversityRecommended',
    parentComponent: 'UniversityPage',
    reducerName: 'universityPage',
    storeIndex: 0,
  },
});

export const pageFeaturedCardCardValues = Object.assign({
  pages: {
    'primaryText': 'Primary Text',
    'secondaryText': 'Secondary Text',
    'buttonText': 'button text',
    'cardClasses': ['test1', 'test2'],
    'cardClassesApplied': ['test1', 'test2'],
    followButtonData: {
      componentName: 'PrimaryContentSlider',
      parentComponent: 'UniversityPage',
      reducerName: 'universityPage',
      storeIndex: 0,
      sliderDataIndex: 0,
    },
  },

});
export const eventFeaturedCardValues = Object.assign({
  event: {
    'primaryText': 'Primary Text',
    'secondaryText': 'Secondary Text',
    'buttonText': 'button text',
    'cardClasses': ['test1', 'test2'],
    'cardClassesApplied': ['test1', 'test2'],
  },
  interactivityCardContent: {
    componentName: 'PrimaryContentSlider',
    parentComponent: 'DiscvoerPage',
    reducerName: 'discoverPage',
    storeIndex: 0,
    sliderDataIndex: 1,
  },
});

export const storyFeaturedCardValues = Object.assign({
  story: {
    'primaryText': 'Primary Text',
    'secondaryText': 'Secondary Text',
    'buttonText': 'button text',
    'cardClasses': ['test1', 'test2'],
    'cardClassesApplied': ['test1', 'test2'],
  },
  interactivityCardContent: {
    componentName: 'PrimaryContentSlider',
    parentComponent: 'DiscvoerPage',
    reducerName: 'discoverPage',
    storeIndex: 0,
    sliderDataIndex: 1,
  },
});

export const homePageFeedCardValues = Object.assign({
  body: {
    imageOnClickLink: '#',
    imageSource: require('../static/images/user_neutral.png'),
    primaryTextOnClickLink: '#',
    primaryText: 'CD Exclusive',
    secondaryTextOnClickLink: '#',
    secondaryText: 'campus Diaries',
    updatedTime: '10-oct-2013',
    recommendCount: '1',
    commentCount: '1',
    type: 'story',
    interactivityCardData: {
      componentName: 'HomePageFeed',
      parentComponent: 'HomePage',
      reducerName: 'homePage',
      storeIndex: 0,
      homeFeed: true,
    },
  },

});


/*
raw data to mimic structre of data recieved from server
used to set on the store for test cases to succeed
*/


export const event_block_card_teaser = Object.freeze({
  id: '123',
  cover_picture: {
    image_100_100: require('../static/images/user_neutral.png'),
  },
  author: {
    'href': '',
    'data': [{
      'id': '',
      'name': '',
      'display_picture': {
        'thumbnail': '',
        'medium': '',
        'large': '',
        'image_100_100': '',
        'cover_explore': '',
        'cdin_responsive_cover_image_full__default': '',
        'cdin_responsive_cover_image_full__style720': '',
      },
      'href': '',
      'type': 'profile',
      'connected': 'no',
      'connection_rel_id': '',
      'current_campus': {
        'href': '',
        'data': [{
          'rel_value': 'College of Technology and Engineering',
          'id': '7aed7979-fd9f-489c-8039-b6f766cbeaca',
          'href': 'https://cddev.in/v1/pages/7aed7979-fd9f-489c-8039-b6f766cbeaca',
          'type': 'page',
        }],
      },
    }],
  },
  type: 'users',
  name: 'User Name',
  current_campus: {
    data: [{
      rel_value: 'Campus Name',
    }],
  },
});
