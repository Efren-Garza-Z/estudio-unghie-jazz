// src/config/services.js

export const servicesData = [
    { name: 'Manicura (limpieza)', duration: 60 },
    { name: 'Gel semipermanente', duration: 90 },
    { name: 'Polygel', duration: 120, price: 600 },
    { name: 'Soft Gel / Dual System', duration: 120 },
];

export const WORKING_HOURS = {
    start: 9 * 60,
    end: 18 * 60,
    interval: 30
};

export const LOCAL_STORAGE_KEY = 'nail_salon_appointments';
