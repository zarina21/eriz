// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import QueryingClass from "../firebase/queryingClass";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkK_2zD3N_FjdoTR88hgG8sKXURElsV4I",
  authDomain: "eriz-94e4e.firebaseapp.com",
  projectId: "eriz-94e4e",
  storageBucket: "eriz-94e4e.firebasestorage.app",
  messagingSenderId: "415052391040",
  appId: "1:415052391040:web:0547d28b2039cfe1c0bc65",
  measurementId: "G-81TFGSF26N",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);






