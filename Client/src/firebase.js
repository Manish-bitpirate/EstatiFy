// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estatify-5bfc2.firebaseapp.com",
  projectId: "estatify-5bfc2",
  storageBucket: "estatify-5bfc2.appspot.com",
  messagingSenderId: "728923763957",
  appId: "1:728923763957:web:52b33fb388a8cf9e0401bc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);