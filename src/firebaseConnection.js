
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8zDZdDT0O7nWGkj31TRabY1z85nkleyk",
  authDomain: "cursosujeitoprogramador-bdf58.firebaseapp.com",
  projectId: "cursosujeitoprogramador-bdf58",
  storageBucket: "cursosujeitoprogramador-bdf58.appspot.com",
  messagingSenderId: "468650291637",
  appId: "1:468650291637:web:1c3a21f3a25a22a6aee9fc"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)

export {db} 