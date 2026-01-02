 import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAB5u5k0fUyGzmjWn5b1PXeSFE8rtzVAY8",
  authDomain: "fir-signup-login-logout-28864.firebaseapp.com",
  databaseURL: "https://fir-signup-login-logout-28864-default-rtdb.firebaseio.com",
  projectId: "fir-signup-login-logout-28864",
  storageBucket: "fir-signup-login-logout-28864.firebasestorage.app",
  messagingSenderId: "140565115906",
  appId: "1:140565115906:web:73dc480ab38623a10be31b",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);