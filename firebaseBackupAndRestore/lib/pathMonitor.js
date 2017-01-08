/**
 * Method for forking the indexer
 * This indexes the firebase data according to the config.js paths
 * ==================================================================================
 * @version 1.0, Date: 26 Aug 2016
 * Dev - Rohit Raj
 */
const fireBaseUtil = require('./fireBaseUtil');
const DynamicPathMonitor = require('./dynamicPathMonitor');

function nameFor(path, key) {
  return `${path.index}/${path.type}/${key}`;
}

function parseKeys(data, fields, omit) {
  if (!data || typeof (data) !== 'object') {
    return data;
  }
  let out = data;
  // restrict to specified fields list
  if (Array.isArray(fields) && fields.length) {
    out = {};
    fields.forEach((index) => {
      if ({}.hasOwnProperty.call(data, 'index')) {
        out[index] = data[index];
      }
    });
  }
  // remove omitted fields
  if (Array.isArray(omit) && omit.length) {
    omit.forEach((index) => {
      if ({}.hasOwnProperty.call(out, 'index')) {
        delete out[index];
      }
    });
  }
  return out;
}

function PathMonitor(elasticSearchClient, path) {
  this.ref = fireBaseUtil.fireBaseRef(path.path);
  this.elasticSearchClient = elasticSearchClient;
  this.index = path.index;
  this.type = path.type;
  this.filter = path.filter || function pathMonitorFilter() { return true; };
  this.parse = path.parser ||
  function pathMonitorParse(data) { return parseKeys(data, path.fields, path.omit); };
  return this;
}

PathMonitor.prototype = {
  init() {
    this.addMonitor = this.ref.on('child_added', this.process.bind(this, this.childAdded));
    this.changeMonitor = this.ref.on('child_changed', this.process.bind(this, this.childChanged));
  },

  stop() {
    this.ref.off('child_added', this.addMonitor);
    this.ref.off('child_changed', this.changeMonitor);
    this.ref.off('child_removed', this.removeMonitor);
  },

  process(fn, snap) {
    const dat = snap.val();
    if (this.filter(dat)) {
      fn.call(this, snap.key, this.parse(dat));
    }
  },

  indexer(key, data, callback) {
    this.elasticSearchClient.index({
      index: this.index,
      type: this.type,
      id: key,
      body: data }, (error, response) => {
      if (callback) {
        callback(error, response);
      }
    });
  },

  childAdded(key, data) {
    const name = nameFor(this, key);
    this.indexer(key, data, (error, response) => {
      if (error && response) {
        /* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
        console.error('failed to index %s: %s'.red, name, error);
      } else {
        /* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
        console.log('indexed'.green, name);
        // data(response);
      }
    });
  },

  childChanged(key, data) {
    const name = nameFor(this, key);
    this.indexer(key, data, (error, response) => {
      if (error && response) {
        console.error('failed to update %s: %s'.red, name, error);
      } else {
        console.log('updated'.green, name);
      }
    });
  },
};

exports.process = (elasticSearchClient, paths, dynamicPathUrl) => {
  if (paths) {
    paths.forEach((pathProps) => {
      const pMObject = new PathMonitor(elasticSearchClient, pathProps);
      pMObject.init();
    });
  }
  if (dynamicPathUrl) {
    const dPMObject = new DynamicPathMonitor((pathProps) => {
      const pMObject = new PathMonitor(elasticSearchClient, pathProps);
      pMObject.init();
    });
    dPMObject.init();
  }
};
