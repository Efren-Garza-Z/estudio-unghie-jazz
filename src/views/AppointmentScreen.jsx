import React, { useState } from 'react';
import { Calendar, Sparkles, Search, BellRing, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

// Datos de servicios sin precios
const servicesData = [
    { name: 'Manicura (limpieza)' },
    { name: 'Gel semipermanente' },
    { name: 'Polygel' },
    { name: 'Soft Gel / Dual System' },
];

// Datos de días del calendario (simulación)
const calendarDays = [
    { day: 26, month: 'May' }, { day: 27, month: 'May' }, { day: 28, month: 'May' }, { day: 29, month: 'May' }, { day: 30, month: 'May' }, { day: 31, month: 'May' }, { day: 1, month: 'Jun' },
    { day: 2, month: 'Jun' }, { day: 3, month: 'Jun' }, { day: 4, month: 'Jun' }, { day: 5, month: 'Jun' }, { day: 6, month: 'Jun' }, { day: 7, month: 'Jun' }, { day: 8, month: 'Jun' },
    { day: 9, month: 'Jun' }, { day: 10, month: 'Jun' }, { day: 11, month: 'Jun' }, { day: 12, month: 'Jun', isSelected: true }, { day: 13, month: 'Jun' }, { day: 14, month: 'Jun' }, { day: 15, month: 'Jun' },
    { day: 16, month: 'Jun' }, { day: 17, month: 'Jun' }, { day: 18, month: 'Jun' }, { day: 19, month: 'Jun' }, { day: 20, month: 'Jun' }, { day: 21, month: 'Jun' }, { day: 22, month: 'Jun' },
    { day: 23, month: 'Jun' }, { day: 24, month: 'Jun' }, { day: 25, month: 'Jun' }, { day: 26, month: 'Jun' }, { day: 27, month: 'Jun' }, { day: 28, month: 'Jun' }, { day: 29, month: 'Jun' },
    { day: 30, month: 'Jun' }, { day: 1, month: 'Jul' }, { day: 2, month: 'Jul' }, { day: 3, month: 'Jul' }, { day: 4, month: 'Jul' }, { day: 5, month: 'Jul' }, { day: 6, month: 'Jul' },
];


const AppointmentScreen = () => {
    const [selectedService, setSelectedService] = useState('');

    return (
        <div className="max-w-md mx-auto p-4 sm:p-6 mt-8">
            {/* Header de la pantalla de citas (simil "Hola de nuevo, Jazmin") */}
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

            {/* Próxima Cita */}
            <div className="bg-dark-card p-6 rounded-3xl shadow-ios-card mb-8 border border-white/10 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="bg-gold-accent/20 text-gold-accent p-4 rounded-2xl text-center mr-4">
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-xs uppercase">JUN</p>
                    </div>
                    <div>
                        <p className="text-text-light font-semibold text-lg">Soft Gel / Dual System</p>
                        <p className="text-text-secondary text-sm">10:00 AM - 11:30 AM</p>
                    </div>
                </div>
                <ArrowRight className="w-6 h-6 text-text-secondary" />
            </div>

            {/* Acciones Rápidas */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <button 
                    onClick={() => console.log('Agendar Cita')}
                    className="flex flex-col items-center justify-center bg-dark-card p-6 rounded-3xl shadow-ios-card border border-white/10 hover:bg-dark-surface transition h-40"
                >
                    <Calendar className="w-10 h-10 text-gold-accent mb-3" />
                    <p className="text-text-light font-medium text-lg">Agendar Cita</p>
                    <p className="text-text-secondary text-sm text-center">Reserva tu espacio</p>
                </button>
                <button 
                    onClick={() => console.log('Ver Servicios')}
                    className="flex flex-col items-center justify-center bg-dark-card p-6 rounded-3xl shadow-ios-card border border-white/10 hover:bg-dark-surface transition h-40"
                >
                    <Sparkles className="w-10 h-10 text-gold-accent mb-3" />
                    <p className="text-text-light font-medium text-lg">Servicios</p>
                    <p className="text-text-secondary text-sm text-center">Ver catálogo</p>
                </button>
            </div>

            {/* Inicia el Formulario de Agendamiento */}
            <h3 className="text-2xl font-bold text-text-light mb-6">Tu Calendario</h3>
            
            {/* Sección de Selección de Servicio */}
            <div className="mb-6">
                <label htmlFor="service-select" className="block text-text-light font-medium mb-3">
                    Selecciona un Servicio:
                </label>
                <div className="relative">
                    <select
                        id="service-select"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full bg-dark-card border border-white/10 text-text-light rounded-xl py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-gold-accent transition cursor-pointer"
                    >
                        <option value="" disabled>-- Selecciona un servicio --</option>
                        {servicesData.map((service) => (
                            // Solo muestra el nombre del servicio, el precio ha sido eliminado
                            <option key={service.name} value={service.name}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gold-accent">
                        <ChevronRight className="w-5 h-5 transform rotate-90" />
                    </div>
                </div>
            </div>

            {/* Sección de Calendario */}
            <div className="bg-dark-card p-6 rounded-3xl shadow-ios-card border border-white/10 mb-8">
                <div className="flex justify-between items-center mb-5 text-text-light">
                    <button className="text-gold-accent hover:text-gold-secondary transition">
                        <ChevronLeft className="w-7 h-7" />
                    </button>
                    <h4 className="text-xl font-semibold">Junio 2024</h4>
                    <button className="text-gold-accent hover:text-gold-secondary transition">
                        <ChevronRight className="w-7 h-7" />
                    </button>
                </div>
                
                {/* Días de la semana */}
                <div className="grid grid-cols-7 text-center text-sm text-text-secondary font-medium mb-3">
                    {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'].map(day => (
                        <span key={day}>{day}</span>
                    ))}
                </div>

                {/* Días del mes */}
                <div className="grid grid-cols-7 text-center gap-1">
                    {calendarDays.map((date, index) => (
                        <div
                            key={index}
                            className={`
                                flex items-center justify-center w-full aspect-square rounded-full transition duration-150
                                ${date.month !== 'Jun' ? 'text-text-placeholder opacity-50' : ''}
                                ${date.isSelected 
                                    ? 'bg-gold-accent text-dark-bg font-bold shadow-md' 
                                    : 'text-text-light hover:bg-white/10 cursor-pointer'}
                            `}
                        >
                            {date.day}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Promociones / Call to Action */}
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