import { useState, useEffect, useMemo, useCallback } from 'react';
import { Calendar, Sparkles, Search, BellRing, ChevronLeft, ChevronRight, ArrowRight, Clock } from 'lucide-react';
import AppointmentModal from './AppointmentModal';
import { servicesData, getAvailableTimeSlots, LOCAL_STORAGE_KEY } from '../../utils/AppointmentUtils';

// Helper para generar días del calendario (simula 42 días, 6 semanas)
const generateCalendarDays = (currentDate) => {
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const dayOfWeek = (startOfMonth.getDay() + 6) % 7; // Lunes = 0, Domingo = 6
  const startDate = new Date(startOfMonth);
  startDate.setDate(startOfMonth.getDate() - dayOfWeek);

  const days = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push({
      date,
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      isCurrentMonth: date.getMonth() === currentDate.getMonth()
    });
  }
  return days;
};

// Construye una Date combinando día base + slot ("10:30 AM")
const buildAppointmentDate = (baseDate, slot) => {
  if (!slot) return new Date(baseDate);
  const [time, ampm] = slot.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (ampm === "PM" && hours !== 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;

  const d = new Date(baseDate);
  d.setHours(hours, minutes, 0, 0);

  return d;
};

const AppointmentScreen = () => {
  // 1. Estados principales
  const [selectedService, setSelectedService] = useState(servicesData[0].name);
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()); // solo día
  });
  const [currentCalendarView, setCurrentCalendarView] = useState(new Date());
  // appointments: init desde localStorage (ordenado al cargar)
  const [appointments, setAppointments] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      // ordenar al cargar para consistencia
      return parsed.sort((a, b) => new Date(a.date) - new Date(b.date));
    } catch (e) {
      console.error("Error al cargar citas:", e);
      return [];
    }
  });

  // Ya no tenemos availableSlots como state; lo calculamos con useMemo (derivado)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlotTime, setSelectedSlotTime] = useState(null);

  // Guardar appointments en localStorage cuando cambian (sin recrear arrays)
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appointments));
    } catch (e) {
      console.error("Error guardando citas en localStorage:", e);
    }
  }, [appointments]);

  // Próxima cita (derivado)
  const upcomingAppointment = useMemo(() => {
    const now = new Date();
    const futureAppointments = appointments
      .filter(app => new Date(app.date) > now)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    return futureAppointments[0];
  }, [appointments]);

  // servicio seleccionado (derivado)
  const serviceDetails = useMemo(() =>
    servicesData.find(s => s.name === selectedService)
  , [selectedService]);

  // --- 4. availableSlots: derivado con useMemo (evita setState en effects) ---
  const availableSlots = useMemo(() => {
    if (!selectedDate || !serviceDetails) return [];
    // getAvailableTimeSlots debe ser puro (no mutaciones)
    return getAvailableTimeSlots(selectedDate, serviceDetails.duration, appointments);
  }, [selectedDate, serviceDetails, appointments]);

  // 5. Handlers de Interfaz
  const handleDayClick = useCallback((date) => {
    // Mantener solo la parte día (sin hora)
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    setSelectedDate(dateOnly);
    setSelectedSlotTime(null); // resetear hora al cambiar día
  }, []);

  // Opción A: No modificamos selectedDate cuando seleccionas un slot.
  const handleSlotClick = useCallback((slotTime) => {
    setSelectedSlotTime(slotTime);
    setIsModalOpen(true);
  }, []);

  // Al confirmar una cita: agregamos y ordenamos aquí (no en effect)
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
    // Restaurar selectedDate a solo día (en caso que se haya manipulado)
    setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate()));
  }, []);

  // Navegación calendario
  const goToPreviousMonth = () => setCurrentCalendarView(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const goToNextMonth = () => setCurrentCalendarView(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  const calendarDays = useMemo(() => generateCalendarDays(currentCalendarView), [currentCalendarView]);
  const currentMonthYear = currentCalendarView.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

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
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-text-secondary text-sm">¡Hola de nuevo!</p>
          <h2 className="text-4xl font-script text-text-light">Jazmín</h2>
        </div>
        <div className="flex space-x-3">
          <button className="p-3 rounded-full bg-dark-card text-text-light shadow-ios-card hover:bg-dark-surface transition">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full bg-dark-card text-text-light shadow-ios-card hover:bg-dark-surface transition">
            <BellRing className="w-5 h-5" />
          </button>
        </div>
      </div>

      {upcomingAppointment ? (
        <div className="bg-dark-card p-6 rounded-3xl shadow-ios-card mb-8 border border-white/10 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-gold-accent/20 text-gold-accent p-4 rounded-2xl text-center mr-4">
              <p className="text-2xl font-bold">{new Date(upcomingAppointment.date).getDate()}</p>
              <p className="text-xs uppercase">{new Date(upcomingAppointment.date).toLocaleDateString('es-ES', { month: 'short' }).toUpperCase().replace('.', '')}</p>
            </div>
            <div>
              <p className="text-text-light font-semibold text-lg">{upcomingAppointment.serviceName}</p>
              <p className="text-text-secondary text-sm">{formatAppointmentTime(upcomingAppointment)}</p>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-text-secondary" />
        </div>
      ) : (
        <div className="bg-dark-surface p-4 rounded-xl text-center mb-8 text-text-secondary">
          No tienes citas próximas agendadas.
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="flex flex-col items-center justify-center bg-dark-card p-6 rounded-3xl shadow-ios-card border border-white/10 hover:bg-dark-surface transition h-40">
          <Calendar className="w-10 h-10 text-gold-accent mb-3" />
          <p className="text-text-light font-medium text-lg">Agendar Cita</p>
          <p className="text-text-secondary text-sm text-center">Reserva tu espacio</p>
        </button>
        <button className="flex flex-col items-center justify-center bg-dark-card p-6 rounded-3xl shadow-ios-card border border-white/10 hover:bg-dark-surface transition h-40">
          <Sparkles className="w-10 h-10 text-gold-accent mb-3" />
          <p className="text-text-light font-medium text-lg">Servicios</p>
          <p className="text-text-secondary text-sm text-center">Ver catálogo</p>
        </button>
      </div>

      <h3 className="text-2xl font-bold text-text-light mb-6">Nuevo Agendamiento</h3>

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
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gold-accent">
            <ArrowRight className="w-5 h-5 transform rotate-90" />
          </div>
        </div>
        {serviceDetails && (
          <p className="text-xs text-text-secondary mt-2">Duración estimada: {serviceDetails.duration} minutos.</p>
        )}
      </div>

      <div className="bg-dark-card p-6 rounded-3xl shadow-ios-card border border-white/10 mb-8">
        <div className="flex justify-between items-center mb-5 text-text-light">
          <button onClick={goToPreviousMonth} className="text-gold-accent hover:text-gold-secondary transition">
            <ChevronLeft className="w-7 h-7" />
          </button>
          <h4 className="text-xl font-semibold capitalize">{currentMonthYear}</h4>
          <button onClick={goToNextMonth} className="text-gold-accent hover:text-gold-secondary transition">
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>

        <div className="grid grid-cols-7 text-center text-sm text-text-secondary font-medium mb-3">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
            <span key={day}>{day}</span>
          ))}
        </div>

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
                  ${isSelected 
                    ? 'bg-gold-accent text-dark-bg font-bold shadow-md' 
                    : isPast ? '' : 'text-text-light hover:bg-white/10'}
                `}
              >
                {dateObj.day}
              </div>
            );
          })}
        </div>
      </div>

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
                      ${isSelected 
                        ? 'bg-gold-secondary text-dark-bg border-gold-secondary shadow-lg' 
                        : 'bg-dark-surface text-text-light border-white/10 hover:bg-white/10'}
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

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        slot={selectedSlotTime}
        // enviamos la fecha completa combinada al modal sin mutar selectedDate global
        date={selectedSlotTime ? buildAppointmentDate(selectedDate, selectedSlotTime) : selectedDate}
        serviceName={selectedService}
        onConfirm={handleConfirmAppointment}
      />

      <div className="text-center">
        <h3 className="text-2xl font-bold text-gold-accent mb-4">Promociones</h3>
        <p className="text-text-secondary mb-6">
          Consulta nuestras ofertas especiales de temporada y diseños exclusivos del mes.
        </p>
      </div>
    </div>
  );
};

export default AppointmentScreen;
