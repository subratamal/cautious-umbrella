/**
  * Method for indexer, that will dynamically index the firebase data
  * This indexes the firebase data according to the config.js FB_PATH
  * This path is most of the time empty, but incase if there is some FB_PATH variable assigned from
  * process environment.
  * Paths can also be stored in Firebase and loaded using FB_PATHS, hence this indexer can be useful
  * ==================================================================================
  * @version 1.0, Date: 03 Sept 2016
  * Dev - Rohit Raj
  */

function DynamicPathMonitor(factory) {
  this.factory = factory;
  this.paths = {}; // store instance of monitor, so we can unset it if the value changes
  return this;
}

exports.init = (ref) => {
  ref.on('child_added', this.add.bind(this));
  ref.on('child_changed', this.change.bind(this));
  ref.on('child_removed', this.remove.bind(this));
};

function isValidPath(props) {
  return props && typeof (props) === 'object' && props.index && props.path && props.type;
}

DynamicPathMonitor.prototype = {
  add(snap) {
    const name = snap.key;
    const pathProps = snap.val();
    if (isValidPath(pathProps)) {
      this.paths[name] = this.factory(pathProps);
    }
  },
  remove(snap) {
    const name = snap.key;
    // kill old monitor
    if (this.paths[name]) {
      this.paths[name].stop();
      this.paths[name] = null;
    }
  },
  change(snap) {
    const name = snap.key;
    const pathProps = snap.val();
    // kill old monitor
    if (this.paths[name]) {
      this.paths[name].stop();
      this.paths[name] = null;
    }
    // create new monitor
    if (pathProps !== null && pathProps.index && pathProps.path && pathProps.type) {
      this.paths[name] = this.factory(pathProps);
    }
  },
};

module.exports = DynamicPathMonitor;
