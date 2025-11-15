import ServiceCard from '../components/ServiceCard'; // Asegúrate de importar tu ServiceCard
import { MapPin, Calendar, Sparkles } from 'lucide-react';

// Datos de servicios con precios y descripciones
const servicesData = [
    { name: 'Manicura (limpieza)', description: 'Cuidado completo de uñas y cutículas.', price: '$25.00', img: 'https://placehold.co/400x300/2C2C2E/AEAEB2?text=Manicura' },
    { name: 'Gel semipermanente', description: 'Color duradero por semanas.', price: '$40.00', img: 'https://placehold.co/400x300/2C2C2E/AEAEB2?text=Semipermanente' },
    { name: 'Polygel', description: 'Construcción ligera y flexible.', price: '$55.00', img: 'https://placehold.co/400x300/2C2C2E/AEAEB2?text=Polygel' },
    { name: 'Soft Gel / Dual System', description: 'Sistema de extensión rápido y natural.', price: '$60.00', img: 'https://placehold.co/400x300/2C2C2E/AEAEB2?text=Soft+Gel' },
];

const socialLinks = { // Datos de contacto para la sección de ubicación
    address: 'https://maps.app.goo.gl/TuDireccionDeEstudio', 
    addressText: 'Av. Principal #123, Tu Ciudad',
};

const LandingPage = ({ setView }) => {
    const handleReserveClick = (service) => {
        // Podrías pasar el servicio seleccionado al componente de citas
        console.log(`Reservar para ${service.name}`);
        setView('Appointment'); 
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Sección de Bienvenida/Hero */}
            <section className="text-center bg-dark-card rounded-3xl shadow-ios-float p-8 sm:p-12 mb-16 border border-white/10">
                <h2 className="text-5xl md:text-6xl font-script text-accent-pink mb-4 leading-tight">
                    Estudio Unghie JAZZ
                </h2>
                <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
                    Transforma tus manos en una obra de arte con nuestros diseños únicos y servicios exclusivos.
                </p>
                <button 
                    onClick={() => setView('Appointment')}
                    className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-2xl shadow-neumorphic-md text-text-light bg-accent-pink hover:bg-accent-purple focus:outline-none focus:ring-4 focus:ring-accent-pink/50 transition duration-300 transform hover:scale-105"
                >
                    <Calendar className="w-6 h-6 mr-3" />
                    ¡Agenda tu Cita Ahora!
                </button>
            </section>

            {/* Sección de Servicios Destacados (como en Image 1) */}
            <section className="mb-16">
                <h3 className="text-3xl font-bold text-center text-text-light mb-10">Nuestros Servicios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {servicesData.map((service) => (
                        <ServiceCard key={service.name} service={service} onReserveClick={handleReserveClick} />
                    ))}
                </div>
            </section>

            {/* Sección de Ubicación con Mapa */}
            <section className="bg-dark-card p-8 rounded-3xl shadow-ios-card border border-white/10">
                <h3 className="text-3xl font-bold text-center text-text-light mb-8">Encuéntranos Fácilmente</h3>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/2 h-72 rounded-2xl overflow-hidden shadow-neumorphic-md border-2 border-accent-pink/30">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.9443555208455!2d-99.1994646!3d19.4627264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f88c8f000001%3A0xf0c1c4e70b3b4d4!2sEl%20%C3%81ngel%20de%20la%20Independencia!5e0!3m2!1ses!2smx!4v1688640000000!5m2!1ses!2smx" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación del Estudio"
                        ></iframe>
                    </div>
                    <div className="w-full md:w-1/2 p-4 space-y-5">
                        <p className="text-xl text-text-light font-semibold">
                            **Dirección:** {socialLinks.addressText}
                        </p>
                        <p className="text-text-secondary text-base leading-relaxed">
                            Estamos ubicados en una zona accesible con opciones de estacionamiento y transporte público cercano. ¡Esperamos tu visita!
                        </p>
                        <a 
                            href={socialLinks.address} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-accent-purple/20 text-accent-purple font-semibold rounded-xl hover:bg-accent-purple/30 transition duration-200 text-sm shadow-sm"
                        >
                            Abrir en Google Maps <MapPin className="w-5 h-5 ml-2" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;