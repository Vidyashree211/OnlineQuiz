// Import the functions you need from the SDKs you need
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
export default app;                         //  Export app
