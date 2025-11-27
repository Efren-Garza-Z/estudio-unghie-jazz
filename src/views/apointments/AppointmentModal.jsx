// =================================================================
// 3. COMPONENTE MODAL
// =================================================================
import { useState } from 'react';
import { X, User, Mail, Phone, Clock, Zap, Calendar } from 'lucide-react';
import { servicesData } from '../../config';
import { saveAppointmentToFirestore, sendToGoogleCalendar } from '../../utils/utils';

// Nota: Los estilos usan clases de Tailwind CSS (dark-bg, gold-accent, etc.) que no están definidas aquí.

const AppointmentModal = ({ isOpen, onClose, slot, date, serviceName, onConfirm }) => {
    const [formData, setFormData] = useState({
        clientName: '',
        email: '',
        phone: ''
    });

    if (!isOpen) return null;

    const selectedService = servicesData.find(s => s.name === serviceName);
    if (!selectedService) return null;

    // Calcular el tiempo de fin
    const endTime = new Date(date); 
    endTime.setMinutes(date.getMinutes() + selectedService.duration);
    const endTimeString = endTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const appointmentDetails = {
            ...formData,
            serviceName: selectedService.name,
            duration: selectedService.duration,
            date: date.toISOString(), // Guardamos la fecha/hora en formato ISO
            status: 'Pendiente',
            // Simulamos un ID único
            id: Date.now() + Math.random().toString(36).substring(2, 9) 
        };
        
        // 1. Guardar en Firestore (Simulado)
        const firestoreSuccess = await saveAppointmentToFirestore(appointmentDetails);

        if (firestoreSuccess) {
            // 2. Ejecutar callback para actualizar el estado local (AppScreen)
            onConfirm(appointmentDetails); 

            // 3. Integración con Google Calendar (Simulado)
            sendToGoogleCalendar(appointmentDetails);
        } else {
            console.error("Fallo al guardar en el servidor (simulado).");
        }
        
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-dark-card w-full max-w-lg p-6 rounded-3xl shadow-ios-float border border-white/10 transform transition-all duration-300 scale-100">
                {/* Contenido del Modal (Header, Detalles, Formulario) */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gold-accent flex items-center">
                        <Zap className="w-6 h-6 mr-2" /> Confirmar Cita
                    </h3>
                    <button onClick={onClose} className="p-2 rounded-full text-text-light hover:bg-white/10 transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                {/* Detalles de la Cita */}
                <div className="space-y-3 mb-6 p-4 bg-dark-surface rounded-xl border border-white/5">
                    <p className="text-lg font-semibold text-text-light">{serviceName}</p>
                    <div className='flex items-center text-text-secondary text-sm'>
                        <Calendar className="w-4 h-4 mr-2" /> 
                        {date.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className='flex items-center text-text-secondary text-sm'>
                        <Clock className="w-4 h-4 mr-2" /> 
                        {`${slot} - ${endTimeString} (${selectedService.duration} min)`}
                    </div>
                </div>

                {/* Formulario de Cliente */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Campos de Nombre, Email, Teléfono */}
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                        <input type="text" name="clientName" placeholder="Tu Nombre Completo" value={formData.clientName} onChange={handleChange} required className="w-full bg-dark-surface border border-white/10 text-text-light rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gold-accent transition" />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                        <input type="email" name="email" placeholder="Email (ej: yo@correo.com)" value={formData.email} onChange={handleChange} required className="w-full bg-dark-surface border border-white/10 text-text-light rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gold-accent transition" />
                    </div>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                        <input type="tel" name="phone" placeholder="Teléfono (ej: 55 1234 5678)" value={formData.phone} onChange={handleChange} required className="w-full bg-dark-surface border border-white/10 text-text-light rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gold-accent transition" />
                    </div>

                    <button type="submit" className="w-full inline-flex items-center justify-center px-8 py-4 mt-6 text-lg font-semibold rounded-2xl shadow-lg text-dark-bg bg-gold-accent hover:bg-gold-secondary focus:outline-none focus:ring-4 focus:ring-gold-accent/50 transition duration-300">
                        Confirmar y Agendar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AppointmentModal;