/*// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXrsPudhhz9SrHKZJlTDfaheJGb4V1IvU",
  authDomain: "quizlogin-132d2.firebaseapp.com",
  projectId: "quizlogin-132d2",
  storageBucket: "quizlogin-132d2.firebasestorage.app",
  messagingSenderId: "818171866968",
  appId: "1:818171866968:web:a74a40426335f343abff2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  //  Initialize Firebase App
export const auth = getAuth(app);           //  Export auth
export { auth };
*/
// Import necessary Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXrsPudhhz9SrHKZJlTDfaheJGb4V1IvU",
  authDomain: "quizlogin-132d2.firebaseapp.com",
  projectId: "quizlogin-132d2",
  storageBucket: "quizlogin-132d2.appspot.com",  // Corrected Storage Bucket URL
  messagingSenderId: "818171866968",
  appId: "1:818171866968:web:a74a40426335f343abff2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // Initialize Firebase Storage
const auth = getAuth(app); // Initialize Firebase Authentication (if needed)

export { app, storage, auth };
