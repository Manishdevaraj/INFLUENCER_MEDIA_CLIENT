// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6cC40kIhtnkgYfe43tb2MCwD9ZTJ8qYQ",
  authDomain: "influencermedia-7c27b.firebaseapp.com",
  projectId: "influencermedia-7c27b",
  storageBucket: "influencermedia-7c27b.firebasestorage.app",
  messagingSenderId: "845996101853",
  appId: "1:845996101853:web:e5c7d2deac9369c8154b34",
  measurementId: "G-6GKJ65TJ5V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleAuthProvider=new GoogleAuthProvider();
export const db = getFirestore(app);

export const analytics = getAnalytics(app);
