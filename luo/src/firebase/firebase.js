import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { firebaseConfig } from '@/config/config';

const fire = firebase.initializeApp(firebaseConfig);
const storage = fire.storage().ref();
const db = fire.firestore();

export { firebase, fire, storage, db };