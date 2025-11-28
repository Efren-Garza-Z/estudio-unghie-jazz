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
