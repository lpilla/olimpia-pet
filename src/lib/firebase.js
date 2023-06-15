// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: "olimpia-pet.appspot.com",
  messagingSenderId: "1038746979749",
  appId: "1:1038746979749:web:691eb8fcda1f55e6be6c4c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
