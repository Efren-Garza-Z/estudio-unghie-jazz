// src/utils/firebaseUtils.js
import { getDB, initializeFirebase } from "../config/firebaseConfig";
import { collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";

initializeFirebase(); // Garantiza inicialización

export const saveAppointmentToFirestore = async (appointmentData) => {
    const db = getDB();
    if (!db) throw new Error("Firestore no inicializado");

    const id = appointmentData.id || doc(collection(db, "appointments")).id;

    const data = {
        ...appointmentData,
        id,
        createdAt: new Date().toISOString(),
        status: appointmentData.status || "Pendiente",
    };

    await setDoc(doc(db, "appointments", id), data, { merge: true });
    return id;
};

export const getAppointmentsForDay = async (dayDate) => {
    const db = getDB();
    if (!db) return [];

    const start = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate()).toISOString();
    const end = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate(), 23, 59, 59).toISOString();

    const q = query(
        collection(db, "appointments"),
        where("date", ">=", start),
        where("date", "<=", end)
    );

    const snap = await getDocs(q);
    return snap.docs.map(d => d.data());
};
