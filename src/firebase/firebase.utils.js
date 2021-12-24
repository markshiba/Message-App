import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyCPsJsqYTY4Vwp5WuvlnvD7xBsxLweHadM",
  authDomain: "message-app-453c3.firebaseapp.com",
  projectId: "message-app-453c3",
  storageBucket: "message-app-453c3.appspot.com",
  messagingSenderId: "863498790466",
  appId: "1:863498790466:web:be59d718013912b89bafdb",
  measurementId: "G-GKR2GSJ8H7",
};

// Initialize Firebase
firebase.initializeApp(config);
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
