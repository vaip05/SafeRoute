// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCt7ujFDyxtjKk3pqLgEQk-oAThXDFc1VA",
    authDomain: "saferoute-fe538.firebaseapp.com",
    projectId: "saferoute-fe538",
    storageBucket: "saferoute-fe538.firebasestorage.app",
    messagingSenderId: "325734304804",
    appId: "1:325734304804:web:4db5ee142cd31898fd1cb1",
    measurementId: "G-E10GNXGPZ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);