// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Profile } from "./Profile";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_AP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
// const app represents our Firebase connection
// Below represents who is currently authenticated in Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Export authentication is to be able to import in different files
export const authentication = getAuth(app);

const googleProvider = new GoogleAuthProvider();

// Create const that will be used to sign in with Google
// Creating this under the assumption that the user signs in once
// when opening the site

// Return user information after authentication
export const signInWithGoogle = () => {
  let signIn = false;
  // signInWithPopup(authentication, googleProvider) is a promise
  signInWithPopup(authentication, googleProvider)
    .then((input) => {
      // Get the display name and email of the user
      const userName = input.user.displayName;
      const userEmail = input.user.email;
      // Store the user information
      localStorage.setItem("name", userName);
      localStorage.setItem("email", userEmail);
      // If there is an error with authentication, log it
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signOutWithGoogle = () =>
  signOut(authentication)
    .then(() => {
      // Sign-out successful.
      // Clear user information from Profile
      localStorage.clear()
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
