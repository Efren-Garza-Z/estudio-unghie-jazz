import { Link } from 'react-router-dom'; // Importamos Link
import { Sparkles } from 'lucide-react';

// Este componente ahora usa Link para navegar a la pantalla de cita.
const ServiceCard = ({ service }) => ( 
    <div className="bg-dark-card rounded-3xl shadow-ios-card overflow-hidden transition duration-300 transform hover:scale-[1.02] border border-white/10">
        <img 
            src={service.img} 
            alt={`Imagen de ${service.name}`} 
            className="w-full h-40 object-cover object-center rounded-t-3xl"
            // Manejador de error para las imágenes simuladas
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/282828/AEAEB2?text=Sin+Imagen" }}
        />
        <div className="p-5 flex flex-col items-center">
            <h3 className="text-xl font-semibold text-text-light mb-2 text-center">{service.name}</h3>
            <p className="text-sm text-text-secondary mb-4 text-center">{service.description}</p>
            
            {/* Usamos Link para navegar a la ruta de cita (/cita) */}
            <Link 
                to="/cita"
                className="w-full py-3 px-4 bg-gold-accent text-dark-bg font-semibold rounded-2xl shadow-md hover:bg-gold-secondary transition duration-200 flex items-center justify-center text-sm"
            >
                <Sparkles className="w-4 h-4 mr-2" />
                Reservar
            </Link>
        </div>
    </div>
);

export default ServiceCard;