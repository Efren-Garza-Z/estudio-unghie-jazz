import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const servicesData = [
    { name: 'Manicura Clásica', description: 'Cuidado completo de uñas y cutículas, finalizado con esmalte tradicional.', price: '$25.00', img: 'https://placehold.co/800x600/2C2C2E/AEAEB2?text=Manicura+Clasica' },
    { name: 'Gel Semipermanente', description: 'Color vibrante y duradero hasta por 3 semanas, sin astillarse.', price: '$40.00', img: 'https://placehold.co/800x600/2C2C2E/AEAEB2?text=Gel+Semipermanente' },
    { name: 'Polygel Extensiones', description: 'Extensiones de uñas ligeras y flexibles, con un acabado natural y resistente.', price: '$55.00', img: 'https://placehold.co/800x600/2C2C2E/AEAEB2?text=Polygel+Extensiones' },
    { name: 'Soft Gel System', description: 'Sistema de extensión rápido con puntas prefabricadas de gel, ideal para un look impecable.', price: '$60.00', img: 'https://placehold.co/800x600/2C2C2E/AEAEB2?text=Soft+Gel+System' },
    { name: 'Diseños de Autor', description: 'Arte en uñas personalizado, desde minimalista hasta creaciones complejas.', price: 'Desde $15.00', img: 'https://placehold.co/800x600/2C2C2E/AEAEB2?text=Disenos+de+Autor' },
    { name: 'Pedicura Spa', description: 'Relajante pedicura con exfoliación, masaje y esmaltado de tu elección.', price: '$45.00', img: 'https://placehold.co/800x600/2C2C2E/AEAEB2?text=Pedicura+Spa' },
];

const ServicesGalleryScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % servicesData.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + servicesData.length) % servicesData.length);
    };

    //const currentService = servicesData[currentIndex];

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 mt-8">
            <h2 className="text-4xl font-bold text-center text-text-light mb-4">Nuestra Galería de Arte</h2>
            <p className="text-center text-text-secondary text-lg mb-10">Inspírate con el arte que creamos en tus manos. (Desliza para ver más)</p>

            <div className="relative w-full overflow-hidden rounded-3xl shadow-ios-float bg-dark-card border border-white/10">
                {/* Carrusel */}
                <div 
                    className="flex transition-transform duration-500 ease-in-out" 
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {servicesData.map((service, index) => (
                        <div key={index} className="flex-shrink-0 w-full p-6 sm:p-8">
                            <h3 className="text-3xl font-bold text-accent-pink text-center mb-4">{service.name}</h3>
                            <div className="flex justify-center items-center mb-6">
                                <img 
                                    src={service.img} 
                                    alt={`Ejemplo de ${service.name}`} 
                                    className="w-full max-w-lg h-auto rounded-2xl shadow-neumorphic-md border-2 border-accent-purple/30"
                                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/800x600/3A3A3C/636366?text=Sin+Imagen" }}
                                />
                            </div>
                            <p className="mt-4 text-center text-lg text-text-light">{service.description}</p>
                            <p className="text-center text-accent-purple text-xl font-bold mt-2">{service.price}</p>
                        </div>
                    ))}
                </div>

                {/* Controles de Navegación */}
                <button 
                    onClick={prevSlide} 
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-dark-surface/70 backdrop-blur-sm p-3 rounded-full ml-4 shadow-ios-card hover:bg-dark-surface transition text-text-light"
                    aria-label="Anterior"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <button 
                    onClick={nextSlide} 
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-dark-surface/70 backdrop-blur-sm p-3 rounded-full mr-4 shadow-ios-card hover:bg-dark-surface transition text-text-light"
                    aria-label="Siguiente"
                >
                    <ArrowRight className="w-6 h-6" />
                </button>

                {/* Indicadores */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {servicesData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition duration-300 ${currentIndex === index ? 'bg-accent-pink' : 'bg-gray-500 hover:bg-white/30'}`}
                            aria-label={`Ir a slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesGalleryScreen;