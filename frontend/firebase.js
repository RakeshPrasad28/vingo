import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vingoapp-152d5.firebaseapp.com",
  projectId: "vingoapp-152d5",
  storageBucket: "vingoapp-152d5.firebasestorage.app",
  messagingSenderId: "244893174072",
  appId: "1:244893174072:web:4ef118733b93b87dd599cd",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
