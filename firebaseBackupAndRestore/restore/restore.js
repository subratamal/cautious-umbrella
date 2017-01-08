/**
 * TODO - figure out the requestTimeout for indexing all the data from the fire base
 * https://campus-diaries.atlassian.net/browse/CWM-215
 * Issue : CWM-215
 * ==================================================================================
 * @version 1.0, Date: 03 Sept 2016
 * This is the entry point for the indexer
 */

const ElasticSearch = require('elasticsearch');
const variables = require('../variables');
const migrate = require('./migrate');
const firebase = require('firebase');
const firebaseConfig = require('../config/firebaseConfig');

const serviceAcc = require('../config/firebaseServiceAccountKey');

// connect to ElasticSearch
const elasticSearchClient = new ElasticSearch.Client({
  hosts: [{
    host: variables.esConf.ES_HOST,
    port: variables.esConf.ES_PORT,
    auth: (variables.esConf.ES_USER && variables.esConf.ES_PASS) ? `${variables.esConf.ES_USER} :
    ${variables.esConf.ES_PASS}` : null,
  }],
});

// connect to firebase
const config = {
  serviceAccount: serviceAcc.service_account,
  databaseURL: firebaseConfig.firebaseConfig.databaseURL,
};
firebase.initializeApp(config);

const firebaseDB = firebase.database().ref('/');

const successStatus = migrate.process(elasticSearchClient, firebaseDB);
/* eslint-disable */
if (successStatus) {
  console.log('successfully migrated');
  // process.exit();
} else {
  console.log('migration incomplete');
}
/* eslint-enable */
