import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth"

// define config object with env variables
const firebaseConfig = {
    apiKey : process.env.NEXT_PUBLIC_API_KEY as string,
    authDomain : process.env.NEXT_PUBLIC_AUTH_DOMAIN as string,
    projectId : process.env.NEXT_PUBLIC_PROJECT_ID as string,
    storageBucket : process.env.NEXT_PUBLIC_STORAGE_BUCKET as string,
    messagingSenderId : process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID as string,
    appId : process.env.NEXT_PUBLIC_APP_ID as string,
    measurementId : process.env.NEXT_PUBLIC_MEASUREMENT_ID as string
}

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