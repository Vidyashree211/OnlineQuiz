// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXrsPudhhz9SrHKZJlTDfaheJGb4V1IvU",
  authDomain: "quizlogin-132d2.firebaseapp.com",
  projectId: "quizlogin-132d2",
  storageBucket: "quizlogin-132d2.appspot.com",
  messagingSenderId: "818171866968",
  appId: "1:818171866968:web:a74a40426335f343abff2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export Firebase authentication instance
export { app, auth };
