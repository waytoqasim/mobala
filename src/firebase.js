import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKBT3BqZapvmL_3-M9uGpIdWW59ZvjIKE",
  authDomain: "testing-5ad48.firebaseapp.com",
  databaseURL: "https://testing-5ad48-default-rtdb.firebaseio.com",
  projectId: "testing-5ad48",
  storageBucket: "testing-5ad48.appspot.com",
  messagingSenderId: "266804275118",
  appId: "1:266804275118:web:8778f62661ade47b740a3f",
};
export const fireapp = initializeApp(firebaseConfig);
export const auth = getAuth(fireapp);
export const db = getFirestore(fireapp);
export const firebaseApp = getApp();
export const storage = getStorage(firebaseApp, "gs://testing-5ad48.appspot.com");

export const databaseRT = getDatabase(fireapp);
