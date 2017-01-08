/**
 * Method for forking the indexer
 * This indexes the firebase data according to the config.js paths
 * ==================================================================================
 * @version 1.0, Date: 26 Aug 2016
 * Dev - Rohit Raj
 */
const fireBaseUtil = require('./fireBaseUtil');
const DynamicPathMonitor = require('./dynamicPathMonitor');
const conf = require('../config/mappingsConfig');

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
  this.filter = path.filter || function pathMonitorFilter() { return true; };
  this.parse = path.parser ||
  function pathMonitorParse(data) { return parseKeys(data, path.fields, path.omit); };
  this.profiler = conf.profiler;
  return this;
}

PathMonitor.prototype = {
  init() {
    this.addMonitor = this.ref.on('child_added', this.process.bind(this, this.childAdded));
    this.changeMonitor = this.ref.on('child_changed', this.process.bind(this, this.childChanged));
    this.removeMonitor = this.ref.on('child_removed', this.process.bind(this, this.childRemoved));
  },

  createESMapping() {
    const profiler = this.profiler;
    Object.keys(profiler).forEach((attributeName) => {
      this.checkMapping(profiler[attributeName]);
    });
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

  checkMapping(profile) {
    return this.elasticSearchClient.indices.getMapping({ index: profile.index }, (error) => {
      if (error) {
        const status = error.statusCode;
        if (status === 404) {
          // mapping does not exist, creating mapping
          this.initMapping(profile);
        } if (status === 400) {
          // mapping exist, delete index to create mapping
        }
      }
    });
  },

  initMapping(profile) {
    return this.elasticSearchClient.indices.putMapping({
      index: profile.index,
      body: profile.mapping,
    }, (error, response) => {
      if (error) {
        console.log('error while mapping ', error);
      } else {
        console.log('mapping stored for ', profile.index, ' ', response);
      }
    });
  },

  indexer(key, data, callback) {
    if (typeof (data.type) !== 'undefined') {
      const profile = conf.profiler[data.type];
      this.index = profile.index;
      this.type = profile.type;
      this.elasticSearchClient.index({
        index: this.index,
        type: this.type,
        id: key,
        body: data,
      }, (error, response) => {
        if (callback) {
          callback(error, response);
        }
      });
    }
  },

  childAdded(key, data) {
    const name = nameFor(this, key);
    this.indexer(key, data, (error, response) => {
      if (error) {
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

  childRemoved(key, data) {
    const name = nameFor(this, key);
    this.elasticSearchClient.delete({
      index: this.index,
      type: this.type,
      id: key }, (error, cb) => {
      if (error) {
        console.error('failed to delete %s: %s'.red, name, error);
      } else {
        console.log('deleted'.cyan, name);
        cb(data);
      }
    });
  },
};


exports.process = (elasticSearchClient, paths, dynamicPathUrl) => {
  if (paths) {
    paths.forEach((pathProps) => {
      const pMObject = new PathMonitor(elasticSearchClient, pathProps);
      pMObject.createESMapping();
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
