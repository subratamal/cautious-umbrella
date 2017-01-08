const commentsMapping = require('./mappings/commentsMapping');
const pagesMapping = require('./mappings/pagesMapping');
const storiesMapping = require('./mappings/storiesMapping');
const circularsMapping = require('./mappings/circularsMapping');
const accountsMapping = require('./mappings/accountsMapping');
const eventsMapping = require('./mappings/eventsMapping');
const opportunitiesMapping = require('./mappings/opportunitiesMapping');
const profilesMapping = require('./mappings/profilesMapping');
const skillsMapping = require('./mappings/skillsMapping');
const topicsMapping = require('./mappings/topicsMapping');

exports.profiler = {
  comment: {
    type: 'comment',
    index: 'comments',
    mapping: commentsMapping,
  },
  page: {
    type: 'page',
    index: 'pages',
    mapping: pagesMapping,
  },
  story: {
    type: 'story',
    index: 'stories',
    mapping: storiesMapping,
  },
  account: {
    type: 'account',
    index: 'accounts',
    mapping: accountsMapping,
  },
  circular: {
    type: 'circular',
    index: 'circulars',
    mapping: circularsMapping,
  },
  event: {
    type: 'event',
    index: 'events',
    mapping: eventsMapping,
  },
  profile: {
    type: 'profile',
    index: 'profiles',
    mapping: profilesMapping,
  },
  opportunities: {
    type: 'opportunity',
    index: 'opportunities',
    mapping: opportunitiesMapping,
  },
  skill: {
    type: 'skill',
    index: 'skills',
    mapping: skillsMapping,
  },
  topic: {
    type: 'topic',
    index: 'topics',
    mapping: topicsMapping,
  },
};
