import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB5OakpUYpIAgly_o8DhHKMEafD-5Tx1uQ",
    authDomain: "meeting-ai-94f65.firebaseapp.com",
    projectId: "meeting-ai-94f65",
    storageBucket: "meeting-ai-94f65.firebasestorage.app",
    messagingSenderId: "129090490280",
    appId: "1:129090490280:web:3f6e0c19f276272c55179d",
    measurementId: "G-CLRZSQ840N"
  };
  
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);