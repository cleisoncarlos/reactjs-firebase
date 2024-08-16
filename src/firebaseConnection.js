
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

 const firebaseConfig = {
   apiKey: "xxx",
   authDomain: "xxx",
   projectId: "xxx",
   storageBucket: "xxx",
   messagingSenderId: "xxx",
   appId: "xxx"
 };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)

const auth = getAuth(firebaseApp)

export {db, auth} 