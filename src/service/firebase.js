import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { GoogleAuthProvider } from "firebase/auth";
import "firebase/compat/firestore";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});


const googleprovider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();

export const signInWithGoogle = () => {
  firebase.auth().signInWithPopup(googleprovider)
    .then((res) => {
      console.log(res.user);
    })
    .catch((error) => {
      console.log(error.message);
    })
};

export const logOut = () => {
  firebase.auth().signOut()
  .then(() => {
    console.log("logged out!!")
    document.location.reload();
  })
  .catch((error) => {
    console.log(error.message);
  })
}