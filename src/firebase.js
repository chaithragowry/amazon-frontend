
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD4cql6AzrIQe_RFfdJtd75bS-It76XON4",
  authDomain: "e-clone-176e7.firebaseapp.com",
  projectId: "e-clone-176e7",
  storageBucket: "e-clone-176e7.firebasestorage.app",
  messagingSenderId: "505061899754",
  appId: "1:505061899754:web:1327d06d81173b9f51c693"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();