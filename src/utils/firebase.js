// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVWbk-vNTItpDN9UOkRCvYpdEwVF7p5uM",
  authDomain: "react-project-a8550.firebaseapp.com",
  projectId: "react-project-a8550",
  storageBucket: "react-project-a8550.appspot.com",
  messagingSenderId: "1032822163804",
  appId: "1:1032822163804:web:4f154a614036ffe4c1d999"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Google Sign-In function
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user; // User info
    return user; // You can return user info or token if needed
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error; // Rethrow the error to handle it in the component if necessary
  }
};

export { db,auth };
