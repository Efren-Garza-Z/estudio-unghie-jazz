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

// =========================================================
// 🖼️ ESTRUCTURA DE LA GALERÍA
// =========================================================

export const galleryData = [
    { 
        title: 'Manicura y Acabados Clásicos', 
        images: [
            clasica1, 
            clasica2, 
            clasica3,
            // Placeholder si necesitas más para mantener el carrusel lleno
            'https://placehold.co/400x500/383838/AEAEB2?text=Mas+Diseños+Pronto',
        ] 
    },
    { 
        title: 'Extensiones Polygel', 
        images: [
            polygel1, 
            polygel2, 
            // Placeholder para completar
            'https://placehold.co/400x500/1D1D1D/FFD700?text=Uñas+Esculpidas+Polygel',
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
            // Puedes incluir imágenes del arte más complejo aquí para Soft/Dual
            'https://placehold.co/400x500/383838/AEAEB2?text=Diseño+Acrílico+Soft+Gel',
        ] 
    },
];