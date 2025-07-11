import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnDKHIE993_YZbMtsJQQvmiGH0ZN6Uq2A",
  authDomain: "honey-money-14539.firebaseapp.com",
  projectId: "honey-money-14539",
  storageBucket: "honey-money-14539.appspot.com",
  messagingSenderId: "166473114012",
  appId: "1:166473114012:web:970b041b73528b4f89a859",
};
export const fireapp = initializeApp(firebaseConfig);
export const auth = getAuth(fireapp);
export const datab = getFirestore(fireapp);
