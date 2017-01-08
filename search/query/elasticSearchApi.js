/**
  * This file is for providing an API interface for handling elastic search queries.
  * It receives the query through a "GET/POST/OPTIONS" method, searches the elastic search and
  * then returns the result
  * [IMP] Acceptable query format: All the query format that the elastic search handles directly
  * is acceptable for this API
  * the following method type with the query type is acceptable
  * Listening at ELASTICSEARCH_URL:5001
  * ==================================================================================
  * GET : "http://localhost:5001/v1/pages?fields=group_teaser&limit=10&offset=0&type=page&title=iit"
  * OPTIONS : "http://localhost:5001/v1/pages?fields=group_teaser&limit=10&offset=0&type=page&title=iit"
  * POST :
  * "query": {
  *   "bool": {
  *     "should": [
  *       {
  *         "simple_query_string": {
  *           "query": "iit",
  *           "fields": [
  *             "page"
  *           ]
  *         }
  *       }
  *     ]
  *   }
  * }
  * ==================================================================================
  * @version 1.0, Date: 26 Aug 2016
  * Dev - Rohit Raj
  */

const ElasticSearch = require('elasticsearch');
const conf = require('./../variables');
const mapper = require('./../config/mappingsConfig');

const ElasticSearchQuery = require('esq');
const url = require('url');
const http = require('http');

// connect to ElasticSearch
const elasticSearchClient = new ElasticSearch.Client({
  hosts: [{
    host: conf.esConf.ES_HOST,
    port: conf.esConf.ES_PORT,
    auth: (conf.esConf.ES_USER && conf.esConf.ES_PASS) ? `${conf.esConf.ES_USER} :
    ${conf.esConf.ES_PASS}` : null }],
});

function search(obj, request, result) {
  const urlParts = url.parse(request.url, true);
  const esIndex = urlParts.pathname.split('/')[2];
  const profiles = mapper.profiler;
  let profile = profiles.page; // page is the default value if profile is empty
  Object.keys(profiles).forEach((key) => {
    if (profiles[key].index === esIndex) {
      profile = profiles[key];
    }
  });

  elasticSearchClient.search({
    index: profile.index,
    type: profile.type,
    body: obj }, (error, cb) => {
    if (error) {
      // error in fetching the search data
    } else {
      result(cb);
    }
  });
}

function fulfillPostMethod(jsonObject, request, response) {
  search(jsonObject, request, (result) => {
      /* eslint-disable */
    response.statusCode = 200;
    /* eslint-enable */
    response.setHeader('Access-Control-Allow-Origin', request.headers.origin ? request.headers.origin : '*'); /* eslint max-len: ["error", 150]*/
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    response.write(JSON.stringify(result));
    response.end();
  });
}

/**
 * This function builds the query from the client data to search in ElasticSearch
 */
function buildAndSearch(obj, cb) {
  let queryTerm = '';
  let searchType = '';
  let qsize = 5;
  const subType = [];
  const locations = [];
  const query = new ElasticSearchQuery();
  Object.keys(obj).forEach((attributeName) => {
    if (attributeName && attributeName === 'title') {
      queryTerm = obj[attributeName];
    }
    if (attributeName && attributeName === 'type') {
      searchType = obj[attributeName];
    }
    if (attributeName && attributeName === 'limit') {
      qsize = obj[attributeName];
    }
    if (attributeName && attributeName === 'subtype') {
      if (obj[attributeName].indexOf(',') !== -1) {
        const types = obj[attributeName].split(',');
        for (let i = 0; i < types.length; i++) {
          subType[i] = types[i];
        }
      } else {
        subType[0] = obj[attributeName];
      }
    }
    if (attributeName && attributeName === 'location.city') {
      // console.log(attributeName, ' : ' ,obj[attributeName]);
      if (obj[attributeName].indexOf(',') !== -1) {
        const places = obj[attributeName].split(',');
        for (let i = 0; i < places.length; i++) {
          locations[i] = places[i].toLowerCase();
        }
      } else {
        locations[0] = obj[attributeName].toLowerCase();
      }
    }
  });
  const profile = mapper.profiler[searchType];
  // Must is used only for getting the query very specific to the type
  // query.query('query', 'bool', ['must'], { match: { status: 1 } });

  if (queryTerm === '') {
    query.query('query', 'bool', 'should', [{ match_all: {} }]);
  } else {
    query.query('query', 'bool', 'should', [{ simple_query_string:
      { query: queryTerm, fields: ['title'], minimum_should_match: '100%' } },
      { multi_match: { query: queryTerm,
        type: 'phrase_prefix',
        fields: ['title^10'] } }]);
  }
  if (locations.length) {
    const subQuery = new ElasticSearchQuery();
    subQuery.query(['or'], 'terms', { 'location.city': locations });
    subQuery.query(['or'], 'terms', { 'location.formatted_address': locations });
    query.query('filter', ['and'], subQuery.getQuery());
  }

  if (subType.length) {
    query.query('filter', ['and'], 'terms', { subtype: subType });
  }

  query.query('filter', ['and'], 'term', { status: 1 });

  query.query('size', qsize);

  // console.log(JSON.stringify(query.getQuery(), null, ' '));   // Print the query generated

  elasticSearchClient.search({
    index: profile.index,
    type: profile.type,
    body: query.getQuery(),
  }, (error, result) => {
    if (error) {
      // error while searhing
    } else {
      cb(result.hits.hits);
    }
  });
}

/**
 * This function is just for sending the response back to the client, with the search result
 * It passes on the queries from the client to the query builder to build and search
 */
function fulfill(jsonObject, request, response) {
  buildAndSearch(jsonObject, (result) => {
    const source = [];
    for (let i = 0; i < result.length; i++) {
      const src = result[i]._source; /* eslint no-underscore-dangle: ["error", {
      "allow":["_source"] }]*/
      /* eslint-disable */
      source.push(src);
    }


    /* eslint-disable */
    response.statusCode = 200;
    /* eslint-enable */
    response.setHeader('Access-Control-Allow-Origin', request.headers.origin ? request.headers.origin : '*'); /* eslint max-len: ["error", 150]*/
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // if after filtering there is no result to display then put the message
    if (source.length === 0) {
      const src = {
        Message: 'No records found.' };
      response.write(JSON.stringify(src));
    } else {
      response.write(JSON.stringify(source));
    }
    response.end();
  });
}

// We need a function which handles requests and send response
function handleRequest(request, response) {
  if (request.method === 'POST') {
    request.on('data', (chunk) => {
      const originalData = chunk.toString();
      // if the query is more than 1MB
      if (originalData.length > 1e6) {
        const src = {
          Message: 'No records found.' };
        /* eslint-disable */
        response.statusCode = 200;
        /* eslint-enable */
        response.setHeader('Access-Control-Allow-Origin', request.headers.origin ? request.headers.origin : '*'); /* eslint max-len: ["error", 150]*/
        response.setHeader('Access-Control-Allow-Credentials', true);
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        response.write(JSON.stringify(src));
        response.end();
      } else {
        fulfillPostMethod(originalData, request, response);
      }
    });
  } else if (request.method === 'GET') {
    const urlParts = url.parse(request.url, true);
    const requestQueryJson = urlParts.query;
    fulfill(requestQueryJson, request, response);
  } else if (request.method === 'OPTIONS') {
    /* eslint-disable */
    response.statusCode = 200;
    /* eslint-enable */
    response.setHeader('Access-Control-Allow-Origin', request.headers.origin ? request.headers.origin : '*'); /* eslint max-len: ["error", 150]*/
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    response.end();
  } else {
    const src = {
      Message: 'No records found.' };
    /* eslint-disable */
    response.statusCode = 200;
    /* eslint-enable */
    response.setHeader('Access-Control-Allow-Origin', request.headers.origin ? request.headers.origin : '*'); /* eslint max-len: ["error", 150]*/
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    response.write(JSON.stringify(src));
    response.end();
  }
}

// Create a server
const server = http.createServer(handleRequest);

// Lets start our server
server.listen(conf.ES_API_PORT, () => {
  // Callback triggered when server is successfully listening. Hurray!
  /* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
  console.log('ElasticSearch listening on: http://localhost:%s', conf.ES_API_PORT);
});
