// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP4ErD2dkLCHLEqfuua0FCDggJlKnsOwE",
  authDomain: "react-course-1cfd2.firebaseapp.com",
  projectId: "react-course-1cfd2",
  storageBucket: "react-course-1cfd2.appspot.com",
  messagingSenderId: "840417418235",
  appId: "1:840417418235:web:a59313a06a4641b6b3095e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);