import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const fire = firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID
});

firebase.firestore().enablePersistence()
.then(() => console.log('PERSISTENCE ENABLED'))
.catch(err  => {
  if (err.code == 'failed-precondition') {
    console.error('Multiple tabs open, persistence can only be enabled in one tab at a a time.');
  }
  
  if (err.code == 'unimplemented') {
    console.error('The current browser does not support all of the features required to enable persistence');
  }
});

const storage = fire.storage().ref();
const db = fire.firestore();

export { firebase, fire, storage, db };