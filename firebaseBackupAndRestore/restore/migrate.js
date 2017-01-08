/**
 * Method for forking the migration
 * This migrates the elasticsearch data according to the firebase
 * ==================================================================================
 * @version 1.0, Date: 03 Sept 2016
 * Dev - Rohit Raj
 */
const variables = require('../variables');
const ElasticSearchQuery = require('esq');

function Migrate(elasticSearchClient, firebaseDB) {
  this.firebaseDB = firebaseDB;
  this.elasticSearchClient = elasticSearchClient;
}

Migrate.prototype = {
  search(obj, cb) {
    this.elasticSearchClient.search({
      index: variables.paths.index,
      type: variables.paths.type,
      body: obj }, (error, result) => {
      if (error) {
        /* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
        console.error(error);
      } else {
        cb(result.hits.hits);
      }
    });
  },

  initialize() {
    const ids = ['zeromm', '25under25'];
    const query = new ElasticSearchQuery();
    query.query('query', { terms: { _id: ids } });

    this.search(query.getQuery(), (result) => {
      for (let i = 0; i < result.length; i++) {
        /* eslint-disable */
        const source = result[i]._source;
        const type = result[i]._id;
        /* eslint-enable */
        Object.keys(source).forEach((key) => {
          const value = source[key];
          const newMessage = this.firebaseDB.child(`/events/${type}/${key}`);
          newMessage.set(value);
        });
      }
    });
    return true;
  },
};


exports.process = (elasticSearchClient, fireBaseUtil) => {
  const migrate = new Migrate(elasticSearchClient, fireBaseUtil);
  return migrate.initialize();
};
