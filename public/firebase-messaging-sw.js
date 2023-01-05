//public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

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

firebase.initializeApp(firebaseConfig);
if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log("message background");
    console.log(payload);
    const notificationTitle = `Ting ting: ${payload.notification.title}`;
    const notificationOptions = {
      body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}
