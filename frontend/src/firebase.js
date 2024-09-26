// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Importando o módulo de armazenamento

const firebaseConfig = {
  apiKey: "AIzaSyAmy1eDLI5mAtLs4OrjC9Q12AQ0ZqUU024",
  authDomain: "go-web-e81b8.firebaseapp.com",
  projectId: "go-web-e81b8",
  storageBucket: "go-web-e81b8.appspot.com",
  messagingSenderId: "661111626223",
  appId: "1:661111626223:web:ddc92a3510f110c86f3e1a"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Inicializando o Firebase Storage
