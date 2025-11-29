import ImageCarousel from '../components/ImageCarousel';
import { Sparkles, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom'; // Importamos Link
import { galleryData } from '../assets/constants/galleryData';


const ServicesGalleryScreen = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Título de la Sección */}
            <div className="text-center mb-10">
                <h1 className="text-5xl font-script text-gold-accent mb-2">Galería de Arte de Uñas</h1>
                <p className="text-xl text-text-light flex items-center justify-center">
                    <Sparkles className="w-5 h-5 mr-2 text-gold-secondary" /> Nuestros trabajos más impresionantes.
                </p>
            </div>
            
            {/* Carruseles por Servicio */}
            <section>
                {/* Mapeamos el array importado */}
                {galleryData.map((category, index) => (
                    <ImageCarousel 
                        key={index} 
                        title={category.title} 
                        images={category.images} 
                    />
                ))}
            </section>

            {/* Llamado a la Acción al final de la galería */}
            <div className="text-center mt-16 p-8 bg-dark-surface rounded-3xl shadow-ios-float border border-gold-accent/20">
                <h2 className="text-3xl font-bold text-text-light mb-4">¡Inspírate y Agenda tu Transformación!</h2>
                <p className="text-lg text-text-secondary mb-6">
                    ¿Te gustó algún diseño? ¡Haz clic para reservar tu cita y hacerlo realidad!
                </p>
                <Link 
                    to="/cita" 
                    className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg text-dark-bg bg-gold-secondary hover:bg-gold-accent transition duration-300 transform hover:scale-105"
                >
                    <Calendar className="w-6 h-6 mr-3" />
                    Reservar Cita
                </Link>
            </div>
        </div>
    );
};

export default ServicesGalleryScreen;