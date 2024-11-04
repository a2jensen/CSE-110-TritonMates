import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDR3FOpXrZH0E5pB8-rf6K2ys6Mt3N7PU4",
  authDomain: "cse-110-group1.firebaseapp.com",
  projectId: "cse-110-group1",
  storageBucket: "cse-110-group1.firebasestorage.app",
  messagingSenderId: "799846323818",
  appId: "1:799846323818:web:d91da2f06944fc2d9d9c13",
  measurementId: "G-CMSBLQ7YBX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
