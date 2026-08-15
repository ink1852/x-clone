import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDUPRyybvLSnRHWGyykkF8FP_ObQB43IEA",
  authDomain: "x-clone-bfec2.firebaseapp.com",
  projectId: "x-clone-bfec2",
  storageBucket: "x-clone-bfec2.firebasestorage.app",
  messagingSenderId: "715295284819",
  appId: "1:715295284819:web:fb1791803907a77fdff0a6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
