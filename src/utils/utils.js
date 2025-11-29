import { servicesData, WORK_START_HOUR, WORK_END_HOUR, SLOT_INTERVAL_MINUTES } from '../config';

/**
 * Genera slots de tiempo disponibles para un día dado, excluyendo citas existentes.
 * @param {Date} date - El día a verificar.
 * @param {number} serviceDuration - Duración del servicio en minutos.
 * @param {Array} existingAppointments - Lista de citas ya agendadas.
 * @returns {Array<string>} Lista de slots disponibles en formato "HH:MM AM/PM".
 */
export const getAvailableTimeSlots = (date, serviceDuration, existingAppointments) => {
    const slots = [];
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    for (let hour = WORK_START_HOUR; hour < WORK_END_HOUR; hour++) {
        for (let minute = 0; minute < 60; minute += SLOT_INTERVAL_MINUTES) {
            const slotStart = new Date(date);
            slotStart.setHours(hour, minute, 0, 0);

            // 1. Eliminar slots en el pasado (solo si es hoy)
            if (isToday && slotStart.getTime() < today.getTime()) {
                continue;
            }
            
            // 2. Comprobar si hay suficiente tiempo para el servicio
            const slotEnd = new Date(slotStart.getTime() + serviceDuration * 60000);

            // 3. Eliminar si el servicio termina fuera del horario laboral
            if (slotEnd.getHours() > WORK_END_HOUR || (slotEnd.getHours() === WORK_END_HOUR && slotEnd.getMinutes() > 0)) {
                continue;
            }
            
            // 4. Comprobar superposición con citas existentes
            const isBooked = existingAppointments.some(app => {
                const appStart = new Date(app.date);
                const appEnd = new Date(appStart.getTime() + app.duration * 60000);

                const startsInAppointment = slotStart >= appStart && slotStart < appEnd;
                const endsInAppointment = slotEnd > appStart && slotEnd <= appEnd;
                const containsAppointment = appStart >= slotStart && appEnd <= slotEnd;
                
                return appStart.toDateString() === date.toDateString() && (startsInAppointment || endsInAppointment || containsAppointment);
            });

            if (!isBooked) {
                slots.push(
                    slotStart.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true })
                );
            }
        }
    }
    return slots;
};

/**
 * Helper para generar días del calendario (simula 42 días, 6 semanas)
 */
export const generateCalendarDays = (currentDate) => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const dayOfWeek = (startOfMonth.getDay() + 6) % 7; // Lunes = 0, Domingo = 6
    const startDate = new Date(startOfMonth);
    startDate.setDate(startOfMonth.getDate() - dayOfWeek);

    const days = [];
    for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        days.push({
            date,
            day: date.getDate(),
            month: date.toLocaleDateString('en-US', { month: 'short' }),
            isCurrentMonth: date.getMonth() === currentDate.getMonth()
        });
    }
    return days;
};

/**
 * Construye una Date combinando día base + slot ("10:30 AM")
 */
export const buildAppointmentDate = (baseDate, slot) => {
    if (!slot) return new Date(baseDate);
    const [time, ampm] = slot.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (ampm === "PM" && hours !== 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;

    const d = new Date(baseDate);
    d.setHours(hours, minutes, 0, 0);

    return d;
};

// -----------------------------------------------------------------
// SIMULACIÓN DE BACKEND (Firebase/Google Calendar)
// -----------------------------------------------------------------


export const sendToGoogleCalendar = (appointment) => {
    const serviceDetails = servicesData.find(s => s.name === appointment.serviceName);
    const start = new Date(appointment.date);
    const end = new Date(start.getTime() + serviceDetails.duration * 60000);

    const event = {
        summary: `Cita: ${appointment.serviceName} con ${appointment.clientName}`,
        description: `Contacto: ${appointment.email} / ${appointment.phone}`,
        start: { dateTime: start.toISOString(), timeZone: 'America/Mexico_City' },
        end: { dateTime: end.toISOString(), timeZone: 'America/Mexico_City' }
    };
    console.log("[Google Calendar Simulado] Objeto de evento generado (listo para POST):", event);
};