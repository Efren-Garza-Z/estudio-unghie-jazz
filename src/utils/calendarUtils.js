// utils/calendarUtils.js

/**
 * Convierte "HH:MM" → minutos totales
 */
export function toMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Convierte minutos totales → "HH:MM"
 */
export function toTimeString(totalMinutes) {
  const h = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const m = String(totalMinutes % 60).padStart(2, "0");
  return `${h}:${m}`;
}

/**
 * Genera el listado de horarios disponibles.
 * - date: "YYYY-MM-DD"
 * - duration: minutos de la cita
 * - appointments: array con objetos { date, start, end }
 */
export function getAvailableTimeSlots(date, duration, appointments = []) {
  const startDay = 9 * 60;  // 9:00
  const endDay = 21 * 60;   // 21:00 (hora de cierre)

  const taken = appointments
    .filter((a) => a.date === date)
    .map((a) => ({
      start: toMinutes(a.start),
      end: toMinutes(a.end),
    }));

  const slots = [];

  for (let t = startDay; t + duration <= endDay; t += 30) {
    const slotStart = t;
    const slotEnd = t + duration;

    const overlaps = taken.some(
      (app) => slotStart < app.end && slotEnd > app.start
    );

    if (!overlaps) {
      slots.push(toTimeString(slotStart));
    }
  }

  return slots;
}


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
