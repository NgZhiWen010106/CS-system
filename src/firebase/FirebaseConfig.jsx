// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA54iQo4epVp_iySWS5YLvj-F479kT-D4I",
  authDomain: "ngzhiwenfyp.firebaseapp.com",
  projectId: "ngzhiwenfyp",
  storageBucket: "ngzhiwenfyp.appspot.com",
  messagingSenderId: "299441342813",
  appId: "1:299441342813:web:20ed362d35ab4e627ac0b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app);
export { fireDb, auth, storage };