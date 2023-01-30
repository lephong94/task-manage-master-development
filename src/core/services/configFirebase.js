// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase, ref } from "firebase/database";
import {
  deleteToken,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAf9aG949eV4A6wH2p8_32cI8X_aUe4xLo",
//   authDomain: "testproject-3a860.firebaseapp.com",
//   projectId: "testproject-3a860",
//   storageBucket: "testproject-3a860.appspot.com",
//   messagingSenderId: "11173003869",
//   appId: "1:11173003869:web:f5051a72af087e5399c3b4",
//   databaseURL:
//     "https://testproject-3a860-default-rtdb.asia-southeast1.firebasedatabase.app/",
// };

// update to development google account
const firebaseConfig = {
  apiKey: "AIzaSyB3D2kAQSgmLdA8MZvQlvc8yzxBZ3Ye8lM",
  authDomain: "gas-project-77564.firebaseapp.com",
  databaseURL: "https://gas-project-77564-default-rtdb.firebaseio.com",
  projectId: "gas-project-77564",
  storageBucket: "gas-project-77564.appspot.com",
  messagingSenderId: "1010726195000",
  appId: "1:1010726195000:web:46e05f9cf517d885c9bbcd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// initialize messagin
const messaging = getMessaging(app);
const messageVapidKey =
  "BMXxKzK6wrH9BiYkKZ8UYz8gLq7HmNHGYePtylMK9nTuYCK6mPtL1a-qZlmOGTbrHD9kHvvA1iboSUc4G7Ccl_0";

const database = getDatabase(app);

const generateDbRef = (tablePath = "", ...args) => {
  if (tablePath) {
    return ref(database, tablePath);
  }
  return ref(database);
};

const requestPermission = () => {
  console.log("App requesting permission for notification");
  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        console.log("permission granted");
      } else {
        console.log("can not get token");
      }
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
};

const getMessagingToken = async () => {
  let currentToken = "";
  if (!messaging) return;
  try {
    currentToken = await getToken(messaging, {
      vapidKey: messageVapidKey,
    });

    console.log("token");
    console.log(currentToken);
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
    throw error;
  }
  return currentToken;
};

const deleteMessagingToken = async () => {
  let result = "";
  try {
    result = await deleteToken(messaging);
  } catch (error) {
    console.log("An error occurred while deleting token. ", error);
  }

  return result;
};

const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload");
      console.log(payload);
      resolve(payload);
    });
  });

export {
  app,
  storage,
  database,
  generateDbRef,
  firebaseConfig,
  getMessagingToken,
  onMessageListener,
  requestPermission,
  deleteMessagingToken,
};
