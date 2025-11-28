// AppointmentModal.jsx
import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { X, User, Mail, Phone, Clock, Zap, Calendar } from 'lucide-react';



export default function AppointmentModal({
  isOpen,
  setIsOpen,
  serviceDetails,
  selectedDate,
  selectedTime,
}) {
  // ❗ Hooks siempre al inicio del componente
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  });

  if (!isOpen) return null;
  if (!serviceDetails) return null;

  const date = new Date(selectedDate);
  const end = new Date(date);
  end.setMinutes(end.getMinutes() + serviceDetails.duration);

  const endString = end.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });
console.log("DB:", db);
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const docRef = await addDoc(collection(db, "appointment"), {
      serviceName: serviceDetails.name,
      duration: serviceDetails.duration,
      date: selectedDate,
      time: selectedTime,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      createdAt: Timestamp.now(),
    });

    console.log("Cita guardada con ID:", docRef.id);
    alert("Tu cita fue registrada correctamente 🎉");

    setIsOpen(false);
    console.log("FormData antes de guardar:", formData);

Object.entries(formData).forEach(([key, value]) => {
  if (value === undefined) {
    console.warn(`⚠️ El campo ${key} está llegando como undefined`);
  }
});
  } catch (error) {
    console.error("Error al guardar:", error);
    alert("Hubo un error al guardar la cita.");
  }
};


  return (
      <div className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-dark-card w-full max-w-lg p-6 rounded-3xl shadow-ios-float border border-white/10 transform transition-all duration-300 scale-100">
          <h3 className="text-2xl font-bold text-gold-accent flex items-center">
            <Zap className="w-6 h-6 mr-2" /> Confirmar Cita
          </h3>

        <p className="text-lg font-semibold text-text-light">
          Servicio: <strong>{serviceDetails.name}</strong>
        </p>
        <p className="text-lg font-semibold text-text-light">Tu cita es el: {selectedDate?.toLocaleDateString()}</p>
        <p className="text-lg font-semibold text-text-light">
          Termina a las: <strong>{endString}</strong>
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <br/>
          <label className="block mb-2">Nombre</label>
          <input
            type="text"
            className="w-full  border border-white/10 text-text-light rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gold-accent transition"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <label className="block mt-4 mb-2">Email</label>
          <input
            type="email"
            className="w-full border border-white/10 text-text-light rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gold-accent transition"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <label className="block mt-4 mb-2">Teléfono</label>
          <input
            type="text"
            className="w-full  border border-white/10 text-text-light rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gold-accent transition"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-8 py-4 mt-6 text-lg font-semibold rounded-2xl shadow-lg text-dark-bg bg-gold-accent hover:bg-gold-secondary focus:outline-none focus:ring-4 focus:ring-gold-accent/50 transition duration-300"          >
            Confirmar
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full inline-flex items-center justify-center px-8 py-4 mt-6 text-lg font-semibold rounded-2xl shadow-lg text-dark-bg bg-black hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gold-accent/50 transition duration-300"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}