import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAgeS-IBxrdqJGhZO91Dev3i7Sa_Adbx9Q",
	authDomain: "passion-pay.firebaseapp.com",
	projectId: "passion-pay",
	storageBucket: "passion-pay.appspot.com",
	messagingSenderId: "375257310723",
	appId: "1:375257310723:web:ce824cf66e76706ba35036",
	measurementId: "G-GS3PZ7M686"
	// apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	// authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	// projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	// storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	// messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	// appId: import.meta.env.VITE_FIREBASE_APP_ID,
	// measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
