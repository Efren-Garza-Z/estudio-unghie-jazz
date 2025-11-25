import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const ImageCarousel = ({ title, images }) => {
    const scrollRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen en zoom

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = current.clientWidth / 2;
            
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="mb-12 bg-dark-card rounded-3xl p-6 shadow-2xl border border-white/10">
            <h3 className="text-3xl font-bold text-gold-accent mb-6 px-2">{title}</h3>

            <div className="relative">
                {/* Botón de control: Izquierda */}
                <button 
                    onClick={() => scroll('left')}
                    className="absolute -left-3 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-dark-surface/70 backdrop-blur-sm rounded-full text-gold-accent shadow-xl hover:bg-gold-accent/30 transition duration-300 md:block hidden"
                    aria-label={`Desplazar ${title} izquierda`}
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>

                {/* Contenedor principal de las imágenes con desplazamiento horizontal */}
                <div 
                    ref={scrollRef}
                    className="flex overflow-x-scroll snap-x snap-mandatory space-x-6 p-2 pb-5 overscroll-none"
                    style={{ WebkitOverflowScrolling: 'touch' }} 
                >
                    {images.map((imgSrc, index) => (
                        <div 
                            key={index} 
                            // Añadimos transform:scale en hover
                            className="flex-shrink-0 w-80 h-96 snap-center rounded-2xl overflow-hidden shadow-ios-float cursor-pointer 
                                       transition duration-300 transform hover:scale-[1.03] border-2 border-transparent hover:border-gold-accent/50"
                            onClick={() => setSelectedImage(imgSrc)} // Abre el modal al hacer clic
                        >
                            <img 
                                src={imgSrc} 
                                alt={`${title} - Diseño ${index + 1}`}
                                className="w-full h-full object-cover object-center"
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x500/282828/AEAEB2?text=Error+de+Imagen" }}
                            />
                        </div>
                    ))}
                </div>

                {/* Botón de control: Derecha */}
                <button 
                    onClick={() => scroll('right')}
                    className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-dark-surface/70 backdrop-blur-sm rounded-full text-gold-accent shadow-xl hover:bg-gold-accent/30 transition duration-300 md:block hidden"
                    aria-label={`Desplazar ${title} derecha`}
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
                
                {/* Indicación de desplazamiento móvil */}
                <p className="text-center text-xs text-text-secondary mt-2 md:hidden">
                    <ChevronLeft className="w-3 h-3 inline-block mr-1" /> Desliza para ver más <ChevronRight className="w-3 h-3 inline-block ml-1" />
                </p>
            </div>

            {/* Modal de Zoom de Imagen */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[100] bg-dark-bg/90 backdrop-blur-sm flex justify-center items-center p-4 cursor-pointer"
                    onClick={() => setSelectedImage(null)} // Cierra el modal al hacer clic fuera de la imagen
                >
                    <div 
                        className="relative max-w-4xl max-h-[90vh] w-full bg-dark-card rounded-3xl shadow-2xl border border-white/20 p-6 flex flex-col justify-center items-center"
                        onClick={(e) => e.stopPropagation()} // Evita que el clic en la imagen cierre el modal
                    >
                        <button 
                            onClick={() => setSelectedImage(null)} 
                            className="absolute top-4 right-4 p-2 bg-dark-surface/70 backdrop-blur-sm rounded-full text-gold-accent hover:bg-gold-accent/30 transition duration-300 z-20"
                            aria-label="Cerrar imagen"
                        >
                            <X className="w-7 h-7" />
                        </button>
                        <img 
                            src={selectedImage} 
                            alt="Imagen ampliada" 
                            className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageCarousel;