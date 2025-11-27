// =================================================================
// 1. CONFIGURACIÓN Y CONSTANTES
// =================================================================

// Configuración de Firebase (Simulada)
// *** REEMPLAZA ESTO CON TUS CLAVES REALES EN PRODUCCIÓN ***
export const firebaseConfig = {
  apiKey: "AIzaSyD2Qvk74Qua5lro1mY1AzK8Hl63A_vmCPs",
  authDomain: "unghie-jazz.firebaseapp.com",
  projectId: "unghie-jazz",
  storageBucket: "unghie-jazz.firebasestorage.app",
  messagingSenderId: "863028124058",
  appId: "1:863028124058:web:277d3ef681178697c58223",
  measurementId: "G-GDX8M1JNDJ"
};

// Clave para guardar en localStorage
export const LOCAL_STORAGE_KEY = 'appointments_data';

// Datos de Servicios
export const servicesData = [
    { name: "Corte de Cabello y Barba", duration: 60, price: 500, description: "Corte y diseño de barba profesional." },
    { name: "Color y Mechas", duration: 120, price: 1500, description: "Aplicación de tinte y mechas personalizadas." },
    { name: "Manicura y Pedicura", duration: 90, price: 750, description: "Tratamiento completo de manos y pies." },
];

// Lógica de Horarios
export const WORK_START_HOUR = 9; // 9 AM
export const WORK_END_HOUR = 18;  // 6 PM (18:00)
export const SLOT_INTERVAL_MINUTES = 30; // Los slots inician cada 30 minutos

// Opcional: Iconos de Lucide React (si se quiere centralizar)
// import { X, User, Mail, Phone, Clock, DollarSign, Zap, Calendar, Sparkles, Search, BellRing, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';