import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { Zap, CheckCircle } from 'lucide-react'; // Agregué CheckCircle para el éxito

export default function AppointmentModal({
                                           isOpen,
                                           setIsOpen,
                                           serviceDetails,
                                           selectedDate,
                                           selectedTime,
                                         }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // 1. Nuevo estado para controlar la vista de éxito
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Opcional: para evitar doble click

  if (!isOpen) return null;
  if (!serviceDetails) return null;

  const date = new Date(selectedDate);
  const end = new Date(date);
  end.setMinutes(end.getMinutes() + serviceDetails.duration);
  const endString = end.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const docRef = await addDoc(collection(db, "appointment"), {
        serviceName: serviceDetails.name,
        duration: serviceDetails.duration,
        date: selectedDate, // Asegúrate de que esto sea un string o timestamp válido, no objeto Date puro si causa error
        time: selectedTime,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        createdAt: Timestamp.now(),
      });

      console.log("Cita guardada con ID:", docRef.id);

      // 2. Aquí cambiamos el estado en lugar del alert
      setIsSuccess(true);

      // NOTA: No hacemos setIsOpen(false) aquí, porque queremos que el usuario vea el mensaje de éxito primero.

    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Hubo un error al guardar la cita."); // Para errores sí podemos dejar un alert o usar otro estado de error
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cerrar todo y limpiar
  const handleClose = () => {
    setIsOpen(false);
    setIsSuccess(false); // Reseteamos para la próxima vez
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
      <div className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-dark-card w-full max-w-lg p-6 rounded-3xl shadow-ios-float border border-white/10 transform transition-all duration-300 scale-100">

          {/* 3. Renderizado Condicional: ¿Mostramos Éxito o Formulario? */}

          {isSuccess ? (
              // --- VISTA DE ÉXITO ---
              <div className="text-center py-6 animate-fadeIn">
                <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">¡Cita Confirmada!</h3>

                {/* Tu alerta personalizada integrada aquí */}
                <div className="p-4 mb-6 text-sm text-green-800 rounded-xl bg-green-100 border border-green-200" role="alert">
                  <span className="font-bold block text-base">¡Todo listo!</span>
                  Tu cita fue registrada correctamente. Te esperamos.
                </div>

                <button
                    onClick={handleClose}
                    className="w-full inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg text-dark-bg bg-gold-accent hover:bg-gold-secondary transition duration-300"
                >
                  Entendido
                </button>
              </div>

          ) : (
              // --- VISTA DEL FORMULARIO ---
              <>
                <h3 className="text-2xl font-bold text-gold-accent flex items-center mb-4">
                  <Zap className="w-6 h-6 mr-2" /> Confirmar Cita
                </h3>

                <p className="text-lg font-semibold text-text-light">
                  Servicio: <strong>{serviceDetails.name}</strong>
                </p>
                <p className="text-lg font-semibold text-text-light">
                  {/* Agregué el .toString() por seguridad con fechas */}
                  Tu cita es el: {new Date(selectedDate).toLocaleDateString()}
                </p>
                <p className="text-lg font-semibold text-text-light mb-6">
                  Termina a las: <strong>{endString}</strong>
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block mb-2 text-text-light">Nombre</label>
                    <input
                        required
                        type="text"
                        className="w-full border border-white/10 bg-dark-bg/50 text-text-light rounded-xl py-3 pl-4 pr-4 focus:outline-none focus:ring-2 focus:ring-gold-accent transition"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-text-light">Email</label>
                    <input
                        required
                        type="email"
                        className="w-full border border-white/10 bg-dark-bg/50 text-text-light rounded-xl py-3 pl-4 pr-4 focus:outline-none focus:ring-2 focus:ring-gold-accent transition"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-text-light">Teléfono</label>
                    <input
                        required
                        type="tel"
                        className="w-full border border-white/10 bg-dark-bg/50 text-text-light rounded-xl py-3 pl-4 pr-4 focus:outline-none focus:ring-2 focus:ring-gold-accent transition"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="pt-4 flex flex-col gap-3">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg text-dark-bg bg-gold-accent hover:bg-gold-secondary focus:outline-none disabled:opacity-50 transition duration-300"
                    >
                      {isLoading ? "Confirmando..." : "Confirmar"}
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="w-full inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl text-text-light bg-white/5 hover:bg-white/10 transition duration-300"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </>
          )}
        </div>
      </div>
  );
}