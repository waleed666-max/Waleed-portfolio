import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-QLhEoNtSqL0DPhAnr-tuc6smwu5Hs_Y",
  authDomain: "myportfolio-1bbfe.firebaseapp.com",
  databaseURL: "https://myportfolio-1bbfe-default-rtdb.firebaseio.com",
  projectId: "myportfolio-1bbfe",
  storageBucket: "myportfolio-1bbfe.firebasestorage.app",
  messagingSenderId: "977460955740",
  appId: "1:977460955740:web:cc7f6ee7ea70f933b5f499",
  measurementId: "G-5EGT8JVR3X"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
