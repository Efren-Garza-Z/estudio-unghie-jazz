import ServiceCard from '../components/ServiceCard';
import { MapPin, Calendar, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

import manicuraClasicaImg from '../assets/services/clasica/img-1.jpeg';
import gelSemipermanenteImg from '../assets/services/semipermanente/img-1.jpeg';
import polygelImg from '../assets/services/polygel/img-1.jpeg';
import softGelImg from '../assets/services/soft-gel/img-1.jpeg';
import dualSystemImg from '../assets/services/dual-system/img-1.jpeg';

// Datos de servicios sin precios, solo descripción
const servicesData = [
    { name: 'Manicura Clásica', description: 'Cuidado completo de uñas, cutículas y exfoliación.', img: manicuraClasicaImg },
    { name: 'Semipermanente', description: 'Color brillante y duradero por 3+ semanas con secado UV.', img: gelSemipermanenteImg },
    { name: 'Polygel', description: 'Extensión fuerte, ligera y flexible. Ideal para uñas largas.', img: polygelImg },
    { name: 'Soft Gel', description: 'Extensión con tip completo, rápido y con aspecto natural.', img: softGelImg },
    { name: 'Dual System', description: 'Extensión con tip completo, rápido y con aspecto natural.', img: dualSystemImg }
];
// Datos de Testimonios simulados
const testimonials = [
    { text: "¡El mejor servicio de uñas que he tenido! El diseño en Soft Gel quedó idéntico a la foto. Atención de 10.", author: "Andrea M.", rating: 5 },
    { text: "Jazmín es una verdadera artista. Cada detalle es cuidado y el Polygel me dura muchísimo sin levantarse.", author: "Sofía P.", rating: 5 },
    { text: "El ambiente es super relajante y el resultado de mi manicura fue perfecto. Volveré sin dudarlo.", author: "Luisa C.", rating: 5 },
];

const socialLinks = {
    address: 'https://maps.app.goo.gl/79Fa9n9KRSniiZvf7', // URL de ejemplo para el mapa
    addressText: 'Unión Sur 55, San Onofre, Centro, 90802 Santa Ana Chiautempan, Tlax.',
};

// Componente para mostrar estrellas de rating
const StarRating = ({ rating }) => (
    <div className="flex justify-center mb-3">
        {[...Array(5)].map((_, i) => (
            <Star 
                key={i} 
                className={`w-5 h-5 ${i < rating ? 'text-gold-accent fill-gold-accent' : 'text-text-secondary opacity-50'}`}
            />
        ))}
    </div>
);



const LandingPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Sección de Bienvenida/Hero */}
            <section className="text-center bg-dark-card rounded-3xl shadow-ios-float p-8 sm:p-12 mb-16 border border-white/10">
                <h2 className="text-5xl md:text-6xl font-script text-gold-accent mb-4 leading-tight">
                    Estudio Unghie JAZZ
                </h2>
                <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
                    Transforma tus manos en una obra de arte con nuestros diseños únicos y servicios exclusivos.
                </p>
                <Link 
                    to={'/cita'}
                    className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-2xl shadow-md text-dark-bg bg-gold-accent hover:bg-gold-secondary focus:outline-none focus:ring-4 focus:ring-gold-accent/50 transition duration-300 transform hover:scale-105"
                >
                    <Calendar className="w-6 h-6 mr-3" />
                    ¡Agenda tu Cita Ahora!
                </Link>
            </section>

            {/* Sección de Servicios Destacados */}
            <section className="mb-16">
                <h3 className="text-3xl font-bold text-center text-text-light mb-10">Nuestros Servicios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                 {servicesData.map((service) => (
                        <ServiceCard key={service.name} service={service} />
                    ))}
                </div>
            </section>

            {/* Nueva Sección: Testimonios y Reseñas para generar confianza */}
            <section className="mb-16">
                <h3 className="text-4xl font-bold text-center text-gold-accent mb-10">
                    Lo que Dicen Nuestras Clientes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, index) => (
                        <div key={index} className="bg-dark-surface glassmorphism p-6 rounded-3xl shadow-ios-card border border-gold-accent/20">
                            <StarRating rating={t.rating} />
                            <p className="text-text-light italic text-center mb-4 leading-relaxed">
                                "{t.text}"
                            </p>
                            <p className="text-sm font-semibold text-text-secondary text-center">
                                — {t.author}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sección de Ubicación con Mapa */}
            <section className="bg-dark-card p-8 rounded-3xl shadow-ios-card border border-white/10">
                <h3 className="text-3xl font-bold text-center text-text-light mb-8">Encuéntranos Fácilmente</h3>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/2 h-72 rounded-2xl overflow-hidden shadow-ios-card border-2 border-gold-accent/30">
                        <iframe 
                          // Reemplaza esta URL con el iframe de Google Maps del negocio real
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.3124742910923!2d-98.20028352520087!3d19.312242481941556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfde9530b73b63%3A0xceea8be638371ec3!2sUni%C3%B3n%20Sur%2055%2C%20San%20Onofre%2C%20Centro%2C%2090802%20Santa%20Ana%20Chiautempan%2C%20Tlax.!5e0!3m2!1sen!2smx!4v1763333507857!5m2!1sen!2smx"
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
                            {socialLinks.addressText}
                        </p>
                        <p className="text-text-secondary text-base leading-relaxed">
                            Estamos ubicados frente al gimnasio y a una cuadra paralela del Parque Hidalgo.
                        </p>
                        <a 
                            href={socialLinks.address} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-gold-accent text-dark-bg font-semibold rounded-xl hover:bg-gold-secondary/30 transition duration-200 text-sm shadow-sm"
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