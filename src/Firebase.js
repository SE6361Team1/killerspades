// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, where, addDoc } from 'firebase/firestore/lite';
import {query} from "firebase/firestore"
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
      
      const userPromise = Promise.resolve(doesUserExist(userEmail));
      console.log("And this is the output from doesUserExist: ")
      console.log(userPromise)
      userPromise.then((userExist) =>{
      console.log("This is the output from opening the promise: " + userExist)
        if(!userExist){
        addDoc(collection(db,"Users"), {name: userName, email: userEmail, TestString: "hello"})
        console.log("user added to db")
      }
    })
      // If there is an error with authentication, log it
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logInWithGoogle = () => {
  return signInWithGoogle();
  /*
  // signInWithPopup(authentication, googleProvider) is a promise
  return signInWithPopup(authentication, googleProvider) 
    .then((input) => {
      // Get the display name and email of the user
      const userName = input.user.displayName;
      const userEmail = input.user.email;
      // Store the user information
      localStorage.setItem("name", userName);
      localStorage.setItem("email", userEmail);
      const haveUser = !doesUserExist(userEmail);
      console.log("The value of haveUser is " + haveUser)
      if(!haveUser){
        addDoc(collection(db,"Users"), {name: userName, email: userEmail, TestString: "hello"})
        console.log("user added to db")
      }
      // If there is an error with authentication, log it
    })
    .catch((error) => {
      console.log(error);
    });
    */
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

export async function storeDataFromPromise (promise, field){
  return promise.then((docData) => {
    // Get the name field from the document data
    const data = docData[field];
    // Display the name as a string
    //console.log(typeof(promise))
    //console.log("The type of name is " + typeof(data));
    //console.log("the name is " + data)
    //console.log("This is the data from the database: " + data)
    localStorage.setItem("dbStorage" + field, data);
    //console.log("I am storing it in dbStorage" + field)
    //console.log("One final data test because js is evil " + data)
    return data
  })
  .catch((error) => {
    // Handle any errors
    console.error(error);
  });
}
export function storeDataFromDoc (doc, field){
  // Get the name field from the document data
  const data = doc[field];
  //console.log("The data is " + data)
  // Display the name as a string
  //console.log("The name is " + typeof(data));
  localStorage.setItem("dbStorage" + field, data);
  return data
}

export function storeAndRetrieveData (promise, field){
  Promise.resolve(storeDataFromPromise(promise, field))
  return localStorage.getItem("dbStorage" + field)
}

export function storeFieldIntoDocument (docRef, fieldName, fieldData){
  setDoc(docRef, { fieldName : fieldData})
}

export async function doesUserExist(email){
  const  retrievalPromise = getDocFromEmailName(email)
  //console.log("This is what I get getting the users: ")
  //console.log(retrievalPromise)
  return retrievalPromise.then((retrievalVal) =>{
    //console.log(retrievalVal)
    if (retrievalVal == false) {
      return false;
    }
    return true;
  });
};

export async function getDocFromEmailName(entryEmail){
  
  const usersRef = collection(db, "Users");
  //console.log("this should be the users collection reference: " + usersRef.path)
  //console.log("This is the input email: " + entryEmail)
  const emailQuery = where("email", "==", entryEmail);
  return getDocs(query(usersRef, emailQuery)).then((querySnapshot) =>{
    //console.log("Snapshot: " + querySnapshot.size)
    if(querySnapshot.empty){
      return false;
    }
    //console.log("the query snapshot was NOT empty")
    for (let i = 0; i <querySnapshot.size; i++){
      const emailVar = querySnapshot.docs[i].data()["email"];
      //console.log("I am at index " + i + " and this is my email: " + emailVar)
      if (emailVar == entryEmail){
        const firstDoc = querySnapshot.docs[i]; // get the  element of the array
        //console.log("These are the query results: " + querySnapshot.docs)
        const firstDocData = firstDoc.data(); // get the data of the document
        //console.log("This is the data from the firstDoc: " + firstDocData["email"])
        return Promise.resolve(firstDocData)
      }
    }
    return false
  })


}

export async function getAllEntriesFromCollection(collectionName){
  const collRef = collection(db, collectionName);
  //console.log(collRef)
  return getDocs(query(collRef, where("defaultDoesntMatter", "==", "")))
}

export async function getEntriesMatchingField(querySnapshot, fieldName, desiredData){
  const docArray = [];
  for (const doc of querySnapshot.docs){
      const docData = doc.data();
      const isRight = await isFieldFilledInDoc(docData, fieldName, desiredData);
      if(isRight){
          docArray.push(docData);
      }
  }
  return docArray;
}


export async function isFieldFilledInDoc(docData, fieldName, desiredData){
  console.log("Field Name: " + fieldName 
  + ", data there: " + docData[fieldName] 
  + ", desired data: " + desiredData)
  if(docData[fieldName] == desiredData) {
    //console.log("I am right!!")
    return true;
  }
  //console.log("I am wrong :(")
  return false;
}

export async function makeDoc(collectionName, fieldNames, fields) {
  // Ensure the arrays have the same length
  if (fieldNames.length !== fields.length) {
    throw new Error('The length of fieldNames and fields arrays must be the same.');
  }

  // Create an object to hold the field-value pairs
  const docData = {};
  for (let i = 0; i < fieldNames.length; i++) {
    docData[fieldNames[i]] = fields[i];
  }

  try {
    // Reference to the collection
    const docRef = collection(db, collectionName);
    // Add a new document with the object data
    const docSnapshot = await addDoc(docRef, docData);
    console.log('Document written with ID: ', docSnapshot.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}