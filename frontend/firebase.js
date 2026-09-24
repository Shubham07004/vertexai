import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
 authDomain: "aicodeeditor-8a382.firebaseapp.com",
  projectId: "aicodeeditor-8a382",
  storageBucket: "aicodeeditor-8a382.firebasestorage.app",
  messagingSenderId: "969190786883",
  appId: "1:969190786883:web:f8d523aa5f0f873d1011f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()