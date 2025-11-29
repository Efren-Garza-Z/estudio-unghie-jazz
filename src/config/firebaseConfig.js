// src/config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ⛔ Usa tus claves reales aquí
export const firebaseConfig = {
  apiKey: "AIzaSyD2Qvk74Qua5lro1mY1AzK8Hl63A_vmCPs",
  authDomain: "unghie-jazz.firebaseapp.com",
  projectId: "unghie-jazz",
  storageBucket: "unghie-jazz.firebasestorage.app",
  messagingSenderId: "863028124058",
  appId: "1:863028124058:web:277d3ef681178697c58223",
  measurementId: "G-GDX8M1JNDJ"
};

// INICIALIZAR
const app = initializeApp(firebaseConfig);

// EXPORTAR FIRESTORE
export const db = getFirestore(app);
