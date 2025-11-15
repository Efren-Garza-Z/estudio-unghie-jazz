import { Sparkles } from 'lucide-react'; // Puedes usar un ícono para el botón si quieres

const ServiceCard = ({ service, onReserveClick }) => (
    <div className="bg-dark-card rounded-3xl shadow-ios-card overflow-hidden transition duration-300 transform hover:scale-[1.02] border border-white/10">
        <img 
            src={service.img} 
            alt={`Imagen de ${service.name}`} 
            className="w-full h-40 object-cover object-center rounded-t-3xl" // Bordes redondeados también en la imagen
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/3A3A3C/636366?text=Sin+Imagen" }}
        />
        <div className="p-5 flex flex-col items-center">
            <h3 className="text-xl font-semibold text-text-light mb-1 text-center">{service.name}</h3>
            <p className="text-sm text-text-secondary mb-3 text-center">{service.description}</p>
            <span className="text-accent-purple text-lg font-bold mb-4">{service.price}</span>
            <button 
                onClick={() => onReserveClick(service)}
                className="w-full py-3 px-4 bg-accent-pink text-text-light font-semibold rounded-2xl shadow-md hover:bg-accent-purple transition duration-200 flex items-center justify-center text-sm"
            >
                <Sparkles className="w-4 h-4 mr-2" />
                Reservar
            </button>
        </div>
    </div>
);

export default ServiceCard;