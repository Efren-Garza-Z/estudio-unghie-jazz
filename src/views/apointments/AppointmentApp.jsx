// =================================================================
// 4. COMPONENTE PRINCIPAL DE APLICACIÓN
// =================================================================
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Calendar, Sparkles, Search, BellRing, ChevronLeft, ChevronRight, ArrowRight, Clock } from 'lucide-react';

import AppointmentModal from './AppointmentModal';
import { 
    servicesData, 
    LOCAL_STORAGE_KEY 
} from '../../config';
import { 
    initializeFirebase, 
    getAvailableTimeSlots, 
    generateCalendarDays, 
    buildAppointmentDate 
} from '../../utils/utils';


const AppointmentApp = () => {
    // Inicializar Firebase al cargar (Simulado)
    useEffect(() => {
        initializeFirebase();
    }, []);

    // 1. Estados principales
    const [selectedService, setSelectedService] = useState(servicesData[0].name);
    const [selectedDate, setSelectedDate] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate()); // solo día
    });
    const [currentCalendarView, setCurrentCalendarView] = useState(new Date());
    // appointments: init desde localStorage
    const [appointments, setAppointments] = useState(() => {
        try {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            const parsed = stored ? JSON.parse(stored) : [];
            return parsed.sort((a, b) => new Date(a.date) - new Date(b.date));
        } catch (e) {
            console.error("Error al cargar citas:", e);
            return [];
        }
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlotTime, setSelectedSlotTime] = useState(null);

    // Guardar appointments en localStorage cuando cambian
    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appointments));
        } catch (e) {
            console.error("Error guardando citas en localStorage:", e);
        }
    }, [appointments]);

    // 2. Valores Derivados (usando useMemo)
    const upcomingAppointment = useMemo(() => {
        const now = new Date();
        const futureAppointments = appointments
            .filter(app => new Date(app.date) > now)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
        return futureAppointments[0];
    }, [appointments]);

    const serviceDetails = useMemo(() =>
        servicesData.find(s => s.name === selectedService)
    , [selectedService]);

    const availableSlots = useMemo(() => {
        if (!selectedDate || !serviceDetails) return [];
        return getAvailableTimeSlots(selectedDate, serviceDetails.duration, appointments);
    }, [selectedDate, serviceDetails, appointments]);
    
    const calendarDays = useMemo(() => generateCalendarDays(currentCalendarView), [currentCalendarView]);
    const currentMonthYear = currentCalendarView.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

    // 3. Handlers de Interfaz (usando useCallback)
    const handleDayClick = useCallback((date) => {
        const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        setSelectedDate(dateOnly);
        setSelectedSlotTime(null);
    }, []);

    const handleSlotClick = useCallback((slotTime) => {
        setSelectedSlotTime(slotTime);
        setIsModalOpen(true);
    }, []);

    const handleConfirmAppointment = useCallback((newAppointment) => {
        setAppointments(prev => {
            const updated = [...prev, newAppointment];
            updated.sort((a, b) => new Date(a.date) - new Date(b.date));
            return updated;
        });
        setSelectedSlotTime(null);
        setIsModalOpen(false);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate()));
    }, []);

    const goToPreviousMonth = () => setCurrentCalendarView(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    const goToNextMonth = () => setCurrentCalendarView(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

    // Helper para formatear
    const formatAppointmentTime = (app) => {
        if (!app) return null;
        const start = new Date(app.date);
        const end = new Date(start.getTime() + app.duration * 60000);
        const startTime = start.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true });
        const endTime = end.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true });
        return `${startTime} - ${endTime}`;
    };

    return (
        <div className="max-w-md mx-auto p-4 sm:p-6 mt-8">
            {/* Sección de Bienvenida/Próxima Cita */}
            {/* ... (Tu JSX de la sección de bienvenida y próxima cita) ... */}
            
            {/* Sección de Agendamiento */}
            <h3 className="text-2xl font-bold text-text-light mb-6">Nuevo Agendamiento</h3>

            {/* Selector de Servicio */}
            <div className="mb-6">
                <label htmlFor="service-select" className="block text-text-light font-medium mb-3">
                    Selecciona un Servicio:
                </label>
                <div className="relative">
                    <select
                        id="service-select"
                        value={selectedService}
                        onChange={(e) => {
                            setSelectedService(e.target.value);
                            setSelectedSlotTime(null);
                        }}
                        className="w-full bg-dark-card border border-white/10 text-text-light rounded-xl py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-gold-accent transition cursor-pointer"
                    >
                        {servicesData.map((service) => (
                            <option key={service.name} value={service.name}>
                                {`${service.name} (${service.duration} min)`}
                            </option>
                        ))}
                    </select>
                    {/* ... (Icono de flecha) ... */}
                </div>
                {serviceDetails && (
                    <p className="text-xs text-text-secondary mt-2">Duración estimada: {serviceDetails.duration} minutos.</p>
                )}
            </div>

            {/* Calendario */}
            <div className="bg-dark-card p-6 rounded-3xl shadow-ios-card border border-white/10 mb-8">
                {/* Navegación del Calendario */}
                <div className="flex justify-between items-center mb-5 text-text-light">
                    <button onClick={goToPreviousMonth} className="text-gold-accent hover:text-gold-secondary transition"><ChevronLeft className="w-7 h-7" /></button>
                    <h4 className="text-xl font-semibold capitalize">{currentMonthYear}</h4>
                    <button onClick={goToNextMonth} className="text-gold-accent hover:text-gold-secondary transition"><ChevronRight className="w-7 h-7" /></button>
                </div>

                {/* Días de la semana */}
                <div className="grid grid-cols-7 text-center text-sm text-text-secondary font-medium mb-3">
                    {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (<span key={day}>{day}</span>))}
                </div>

                {/* Días del mes */}
                <div className="grid grid-cols-7 text-center gap-1">
                    {calendarDays.map((dateObj, index) => {
                        const isSelected = selectedDate && dateObj.date.toDateString() === selectedDate.toDateString();
                        const isPast = dateObj.date.setHours(23,59,59,999) < new Date().getTime(); 

                        return (
                            <div
                                key={index}
                                onClick={() => !isPast && handleDayClick(dateObj.date)}
                                className={`
                                    flex items-center justify-center w-full aspect-square rounded-full transition duration-150 text-base
                                    ${!dateObj.isCurrentMonth ? 'text-text-placeholder opacity-50' : ''}
                                    ${isPast ? 'text-text-placeholder cursor-not-allowed opacity-30' : 'cursor-pointer'}
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
                <div className="mb-8">
                    <h4 className="text-xl font-bold text-text-light mb-4">
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
                                        className={`px-4 py-2 rounded-xl border font-medium transition duration-200 
                                            ${isSelected ? 'bg-gold-secondary text-dark-bg border-gold-secondary shadow-lg' : 'bg-dark-surface text-text-light border-white/10 hover:bg-white/10'}
                                        `}
                                    >
                                        <Clock className='inline w-4 h-4 mr-1'/> {slotTime}
                                    </button>
                                );
                            })
                        ) : (
                            <p className="text-text-secondary">No hay horarios disponibles para el servicio y día seleccionados. Intenta otro día.</p>
                        )}
                    </div>
                </div>
            )}

            {/* Modal de Cita */}
            <AppointmentModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                slot={selectedSlotTime}
                date={selectedSlotTime ? buildAppointmentDate(selectedDate, selectedSlotTime) : selectedDate}
                serviceName={selectedService}
                onConfirm={handleConfirmAppointment}
            />

            {/* Sección de Promociones */}
            {/* ... (Tu JSX de la sección de promociones) ... */}
        </div>
    );
};

export default AppointmentApp;