// src/utils/appointmentsUtils.js
import { WORKING_HOURS } from "../config/services";

export const getAvailableTimeSlots = (selectedDate, requiredDuration, existingAppointments) => {
    if (!requiredDuration) return [];

    const slots = [];
    const isToday = selectedDate.toDateString() === new Date().toDateString();

    const occupied = existingAppointments
        .filter(app => new Date(app.date).toDateString() === selectedDate.toDateString())
        .map(app => {
            const start = new Date(app.date);
            const startMin = start.getHours() * 60 + start.getMinutes();
            return {
                startMin,
                endMin: startMin + app.duration
            };
        });

    for (let timeMin = WORKING_HOURS.start; timeMin < WORKING_HOURS.end; timeMin += WORKING_HOURS.interval) {
        const endMin = timeMin + requiredDuration;

        if (isToday) {
            const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
            if (timeMin <= nowMin + WORKING_HOURS.interval) continue;
        }

        if (endMin > WORKING_HOURS.end) continue;

        const overlaps = occupied.some(o => timeMin < o.endMin && endMin > o.startMin);
        if (!overlaps) {
            const h = Math.floor(timeMin / 60);
            const m = timeMin % 60;
            const ampm = h >= 12 ? "PM" : "AM";
            const hh = h % 12 || 12;
            slots.push(`${hh.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`);
        }
    }

    return slots;
};

export const timeStringToMinutes = (str) => {
    const [time, ampm] = str.split(" ");
    let [h, m] = time.split(":").map(Number);
    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    return h * 60 + m;
};
