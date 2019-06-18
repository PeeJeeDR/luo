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

// Messaging
const messaging = fire.messaging();

// Cache persistence.
enablePersistence(firebase);

export { firebase, fire, storage, db, messaging };