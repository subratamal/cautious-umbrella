/**
  * Firebase initialisation and forking
  * The init method connects to the database, based on the database url
  * and the service Account details from the config.js, and invoked from app.js
  * ==================================================================================
  * @version 1.0, Date: 03 Sept 2016
  * Dev - Rohit Raj
  */

const firebase = require('firebase');
require('colors');

exports.init = (firebaseConfig, firebaseServiceAccount) => {
  const config = {
    serviceAccount: firebaseServiceAccount,
    databaseURL: firebaseConfig.databaseURL,
  };
  firebase.initializeApp(config);
};

exports.fireBaseRef = (path) => firebase.database().ref().child(path);

exports.pathName = (ref) => {
  const p = ref.parent.key;
  return (p ? `${p}/` : '') + ref.key;
};
