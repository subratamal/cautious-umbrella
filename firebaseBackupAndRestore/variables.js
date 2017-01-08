/**
 * This config file is provided as a convenience for development. You can either
 * set the environment variables on your server or modify the values here.
 * At a minimum, you must set FB_URL and Paths to Monitor. Everything else is optional,
 * assuming your
 * ElasticSearch server is at localhost:9200.
 * ==================================================================================
  * @version 1.0, Date: 03 Sept 2016
  * Dev - Rohit Raj
 */

/** Firebase Settings **/

let ES_HOST;
let ES_PORT;
let ES_USER;
let ES_PASS;

function processBonsaiUrl(exports, url) {
  const matches = url.match(/^https?:\/\/([^:]+):([^@]+)@([^/]+)\/?$/);
  ES_HOST = matches[3];
  ES_PORT = 80;
  ES_USER = matches[1];
  ES_PASS = matches[2];
}

/** ElasticSearch Settings ***/

if (process.env.BONSAI_URL) {
  processBonsaiUrl(exports, process.env.BONSAI_URL);
} else {
  // ElasticSearch server's host URL
  ES_HOST = process.env.ES_HOST || 'localhost';

  // ElasticSearch server's host port
  ES_PORT = process.env.ES_PORT || '9200';

  // ElasticSearch username for http auth
  ES_USER = process.env.ES_USER || null;

  // ElasticSearch password for http auth
  ES_PASS = process.env.ES_PASS || null;
}

/* eslint object-shorthand: [2, "consistent"]*/
exports.esConf = {
  ES_HOST: ES_HOST,
  ES_PORT: ES_PORT,
  ES_USER: ES_USER,
  ES_PASS: ES_PASS,
};

/** Paths to Monitor
 *
 * Each path can have these keys:
 * {string}   path:    [required] the Firebase path to be monitored, for example, `users/profiles`
 *                     would monitor https://<instance>.firebaseio.com/users/profiles
 * {string}   index:   [required] the name of the ES index to write data into
 * {string}   type:    [required] name of the ES object type this document will be stored as
 * {Array}    fields:  list of fields to be monitored and indexed (defaults to all fields,
 *                     ignored if 'parser' is specified)
 * {Array}    omit:    list of fields that should not be indexed in ES (ignored if 'parser'
 *                     is specified)
 * {Function} filter:  if provided, only records that return true are indexed
 * {Function} parser:  if provided, the results of this function are passed to ES, rather
 *                      than the raw data (fields is ignored if this is used)
 *
 * To store your paths dynamically, rather than specifying them all here, you can store them in
 * Firebase.
 * Format each path object with the same keys described above, and store the array of paths at
 * whatever
 * location you specified in the FB_PATHS variable. Be sure to restrict that data in your
 * Security Rules.
 ****************************************************/

exports.paths = [{
  path: 'events',
  index: 'events',
  type: 'event',
}];

// Paths can also be stored in Firebase and loaded using FB_PATHS!
exports.FB_PATH = process.env.FB_PATHS || null;
