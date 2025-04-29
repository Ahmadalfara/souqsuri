
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8gSPBy7AFSrK1mXO_K4ci3T83MRHD9s4",
  authDomain: "souqna-app.firebaseapp.com",
  projectId: "souqna-app",
  storageBucket: "souqna-app.appspot.com",
  messagingSenderId: "634652395206",
  appId: "1:634652395206:web:57a85fe194f7b38bf75b65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Connect to emulators if in development environment
if (process.env.NODE_ENV === 'development') {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
    console.log('Connected to Firebase emulators');
  } catch (error) {
    console.error('Failed to connect to Firebase emulators:', error);
  }
}

export { app, auth, db, storage };
