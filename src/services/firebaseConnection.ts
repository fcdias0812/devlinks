import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCg9jOnjBgwR8HEhYkjO18IUye2YwMDscA",
  authDomain: "devlinks-1faaa.firebaseapp.com",
  projectId: "devlinks-1faaa",
  storageBucket: "devlinks-1faaa.firebasestorage.app",
  messagingSenderId: "599089781771",
  appId: "1:599089781771:web:281d31f836580ce24afb0e",
  measurementId: "G-RXCFFTCEVV",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
