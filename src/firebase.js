import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCcpMPKIbmG4STJ4B8FBVb6Z7hS1JTowzc",
    authDomain: "fir-setup-e5e6d.firebaseapp.com",
    projectId: "fir-setup-e5e6d",
    storageBucket: "fir-setup-e5e6d.appspot.com",
    messagingSenderId: "909629833851",
    appId: "1:909629833851:web:e44471b0f19580751d18de",
    measurementId: "G-ZPV01K1C3E",
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// ✅ Connect to Firebase Emulators (ONLY in development)
if (window.location.hostname === "localhost") {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
    connectStorageEmulator(storage, "127.0.0.1", 9199);
    console.log("🔥 Connected to Firebase Emulators");
}

// ✅ Export Firebase Instances
export { app, db, auth, storage };
