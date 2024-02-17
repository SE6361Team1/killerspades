// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore/lite';

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
const db = getFirestore(app);
const analytics = getAnalytics(app);
// Export authentication is to be able to import in different files
export const authentication = getAuth(app);

const googleProvider = new GoogleAuthProvider();

// Create const that will be used to sign in with Google
// Creating this under the assumption that the user signs in once
// when opening the site

// Return user information after authentication
export const signInWithGoogle = () => {
  // signInWithPopup(authentication, googleProvider) is a promise
  return signInWithPopup(authentication, googleProvider) 
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

export const logInWithGoogle = () => {
  // signInWithPopup(authentication, googleProvider) is a promise
  return signInWithPopup(authentication, googleProvider) 
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

export const getDocument = (collectionName, documentId) => {
  const docRef = doc(db, collectionName, documentId);
  return getDoc(docRef).then((docSnap) => {
    // Check if the document exists
    if (docSnap.exists()) {
      // Get the document data
      const docData = docSnap.data();
      // Return the data
      return docData;
    } else {
      // Throw an error if the document does not exist
      throw new Error("No such document!");
    }
  }).catch((error) => {
    // Throw any other errors
    throw error;
  });
};

export function storeDataFromPromise (promise, field){
  return promise.then((docData) => {
    // Get the name field from the document data
    const data = docData[field];
    // Display the name as a string
    console.log(typeof(promise))
    console.log("The name is " + typeof(data));
    localStorage.setItem("dbStorage" + field, data);
    return data
  })
  .catch((error) => {
    // Handle any errors
    console.error(error);
  });
}

export function storeAndRetrieveData (promise, field){
  storeDataFromPromise(promise, field)
  return localStorage.getItem("dbStorage" + field)
}