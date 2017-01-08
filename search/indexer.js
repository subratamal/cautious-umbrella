#!/usr/bin/env node

/**
 * TODO - figure out the requestTimeout for indexing all the data from the fire base
 * https://campus-diaries.atlassian.net/browse/CWM-215
 * Issue : CWM-215
 * ==================================================================================
 * @version 1.0, Date: 24 Aug 2016
 * This is the entry point for the indexer
 */

const ElasticSearch = require('elasticsearch');
const variables = require('./variables');
const fireBaseUtil = require('./lib/fireBaseUtil');
const pathMonitor = require('./lib/pathMonitor');
const serviceAcc = require('./config/firebaseServiceAccountKey');
const firebaseConfig = require('./config/firebaseConfig');

// connect to ElasticSearch
const elasticSearchClient = new ElasticSearch.Client({
  hosts: [{
    host: variables.esConf.ES_HOST,
    port: variables.esConf.ES_PORT,
    auth: (variables.esConf.ES_USER && variables.esConf.ES_PASS) ? `${variables.esConf.ES_USER} :
    ${variables.esConf.ES_PASS}` : null }],
  requestTimeout: 120000000 /* 2000 mins*/ });

// console.log('Connected to ElasticS host %s:%s'.grey, variables.esConf.ES_HOST, variables.esConf.ES_PORT);
fireBaseUtil.init(firebaseConfig.firebaseConfig, serviceAcc.service_account);
pathMonitor.process(elasticSearchClient, variables.paths, variables.FB_PATH);
