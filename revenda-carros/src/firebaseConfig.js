
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCE3YNBle0KtCmmqGBtO0tJwq2QDU0G1Fs",
  authDomain: "site-mcar.firebaseapp.com",
  projectId: "site-mcar",
  storageBucket: "site-mcar.firebasestorage.app",
  messagingSenderId: "303745845491",
  appId: "1:303745845491:web:aa11c0e4eb5fdbaa760f86",
  measurementId: "G-X0T33MDEQQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };
