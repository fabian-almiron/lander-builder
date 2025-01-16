
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjx9nyTcZkuYgNon6mKG5ALFz0moX62aw",
  authDomain: "lander-builder.firebaseapp.com",
  projectId: "lander-builder",
  storageBucket: "lander-builder.firebasestorage.app",
  messagingSenderId: "1077209329190",
  appId: "1:1077209329190:web:3e3deec1375116997e40e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth
export const auth = getAuth(app);
// Initialize Firebase


export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);