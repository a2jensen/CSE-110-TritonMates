import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth"

// define config object with env variables
const firebaseConfig = {
    apiKey: "AIzaSyDR3FOpXrZH0E5pB8-rf6K2ys6Mt3N7PU4",
    authDomain: "cse-110-group1.firebaseapp.com",
    projectId: "cse-110-group1",
    storageBucket: "cse-110-group1.firebasestorage.app",
    messagingSenderId: "799846323818",
    appId: "1:799846323818:web:3ef707ac5236aec29d9c13",
    measurementId: "G-N7RYFWW2DP"
  };

// initialize firebase app
let app : FirebaseApp;
if (!initializeApp.length) {
    app = initializeApp(firebaseConfig);
} else {
    app = initializeApp(firebaseConfig);
}

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// initialize cloud firestore and get reference to the service
const db = getFirestore(app);

// set persistence to browser local storage in order to keep users logged when switching pages...
setPersistence(auth, browserLocalPersistence);

export { auth , provider, db, signInWithPopup, signOut, onAuthStateChanged };
export type { User }