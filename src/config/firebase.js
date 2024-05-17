// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANCM0RsyCv68lIUdoFwrCMFyXE8atkJNI",
  authDomain: "fir-course-4f30e.firebaseapp.com",
  projectId: "fir-course-4f30e",
  storageBucket: "fir-course-4f30e.appspot.com",
  messagingSenderId: "424327650471",
  appId: "1:424327650471:web:407e198c6e2f6e2c1d4f82",
  measurementId: "G-2Z4EGX57S3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const  googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)

export const storage = getStorage()