// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase, ref } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf9aG949eV4A6wH2p8_32cI8X_aUe4xLo",
  authDomain: "testproject-3a860.firebaseapp.com",
  projectId: "testproject-3a860",
  storageBucket: "testproject-3a860.appspot.com",
  messagingSenderId: "11173003869",
  appId: "1:11173003869:web:f5051a72af087e5399c3b4",
  databaseURL:
    "https://testproject-3a860-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// update to development google account
// const firebaseConfig = {
//   apiKey: "AIzaSyB3D2kAQSgmLdA8MZvQlvc8yzxBZ3Ye8lM",
//   authDomain: "gas-project-77564.firebaseapp.com",
//   databaseURL: "https://gas-project-77564-default-rtdb.firebaseio.com",
//   projectId: "gas-project-77564",
//   storageBucket: "gas-project-77564.appspot.com",
//   messagingSenderId: "1010726195000",
//   appId: "1:1010726195000:web:46e05f9cf517d885c9bbcd",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const database = getDatabase(app);

const generateDbRef = (tablePath = "", ...args) => {
  if (tablePath) {
    return ref(database, tablePath);
  }
  return ref(database);
};

export { app, storage, database, generateDbRef, firebaseConfig };
