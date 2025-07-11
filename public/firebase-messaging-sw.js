// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// // eslint-disable-next-line no-undef
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// // Initialize the Firebase app in the service worker by passing the generated config
// const firebaseConfig = {
//   apiKey: "AIzaSyBKBT3BqZapvmL_3-M9uGpIdWW59ZvjIKE",
//   authDomain: "testing-5ad48.firebaseapp.com",
//   databaseURL: "https://testing-5ad48-default-rtdb.firebaseio.com",
//   projectId: "testing-5ad48",
//   storageBucket: "testing-5ad48.appspot.com",
//   messagingSenderId: "266804275118",
//   appId: "1:266804275118:web:8778f62661ade47b740a3f",
// };

// // eslint-disable-next-line no-undef
// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// // eslint-disable-next-line no-undef
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   //console.log("Received background message ", payload);

//   const notificationTitle = "Title";
//   const notificationOptions = {
//     body: "THis is text",
//     icon: "/logo192.png",
//   };

//   // eslint-disable-next-line no-restricted-globals
//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   );
// });
