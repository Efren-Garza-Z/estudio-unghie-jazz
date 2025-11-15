import { useState } from 'react';
import { Calendar, Sparkles, Search, BellRing, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const servicesData = [ // Para el selector de servicios
    { name: 'Manicura (limpieza)', price: '$25.00' },
    { name: 'Gel semipermanente', price: '$40.00' },
    { name: 'Polygel', price: '$55.00' },
    { name: 'Soft Gel / Dual System', price: '$60.00' },
];

// Datos simulados para el calendario (Puedes expandir esto)
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

            {/* Próxima Cita (como en Image 2) */}
            <div className="bg-dark-card p-6 rounded-3xl shadow-ios-card mb-8 border border-white/10 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="bg-accent-pink/20 text-accent-pink p-4 rounded-2xl text-center mr-4">
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

            {/* Acciones Rápidas (como en Image 2) */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <button 
                    onClick={() => console.log('Agendar Cita')}
                    className="flex flex-col items-center justify-center bg-dark-card p-6 rounded-3xl shadow-ios-card border border-white/10 hover:bg-dark-surface transition h-40"
                >
                    <Calendar className="w-10 h-10 text-accent-pink mb-3" />
                    <p className="text-text-light font-medium text-lg">Agendar Cita</p>
                    <p className="text-text-secondary text-sm text-center">Reserva tu espacio</p>
                </button>
                <button 
                    onClick={() => console.log('Ver Servicios')}
                    className="flex flex-col items-center justify-center bg-dark-card p-6 rounded-3xl shadow-ios-card border border-white/10 hover:bg-dark-surface transition h-40"
                >
                    <Sparkles className="w-10 h-10 text-accent-purple mb-3" />
                    <p className="text-text-light font-medium text-lg">Servicios</p>
                    <p className="text-text-secondary text-sm text-center">Ver catálogo</p>
                </button>
            </div>

            {/* Tu Calendario (como en Image 2) */}
            <div className="bg-dark-card p-6 rounded-3xl shadow-ios-card mb-8 border border-white/10">
                <h3 className="text-xl font-bold text-text-light mb-4">Tu Calendario</h3>
                <div className="flex justify-between items-center mb-4">
                    <button className="p-2 rounded-full hover:bg-white/10 text-text-secondary transition">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-text-light font-semibold text-lg">Junio 2024</span>
                    <button className="p-2 rounded-full hover:bg-white/10 text-text-secondary transition">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
                <div className="grid grid-cols-7 text-center gap-2">
                    {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'].map(day => (
                        <div key={day} className="text-text-secondary text-sm font-medium">{day}</div>
                    ))}
                    {calendarDays.map((date, index) => (
                        <div 
                            key={index}
                            className={`
                                p-2 rounded-full text-center text-sm cursor-pointer
                                ${date.isSelected 
                                    ? 'bg-accent-pink text-white font-bold' 
                                    : date.month !== 'Jun' 
                                        ? 'text-text-placeholder' 
                                        : 'text-text-light hover:bg-dark-surface'}
                            `}
                        >
                            {date.day}
                        </div>
                    ))}
                </div>
            </div>

            {/* Formulario de Reserva (Detallado) */}
            <div className="bg-dark-card p-6 rounded-3xl shadow-ios-card border border-white/10">
                <h3 className="text-xl font-bold text-text-light mb-4">Detalles de Reserva</h3>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="service" className="block text-text-secondary text-sm font-medium mb-2">Servicio</label>
                        <select 
                            id="service" 
                            className="w-full p-3 rounded-xl bg-dark-surface text-text-light border border-white/10 focus:ring-accent-pink focus:border-accent-pink"
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            required
                        >
                            <option value="" className="text-text-placeholder">Selecciona tu servicio...</option>
                            {servicesData.map(s => (
                                <option key={s.name} value={s.name} className="bg-dark-surface text-text-light">
                                    {s.name} ({s.price})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-text-secondary text-sm font-medium mb-2">Fecha</label>
                        <input 
                            type="date" 
                            id="date" 
                            className="w-full p-3 rounded-xl bg-dark-surface text-text-light border border-white/10 focus:ring-accent-pink focus:border-accent-pink" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="time" className="block text-text-secondary text-sm font-medium mb-2">Hora</label>
                        <input 
                            type="time" 
                            id="time" 
                            className="w-full p-3 rounded-xl bg-dark-surface text-text-light border border-white/10 focus:ring-accent-pink focus:border-accent-pink" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-text-secondary text-sm font-medium mb-2">Nombre Completo</label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Tu nombre" 
                            className="w-full p-3 rounded-xl bg-dark-surface text-text-light border border-white/10 placeholder-text-placeholder focus:ring-accent-pink focus:border-accent-pink" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-text-secondary text-sm font-medium mb-2">Teléfono / WhatsApp</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            placeholder="+52 221 156 2234" 
                            className="w-full p-3 rounded-xl bg-dark-surface text-text-light border border-white/10 placeholder-text-placeholder focus:ring-accent-pink focus:border-accent-pink" 
                            required 
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full py-3 bg-accent-pink text-text-light font-bold rounded-2xl hover:bg-accent-purple transition duration-300 transform hover:scale-[1.01] shadow-neumorphic-md text-lg"
                    >
                        Confirmar Reserva
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AppointmentScreen;