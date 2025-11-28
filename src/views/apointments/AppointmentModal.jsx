// AppointmentModal.jsx
import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";


export default function AppointmentModal({
  isOpen,
  setIsOpen,
  serviceDetails,
  selectedDate,
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
    const docRef = await addDoc(collection(db, "appointments"), {
      serviceName: serviceDetails.name,
      duration: serviceDetails.duration,
      date: selectedDate,
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Confirmar cita</h2>

        <p>
          Servicio: <strong>{serviceDetails.name}</strong>
        </p>
        <p>
          Fecha: <strong>{selectedDate}</strong>
        </p>
        <p>
          Termina a las: <strong>{endString}</strong>
        </p>

        <form className="mt-4" onSubmit={handleSubmit}>
          <label className="block mb-2">Nombre</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <label className="block mt-4 mb-2">Email</label>
          <input
            type="email"
            className="border p-2 w-full rounded"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <label className="block mt-4 mb-2">Teléfono</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          <button
            type="submit"
            className="mt-6 w-full bg-green-600 text-white p-2 rounded"
          >
            Confirmar
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full bg-gray-500 text-white p-2 rounded"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}