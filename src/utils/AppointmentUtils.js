// 1. Datos de Servicios (Ahora con duración requerida en minutos)
export const servicesData = [
    { name: 'Manicura (limpieza)', duration: 60  },
    { name: 'Gel semipermanente', duration: 90  },
    { name: 'Polygel', duration: 120, price: 600 },
    { name: 'Soft Gel / Dual System', duration: 120 },
];

// 2. Horario de Trabajo (Constantes para la lógica de negocio)
export const WORKING_HOURS = {
    start: 9 * 60, // 9:00 AM en minutos
    end: 18 * 60,  // 6:00 PM en minutos
    interval: 30,  // Slots de 30 minutos
};

// 3. Clave de LocalStorage
export const LOCAL_STORAGE_KEY = 'nail_salon_appointments';

/**
 * Función central para calcular slots disponibles.
 * @param {Date} selectedDate - La fecha seleccionada por el usuario.
 * @param {number} requiredDuration - Duración del servicio seleccionado en minutos.
 * @param {Array} existingAppointments - Lista de citas ya agendadas.
 * @returns {Array} Lista de strings de tiempo disponibles (ej: "10:00 AM").
 */
export const getAvailableTimeSlots = (selectedDate, requiredDuration, existingAppointments) => {
    if (!requiredDuration) return [];

    const slots = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Limpiamos la hora para comparar solo la fecha

    const isToday = selectedDate.toDateString() === new Date().toDateString();
    
    // Convertir citas a un formato fácil de comparar: minutos de inicio y fin
    const occupiedSlots = existingAppointments
        .filter(app => new Date(app.date).toDateString() === selectedDate.toDateString())
        .map(app => ({
            startMin: new Date(app.date).getHours() * 60 + new Date(app.date).getMinutes(),
            endMin: (new Date(app.date).getHours() * 60 + new Date(app.date).getMinutes()) + app.duration,
        }));

    // Iterar por cada slot posible dentro del horario de trabajo
    for (let timeMin = WORKING_HOURS.start; timeMin < WORKING_HOURS.end; timeMin += WORKING_HOURS.interval) {
        const slotStartMin = timeMin;
        const slotEndMin = timeMin + requiredDuration;

        // 1. Filtrar slots que ya han pasado (solo si es HOY) [cite: 43]
        if (isToday) {
            const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
            if (slotStartMin <= nowMin + WORKING_HOURS.interval) { // Damos un pequeño margen
                continue;
            }
        }

        // 2. Verificar si el slot requerido excede el horario de cierre
        if (slotEndMin > WORKING_HOURS.end) {
            continue;
        }

        // 3. Verificar superposición con citas existentes [cite: 41, 42]
        const isOverlapping = occupiedSlots.some(occupied => 
            (slotStartMin < occupied.endMin && slotEndMin > occupied.startMin)
        );

        if (!isOverlapping) {
            const hours = Math.floor(slotStartMin / 60);
            const minutes = slotStartMin % 60;
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;

            slots.push(`${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`);
        }
    }

    return slots;
};

// Función para parsear el string de tiempo a minutos (ej: "10:30 AM" -> 630)
export const timeStringToMinutes = (timeString) => {
    const [time, ampm] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (ampm === 'PM' && hours !== 12) {
        hours += 12;
    }
    if (ampm === 'AM' && hours === 12) {
        hours = 0; // Midnight case
    }
    return hours * 60 + minutes;
};