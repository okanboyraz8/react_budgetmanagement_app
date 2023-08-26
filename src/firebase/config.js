// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth"
import {getFirestore} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFNdHKPOvNVV4Hlmc8HJliBId0fMPtbvM",
  authDomain: "rrt-budget.firebaseapp.com",
  projectId: "rrt-budget",
  storageBucket: "rrt-budget.appspot.com",
  messagingSenderId: "355697172334",
  appId: "1:355697172334:web:0d2f2b57310734342b6b7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db=getFirestore(app);


export { auth, db }