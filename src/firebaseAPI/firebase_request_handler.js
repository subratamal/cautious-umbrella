import firebase from 'firebase';
import { serviceAccount } from '../../config/firebaseServiceAccount';
import { firebaseConfig } from '../../config/firebase_settings';
 // Initialize Firebase
const config = {
  serviceAccount,
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  storageBucket: firebaseConfig.storageBucket,

};

firebase.initializeApp(config);
const firebaseDB = firebase.database().ref('/');
export default firebaseDB;
