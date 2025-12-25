// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwJRS7hVVFUtdJjs9SMOd2F-BvkizlrBo",
  authDomain: "intense-howl-472504-b2.firebaseapp.com",
  projectId: "intense-howl-472504-b2",
  storageBucket: "intense-howl-472504-b2.firebasestorage.app",
  messagingSenderId: "521155202175",
  appId: "1:521155202175:web:ae34db86553274d87d434a",
  measurementId: "G-3PHC77J2W0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);