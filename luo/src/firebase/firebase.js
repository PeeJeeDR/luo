import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from '@/config/config';

const fire = firebase.initializeApp(firebaseConfig);
const db = fire.firestore();

export { fire, db };