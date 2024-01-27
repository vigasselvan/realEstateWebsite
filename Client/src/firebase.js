// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-estate-87a11.firebaseapp.com",
  projectId: "mern-estate-87a11",
  storageBucket: "mern-estate-87a11.appspot.com",
  messagingSenderId: "535606033917",
  appId: "1:535606033917:web:582d247a5a0b7c5da5ad94"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);