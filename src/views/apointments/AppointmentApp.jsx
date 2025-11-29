// AppointmentApp.jsx
import { useState, useEffect, useMemo, useCallback } from 'react';
import AppointmentModal from "./AppointmentModal";
import { getAvailableTimeSlots, generateCalendarDays } from "../../utils/calendarUtils";
import { servicesData } from "../../config";
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'; // Eliminé iconos no usados para limpiar

export default function AppointmentApp({ appointments }) {
    const [selectedService, setSelectedService] = useState("");
    // CAMBIO 1: Inicializar como null para verificar tipos fácilmente
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlotTime, setSelectedSlotTime] = useState(null);
    const [serviceDetails, setServiceDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCalendarView, setCurrentCalendarView] = useState(new Date());

    const goToPreviousMonth = () => setCurrentCalendarView(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    const goToNextMonth = () => setCurrentCalendarView(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

    const calendarDays = useMemo(() => generateCalendarDays(currentCalendarView), [currentCalendarView]);
    const currentMonthYear = currentCalendarView.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

    const handleDayClick = useCallback((date) => {
        // Normalizamos la fecha para evitar problemas de zonas horarias
        const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        setSelectedDate(dateOnly);
        setSelectedSlotTime(null); // Reseteamos la hora si cambia el día
    }, []);

    const handleSlotClick = useCallback((slotTime) => {
        setSelectedSlotTime(slotTime);
        setIsModalOpen(true);
    }, []);

    // 1. Cargar detalles del servicio
    useEffect(() => {
        const details = servicesData.find((s) => s.name === selectedService) || null;
        queueMicrotask(() => setServiceDetails(details));
        queueMicrotask(() => setAvailableSlots([])); // Limpiamos slots si cambia el servicio
        queueMicrotask(() => setSelectedSlotTime(null));
    }, [selectedService]);

    // 2. Calcular slots disponibles
    useEffect(() => {
        if (!selectedDate || !serviceDetails) {
            queueMicrotask(()=> setAvailableSlots([]));
            return;
        }

        // --- CORRECCIÓN CRÍTICA ---
        // Tu utilidad antigua probablemente espera un string "YYYY-MM-DD".
        // Convertimos el objeto Date a string formato ISO (parte de fecha).
        // Nota: Ajusta esto si tu utilidad espera otro formato.
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;

        try {
            const newSlots = getAvailableTimeSlots(
                dateString, // Pasamos el string, no el objeto Date
                serviceDetails.duration,
                appointments
            );
            queueMicrotask(() => setAvailableSlots(newSlots));
        } catch (error) {
            console.error("Error calculando slots:", error);
            queueMicrotask(() => setAvailableSlots([]));
        }
    }, [selectedDate, serviceDetails, appointments]);

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Selecciona un Servicio:</h1>

            {/* Selección de servicio */}
            <div className="mb-6">

            <label className="block mb-2 font-semibold">Servicio</label>
                <select
                    className="w-full bg-dark-card border border-white/10 text-text-light rounded-xl py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-gold-accent transition cursor-pointer"
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
            </div>

            {/* Calendario (Solo visible si hay servicio seleccionado para mejor UX, opcional) */}
            <div className="bg-dark-card text-white p-6 rounded-3xl shadow-lg border border-white/10 mb-8">
                {/* Navegación */}
                <div className="flex justify-between items-center mb-5">
                    <button onClick={goToPreviousMonth} className="hover:text-gold-accent transition"><ChevronLeft className="w-7 h-7" /></button>
                    <h4 className="text-xl font-semibold capitalize">{currentMonthYear}</h4>
                    <button onClick={goToNextMonth} className="hover:text-gold-accent transition"><ChevronRight className="w-7 h-7" /></button>
                </div>

                {/* Días semana */}
                <div className="grid grid-cols-7 text-center text-sm text-gray-400 font-medium mb-3">
                    {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (<span key={day}>{day}</span>))}
                </div>

                {/* Grid Días */}
                <div className="grid grid-cols-7 text-center gap-1">
                    {calendarDays.map((dateObj, index) => {
                        // Comparación segura de fechas
                        const isSelected = selectedDate && dateObj.date.toDateString() === selectedDate.toDateString();
                        const now = new Date();
                        now.setHours(0,0,0,0);
                        const isPast = dateObj.date < now;

                        return (
                            <div
                                key={index}
                                onClick={() => !isPast && handleDayClick(dateObj.date)}
                                className={`
                                flex items-center justify-center w-full aspect-square rounded-full transition duration-150 text-base
                                ${!dateObj.isCurrentMonth ? 'text-gray-600 opacity-50' : ''}
                                ${isPast ? 'text-gray-600 cursor-not-allowed opacity-30' : 'cursor-pointer'}
                                ${isSelected ? 'bg-gold-accent text-dark-bg font-bold shadow-md' : isPast ? '' : 'text-text-light hover:bg-white/10'}
                            `}
                            >
                                {dateObj.day}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Horarios Disponibles */}
            {selectedService && selectedDate && (
                <div className="mb-8 fade-in">
                    <h4 className="text-xl font-bold mb-4">
                        Horarios disponibles para {selectedDate.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'short' })}:
                    </h4>
                    <div className="flex flex-wrap gap-3">
                        {availableSlots.length > 0 ? (
                            availableSlots.map((slotTime) => {
                                const isSelected = slotTime === selectedSlotTime;
                                return (
                                    <button
                                        key={slotTime}
                                        onClick={() => handleSlotClick(slotTime)}
                                        className={`px-4 py-2 rounded-xl border font-medium transition duration-200 flex items-center
                                            ${isSelected ? 'bg-gold-secondary text-dark-bg border-gold-secondary shadow-lg' : 'bg-dark-surface text-text-light border-white/10 hover:bg-white/10'}
                                        `}
                                    >
                                        <Clock className='w-4 h-4 mr-2'/> {slotTime}
                                    </button>
                                );
                            })
                        ) : (
                            <p className="text-gray-500 italic">No hay horarios disponibles. Intenta otro día.</p>
                        )}
                    </div>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <AppointmentModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    serviceDetails={serviceDetails}
                    selectedDate={selectedDate}
                    selectedTime={selectedSlotTime}
                />
            )}
        </div>
    );
}