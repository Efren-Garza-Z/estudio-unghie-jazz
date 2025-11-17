import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Datos de la galería de servicios (solo nombre e imagen)
const servicesData = [
    { name: 'Manicura Clásica', img: 'https://placehold.co/800x600/282828/AEAEB2?text=Diseño+Manicura+Clásica' },
    { name: 'Gel Semi-permanente', img: 'https://placehold.co/800x600/282828/AEAEB3?text=Diseño+Gel+Semi-permanente' },
    { name: 'Polygel - Almendra', img: 'https://placehold.co/800x600/282828/AEAEB4?text=Diseño+Polygel+Almendra' },
    { name: 'Soft Gel - Francesa', img: 'https://placehold.co/800x600/282828/AEAEB5?text=Diseño+Soft+Gel+Francesa' },
    { name: 'Diseño de Arte 3D', img: 'https://placehold.co/800x600/282828/AEAEB6?text=Diseño+Arte+3D' },
];

const ServicesGalleryScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex + 1) % servicesData.length
        );
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex - 1 + servicesData.length) % servicesData.length
        );
    };

    const currentService = servicesData[currentIndex];

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 mt-8">
            <h2 className="text-4xl font-bold text-center text-gold-accent mb-10">
                Galería de Arte y Diseño
            </h2>
            
            <div className="relative bg-dark-card rounded-3xl shadow-ios-float p-4 border border-white/10">
                
                {/* Carrusel / Imagen Central */}
                <div className="overflow-hidden rounded-2xl aspect-video mb-4">
                    <img 
                        src={currentService.img} 
                        alt={currentService.name} 
                        className="w-full h-full object-cover transition-opacity duration-500"
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/800x600/282828/AEAEB2?text=Sin+Imagen" }}
                    />
                </div>

                {/* Controles de Navegación */}
                <button 
                    onClick={goToPrevious}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-dark-surface/70 backdrop-blur-sm text-gold-accent p-3 rounded-full shadow-lg hover:bg-dark-surface transition z-10"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>
                <button 
                    onClick={goToNext}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-dark-surface/70 backdrop-blur-sm text-gold-accent p-3 rounded-full shadow-lg hover:bg-dark-surface transition z-10"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
                
                {/* Información del Servicio */}
                <div className="text-center pt-4">
                    <h3 className="text-3xl font-semibold text-text-light mb-2">
                        {currentService.name}
                    </h3>
                    <p className="text-text-secondary text-sm mb-4">
                        Diseño {currentIndex + 1} de {servicesData.length}
                    </p>
                </div>
            </div>

            {/* Navegación de Puntos */}
            <div className="flex justify-center space-x-2 mt-6">
                {servicesData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`
                            h-2 rounded-full transition-all duration-300
                            ${index === currentIndex 
                                ? 'w-8 bg-gold-accent shadow-md' 
                                : 'w-2 bg-text-secondary opacity-50 hover:bg-text-light'}
                        `}
                        aria-label={`Ver diseño ${index + 1}`}
                    />
                ))}
            </div>
            
            <div className="text-center mt-10">
                <button 
                    onClick={() => console.log('Ir a reservar')}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-2xl shadow-md text-dark-bg bg-gold-accent hover:bg-gold-secondary focus:outline-none focus:ring-4 focus:ring-gold-accent/50 transition duration-300"
                >
                    <Calendar className="w-5 h-5 mr-2" />
                    ¡Agenda tu Cita ahora!
                </button>
            </div>
        </div>
    );
};

export default ServicesGalleryScreen;