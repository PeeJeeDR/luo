import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/messaging';
import { enablePersistence } from './persistence';

// Init firebase.
const fire = firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID
});

// Firestore cloud storage.
const storage = fire.storage();

// Firestore Database.
const db = fire.firestore();

// Cache persistence.
enablePersistence(firebase);

// Messaging.
const messaging = fire.messaging();

messaging.requestPermission()
.then(() => {
  console.log('GRANTED PERMISSION');
  return messaging.getToken();
})
.then(token => {
  console.log('TOKEN', token);
})
.catch(() => {
  console.log('NO PERMISSION GRANTED');
});

messaging.onMessage(payload => {
  console.log('payload', payload);
});



export { firebase, fire, storage, db };