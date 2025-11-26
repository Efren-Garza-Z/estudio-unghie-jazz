import { useState, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Componente para el modal de zoom, reutilizable y simple
const ZoomModal = ({ imgSrc, onClose, altText }) => {
    if (!imgSrc) return null;

    return (
        <div 
            className="fixed inset-0 z-[100] bg-dark-bg/90 backdrop-blur-sm flex justify-center items-center p-4 cursor-pointer transition-opacity duration-300"
            onClick={onClose} // Cierra el modal al hacer clic fuera
        >
            <div 
                className="relative max-w-4xl max-h-[90vh] w-full bg-dark-card rounded-3xl shadow-2xl border border-white/20 p-6 flex flex-col justify-center items-center"
                onClick={(e) => e.stopPropagation()} // Evita que el clic en la imagen cierre el modal
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 p-2 bg-dark-surface/70 backdrop-blur-sm rounded-full text-gold-accent hover:bg-gold-accent/30 transition duration-300 z-20"
                    aria-label="Cerrar imagen"
                >
                    <X className="w-7 h-7" />
                </button>
                <img 
                    src={imgSrc} 
                    alt={altText || "Imagen ampliada"} 
                    className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-lg"
                    // Fallback en caso de error de carga
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/800x600/282828/AEAEB2?text=Error+de+Imagen" }}
                />
            </div>
        </div>
    );
};

// Componente principal del Carrusel
const ImageCarousel = ({ title, images = [] }) => { // FIX APLICADO: Valor predeterminado de array vacío para 'images'
    // Estado para la imagen que se muestra actualmente en el carrusel
    const [currentIndex, setCurrentIndex] = useState(0); 
    // Estado para la imagen seleccionada para el zoom
    const [selectedImage, setSelectedImage] = useState(null); 

    const totalImages = useMemo(() => images.length, [images]);

    // Función para manejar la navegación del carrusel
    const navigate = useCallback((direction) => {
        if (totalImages === 0) return;

        let newIndex = currentIndex;
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % totalImages;
        } else if (direction === 'prev') {
            newIndex = (currentIndex - 1 + totalImages) % totalImages;
        }
        setCurrentIndex(newIndex);
    }, [currentIndex, totalImages]);

    // Función para ir a un índice específico (usado por los puntos)
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Handler para abrir el modal de zoom
    const handleZoom = (imgSrc) => {
        setSelectedImage(imgSrc);
    };

    return (
        <div className="m-auto mb-12 bg-dark-card rounded-3xl p-6 shadow-2xl border border-white/10 min-w-fit">
            <h3 className="text-3xl font-bold text-gold-accent mb-6 px-2">{title}</h3>

            <div className="relative w-3/4 overflow-hidden rounded-3xl h-auto md:h-96 m-auto" style={{ height: '60vh' }}>
                
                {/* Contenedor de las imágenes del Carrusel */}
                <div 
                    className="flex h-full w-auto transition-transform duration-700 ease-in-out" 
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((imgSrc, index) => (
                        <div 
                            key={index}
                            // Las imágenes ocupan todo el ancho (w-full) y no se encogen (flex-shrink-0)
                            className="w-full flex-shrink-0 cursor-pointer"
                            onClick={() => handleZoom(imgSrc)} // Abre el zoom al hacer clic
                        >
                            <img 
                                src={imgSrc} 
                                className="w-full h-full object-cover object-center" 
                                alt={`${title} - Diseño ${index + 1}`}
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/800x600/282828/AEAEB2?text=Error+de+Carga" }}
                            />
                        </div>
                    ))}
                </div>

                {/* Indicadores (Puntos) */}
                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-2/3 space-x-4 rtl:space-x-reverse m-auto">
                    {images.map((_, index) => (
                        <button 
                            key={index}
                            type="button" 
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-gold-accent' : 'bg-white/50 hover:bg-white/70'}`}
                            aria-current={currentIndex === index ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => goToSlide(index)}
                        ></button>
                    ))}
                </div>

                {/* Botón de Control: Anterior */}
                <button 
                    type="button" 
                    className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
                    onClick={() => navigate('prev')}
                    aria-label="Anterior"
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-dark-bg/50 group-hover:bg-dark-bg/80 transition duration-300">
                        <ChevronLeft className="w-5 h-5 text-white" />
                        <span className="sr-only">Previous</span>
                    </span>
                </button>

                {/* Botón de Control: Siguiente */}
                <button 
                    type="button" 
                    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
                    onClick={() => navigate('next')}
                    aria-label="Siguiente"
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-dark-bg/50 group-hover:bg-dark-bg/80 transition duration-300">
                        <ChevronRight className="w-5 h-5 text-white" />
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>

            {/* Modal de Zoom */}
            <ZoomModal 
                imgSrc={selectedImage} 
                onClose={() => setSelectedImage(null)} 
                altText={`${title} - Ampliada`}
            />

        </div>
    );
};

export default ImageCarousel;