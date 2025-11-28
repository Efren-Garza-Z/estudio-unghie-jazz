// AppointmentApp.jsx
import { useState, useEffect } from "react";
import AppointmentModal from "./AppointmentModal";
import { getAvailableTimeSlots } from "../../utils/calendarUtils";
import { servicesData } from "../../config";

export default function AppointmentApp({ appointments }) {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Cargar detalles del servicio cuando cambia
  useEffect(() => {
    const details = servicesData.find((s) => s.name === selectedService) || null;
     queueMicrotask(() => setServiceDetails(details));
  }, [selectedService]);

  // 2. Calcular slots disponibles (sin setState sincrónico en el cuerpo del useEffect)
  useEffect(() => {
    if (!selectedDate || !serviceDetails) {
      queueMicrotask(() => setAvailableSlots([])); // permitido: sincroniza con estado externo
      return;
    }

    const newSlots = getAvailableTimeSlots(
      selectedDate,
      serviceDetails.duration,
      appointments
    );

    queueMicrotask(() => setAvailableSlots(newSlots));
  }, [selectedDate, serviceDetails, appointments]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reservar Cita</h1>

      {/* Selección de servicio */}
      <label className="block mb-2 font-semibold">Servicio</label>
      <select
        className="border p-2 rounded w-full"
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
      >
        <option value="">Selecciona un servicio</option>
        {servicesData.map((s) => (
          <option key={s.name} value={s.name}>
            {s.name} ({s.duration} min)
          </option>
        ))}
      </select>

      {/* Calendario */}
      <label className="block mt-4 mb-2 font-semibold">Fecha</label>
      <input
        type="date"
        className="border p-2 rounded w-full"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {/* Slots */}
      <h2 className="mt-6 mb-2 font-semibold">Horarios disponibles</h2>

      {availableSlots.length === 0 ? (
        <p className="text-gray-500">No hay horarios disponibles.</p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {availableSlots.map((t) => (
            <button
              key={t}
              className="p-2 bg-blue-600 text-white rounded"
              onClick={() => setIsModalOpen(true)}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <AppointmentModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          serviceDetails={serviceDetails}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}
