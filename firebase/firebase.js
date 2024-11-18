// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(process.env.NEXT_PUBLIC_API_KEY);

const firebaseConfig = {
    apiKey: "AIzaSyDR3FOpXrZH0E5pB8-rf6K2ys6Mt3N7PU4",
    authDomain: "cse-110-group1.firebaseapp.com",
    projectId: "cse-110-group1",
    storageBucket: "cse-110-group1.firebasestorage.app",
    messagingSenderId: "799846323818",
    appId: "1:799846323818:web:3ef707ac5236aec29d9c13",
    measurementId: "G-N7RYFWW2DP"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
