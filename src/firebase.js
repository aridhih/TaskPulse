// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC01nE9MTCOA11CQ5tpp5GxqnPEkmkf-JM",
  authDomain: "taskpulse-4ff38.firebaseapp.com",
  projectId: "taskpulse-4ff38",
  storageBucket: "taskpulse-4ff38.firebasestorage.app",
  messagingSenderId: "717492698290",
  appId: "1:717492698290:web:530b5c79df6defe36e5dab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;