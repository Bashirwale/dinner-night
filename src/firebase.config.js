// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_oRr-nJcBJJG6SHegaynm6mJYayhCQQM",
  authDomain: "dinner-night-app-82867.firebaseapp.com",
  projectId: "dinner-night-app-82867",
  storageBucket: "dinner-night-app-82867.appspot.com",
  messagingSenderId: "227095370438",
  appId: "1:227095370438:web:f86119a0c39c6cd0dc15c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);