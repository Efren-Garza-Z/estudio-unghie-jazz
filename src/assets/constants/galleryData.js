// =========================================================
// 🛑 IMPORTACIÓN DE IMÁGENES
// IMPORTANTE: Vite/React necesita estas importaciones explícitas.
// Ajusta las rutas ('../services/...') para que sean correctas
// desde la ubicación de este archivo (ej: src/assets/constants/galleryData.js)
// =========================================================

// --- Manicura Clásica ---
import clasica1 from '../services/clasica/img-1.jpeg';
import clasica2 from '../services/clasica/img-2.jpeg';
import clasica3 from '../services/clasica/img-3.jpeg';

// --- Dual System ---
import dualSystem1 from '../services/dual-system/img-1.jpeg';

// --- Polygel ---
import polygel1 from '../services/polygel/img-1.jpeg';
import polygel2 from '../services/polygel/img-2.jpeg';

// --- Semipermanente ---
import semipermanente1 from '../services/semipermanente/img-1.jpeg';
import semipermanente2 from '../services/semipermanente/img-2.jpeg';
import semipermanente3 from '../services/semipermanente/img-3.jpeg';
import semipermanente4 from '../services/semipermanente/img-4.jpeg';

// --- Soft Gel ---
import softGel1 from '../services/soft-gel/img-1.jpeg';
import softGel2 from '../services/soft-gel/img-2.jpeg';

// --- disenos ---
import diseno1 from '../services/disenos/i-1.jpeg';
import diseno2 from '../services/disenos/i-2.jpeg';
import diseno3 from '../services/disenos/i-3.jpeg';
import diseno4 from '../services/disenos/i-4.jpeg';
import diseno5 from '../services/disenos/i-5.jpeg';
import diseno6 from '../services/disenos/i-6.jpeg';
import diseno7 from '../services/disenos/i-7.jpeg';
import diseno8 from '../services/disenos/i-8.jpeg';
import diseno9 from '../services/disenos/i-9.jpeg';
import diseno10 from '../services/disenos/i-10.jpeg';
import diseno11 from '../services/disenos/i-11.jpeg';

// =========================================================
// 🖼️ ESTRUCTURA DE LA GALERÍA
// =========================================================

export const galleryData = [
    {
        title: 'Diseños Jazz',
        images: [
            diseno1,
            diseno2,
            diseno3,
            diseno4,
            diseno5,
            diseno6,
            diseno7,
            diseno8,
            diseno9,
            diseno10,
            diseno11,
        ]
    },
    { 
        title: 'Manicura y Acabados Clásicos', 
        images: [
            clasica1, 
            clasica2, 
            clasica3,
        ] 
    },
    { 
        title: 'Extensiones Polygel', 
        images: [
            polygel1, 
            polygel2,
        ] 
    },
    { 
        title: 'Esmaltado Semipermanente', 
        images: [
            semipermanente1, 
            semipermanente2, 
            semipermanente3, 
            semipermanente4,
        ] 
    },
    { 
        title: 'Soft Gel y Dual System', 
        images: [
            softGel1, 
            softGel2, 
            dualSystem1,
        ] 
    },
];