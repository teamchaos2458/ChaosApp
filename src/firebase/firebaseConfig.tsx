import firebase from "firebase/app"; // doing import firebase from 'firebase' or import * as firebase from firebase is not good practice.
import "firebase/auth";
import "firebase/firestore";

// Initialize Firebase
let config = {
    apiKey: "AIzaSyCBMByZxmatwZTpOWobQpZNzxb4c4bpxD8",
    authDomain: "chaosapp-f252f.firebaseapp.com",
    databaseURL: "https://chaosapp-f252f.firebaseio.com",
    projectId: "chaosapp-f252f",
    storageBucket: "chaosapp-f252f.appspot.com",
    messagingSenderId: "76269935740",
    appId: "1:76269935740:web:6d7bd3bb7e90d44c2d7df9",
    measurementId: "G-QYV8CCNKS5",
};
console.log(process.env);
firebase.initializeApp(config);
console.log("firebase config");
const auth = firebase.auth();
const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const emailAuthProvider = new firebase.auth.EmailAuthProvider();

export { auth, firebase, db, googleAuthProvider, emailAuthProvider };
