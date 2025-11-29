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
    { name: 'Manicura (limpieza)', duration: 60  },
    { name: 'Gel semipermanente', duration: 90  },
    { name: 'Polygel', duration: 120, price: 600 },
    { name: 'Soft Gel / Dual System', duration: 120 },
];

// Lógica de Horarios
export const WORK_START_HOUR = 9; // 9 AM
export const WORK_END_HOUR = 18;  // 6 PM (18:00)
export const SLOT_INTERVAL_MINUTES = 30; // Los slots inician cada 30 minutos

// Opcional: Iconos de Lucide React (si se quiere centralizar)
// import { X, User, Mail, Phone, Clock, DollarSign, Zap, Calendar, Sparkles, Search, BellRing, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';