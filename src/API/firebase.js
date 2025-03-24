import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA54iQo4epVp_iySWS5YLvj-F479kT-D4I",
  authDomain: "ngzhiwenfyp.firebaseapp.com",
  projectId: "ngzhiwenfyp",
  storageBucket: "ngzhiwenfyp.appspot.com",
  messagingSenderId: "299441342813",
  appId: "1:299441342813:web:20ed362d35ab4e627ac0b4"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
export const database = {
  users: firestore.collection('users'),
  docs: firestore.collection('docs'),
  files: firestore.collection('files'),
  date: firebase.firestore.FieldValue.serverTimestamp(),
};

export const storage = firebase.storage();

export const auth = firebase.auth();
