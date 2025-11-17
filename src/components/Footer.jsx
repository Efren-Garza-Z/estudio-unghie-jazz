import React from 'react';
import { Instagram, Facebook, MapPin, Phone, MessageCircle } from 'lucide-react';
import qrWH from '../assets/QR_WH.jpeg'; 

const socialLinks = {
    // Estas URLs deberán ser actualizadas con la información real del cliente
    facebook: 'https://facebook.com/tuestetica',
    instagram: 'https://instagram.com/tuestetica',
    whatsapp: 'tel:2211562234',
    phone: 'tel:2211562234',
    address: 'https://maps.app.goo.gl/79Fa9n9KRSniiZvf7',
    addressText: 'Unión Sur 55, San Onofre, Centro, 90802 Santa Ana Chiautempan, Tlax.',
    businessName: 'Estudio Unghie JAZZ'
};

const Footer = () => (
    <footer className="bg-dark-surface text-text-light mt-12 pt-12 pb-8 rounded-t-3xl shadow-ios-float border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/10 pb-8 mb-8">
                {/* Contacto */}
                <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gold-accent">Contáctanos</h4>
                    <p className="flex items-center text-text-secondary text-sm">
                        <MapPin className="w-5 h-5 mr-3 text-gold-accent" />
                        <a href={socialLinks.address} target="_blank" rel="noopener noreferrer" className="hover:text-gold-accent transition">
                            {socialLinks.addressText}
                        </a>
                    </p>
                    <p className="flex items-center text-text-secondary text-sm">
                        <Phone className="w-5 h-5 mr-3 text-gold-accent" />
                        <a href={socialLinks.phone} className="hover:text-gold-accent transition">
                            {socialLinks.phone.replace('tel:', '')}
                        </a>
                    </p>
                    <p className="flex items-center text-text-secondary text-sm">
                        <MessageCircle  className="w-5 h-5 mr-3 text-gold-accent" />
                          <a 
                            href={`https://wa.me/${socialLinks.phone.replace('tel:', '').replace('+', '')}`} 
                            target="_blank" rel="noopener noreferrer" 
                            className="text-text-secondary hover:text-gold-accent transition">
                             ¡Agenda por WhatsApp!
                        </a>
                    </p>
                </div>
                
                {/* Redes Sociales */}
                <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gold-accent">Síguenos</h4>
                    <div className="flex space-x-5">
                        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-gold-accent transition transform hover:scale-110">
                            <Facebook className="w-7 h-7" />
                        </a>
                        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-gold-accent transition transform hover:scale-110">
                            <Instagram className="w-7 h-7" />
                        </a>
                    </div>
                </div>

                {/* QR Code Section */}
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <h4 className="text-xl font-semibold text-gold-accent">¡Agenda Rápido!</h4>
                    {/* Nota: Asegúrate de actualizar la URL con tu dominio real una vez lo conectes */}
                    <img src={qrWH} alt="Código QR para agendar cita" className="w-36 h-36" />
                </div>
            </div>

            <div className="text-center text-sm text-text-secondary">
                © {new Date().getFullYear()} {socialLinks.businessName}. Todos los derechos reservados.
            </div>
        </div>
    </footer>
);

export default Footer;