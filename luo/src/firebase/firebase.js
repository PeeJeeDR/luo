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

const storage = fire.storage().ref();
const db = fire.firestore();

export { firebase, fire, storage, db };