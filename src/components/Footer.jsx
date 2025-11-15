import { Instagram, Facebook, MapPin, Phone, MessageSquare } from 'lucide-react';
import QRCodeGenerator from './QRCodeGenerator'; // Importa el componente QR

// Datos de contacto y redes sociales (puedes mover esto a un archivo de configuración si crece)
const socialLinks = {
    facebook: 'https://facebook.com/tuestetica',
    instagram: 'https://instagram.com/tuestetica',
    whatsapp: 'tel:522211562234', // Usar el número de la imagen
    phone: 'tel:2211562234',
    address: 'https://maps.app.goo.gl/TuDireccionDeEstudio', 
    addressText: 'Av. Principal #123, Tu Ciudad',
    businessName: 'Estudio Unghie JAZZ'
};

const Footer = () => (
    <footer className="bg-dark-surface text-text-light mt-12 pt-12 pb-8 rounded-t-3xl shadow-neumorphic-lg border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/10 pb-8 mb-8">
                {/* Contacto */}
                <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-accent-pink">Contáctanos</h4>
                    <p className="flex items-center text-text-secondary text-sm">
                        <MapPin className="w-5 h-5 mr-3 text-accent-purple" />
                        <a href={socialLinks.address} target="_blank" rel="noopener noreferrer" className="hover:text-accent-pink transition">
                            {socialLinks.addressText}
                        </a>
                    </p>
                    <p className="flex items-center text-text-secondary text-sm">
                        <Phone className="w-5 h-5 mr-3 text-accent-purple" />
                        <a href={socialLinks.phone} className="hover:text-accent-pink transition">
                            {socialLinks.phone.replace('tel:', '')}
                        </a>
                    </p>
                    <p className="flex items-center text-text-secondary text-sm">
                        <MessageSquare className="w-5 h-5 mr-3 text-accent-purple" />
                        ¡Agenda por WhatsApp!
                    </p>
                </div>
                
                {/* Redes Sociales */}
                <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-accent-pink">Síguenos</h4>
                    <div className="flex space-x-5">
                        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-pink transition transform hover:scale-110">
                            <Facebook className="w-7 h-7" />
                        </a>
                        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-pink transition transform hover:scale-110">
                            <Instagram className="w-7 h-7" />
                        </a>
                        <a href={`https://wa.me/${socialLinks.phone.replace('tel:', '').replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-pink transition transform hover:scale-110">
                            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.031 3.25a8.774 8.774 0 0 0-7.85 13.048l-1.01 3.693 3.824-1.295A8.774 8.774 0 0 0 12.031 21.65c4.836 0 8.77-3.934 8.77-8.77S16.867 4.103 12.031 4.103zm4.516 11.758a.93.93 0 0 1-.66.337.89.89 0 0 1-.637-.253c-.328-.276-1.077-.61-2.07-.985-.992-.375-1.95-.562-2.316-.562-.367 0-.745.093-1.08.418-.336.326-.445.8-.223 1.258.223.458.557.973.81 1.258.252.285.495.38.747.348.252-.03.54-.117.828-.352.285-.235.48-.488.627-.674.145-.187.31-.125.438-.088.13.038.835.397.98.813.146.416.074.835.037.904-.037.069-.148.113-.30.175-.15.062-.296.094-.438.125-.14.03-.284.06-.41.06-.127 0-.255-.03-.374-.093-1.08-.52-1.996-1.528-2.03-1.57-.035-.042-.35-.458-.35-.863 0-.405.244-.73.328-.838.083-.108.18-.217.276-.3.097-.083.213-.19.336-.312.124-.124.276-.296.402-.42.126-.126.15-.226.244-.226.095 0 .153.047.245.24.09.19.467 1.127.505 1.218.038.09.06.19.006.284-.05.094-.216.276-.216.276s-.208.217-.208.528c0 .31.107.417.18.498.07.08.28.27.674.627.394.357.85.58 1.178.675.327.093.444.06.602 0 .157-.06.495-.19.66-.312.167-.123.328-.275.47-.457.142-.182.264-.326.37-.417.106-.09.213-.17.375-.19.162-.02.502.13.82.3.318.17.618.336.756.405.138.067.245.106.35.106.107 0 .34-.13.565-.25.223-.12.48-.31.572-.416.09-.107.135-.19.223-.33.09-.14.18-.258.266-.363.086-.104.14-.148.243-.148.102 0 .23.037.38.075.148.038.27.075.396.113.125.038.24.06.312.187.07.126.115.344.07.72z" /></svg>
                        </a>
                    </div>
                </div>

                {/* QR Code Section */}
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <h4 className="text-xl font-semibold text-accent-pink">¡Agenda Rápido!</h4>
                    <QRCodeGenerator url="https://tuestetica.com/appointment" size={120} />
                </div>
            </div>

            <div className="text-center text-sm text-text-secondary">
                &copy; {new Date().getFullYear()} {socialLinks.businessName}. Todos los derechos reservados.
            </div>
        </div>
    </footer>
);

export default Footer;