import React, { useState } from 'react';
// Importamos Link y useLocation de React Router DOM
import { Link, useLocation } from 'react-router-dom'; 
import { Menu, X, Calendar, Image as ImageIcon, Sparkles } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // Usamos useLocation para saber en qué ruta estamos
    const location = useLocation(); 

    const navItems = [
        { name: 'Inicio', path: '/', icon: Sparkles },
        { name: 'Galería de Arte', path: '/galeria', icon: ImageIcon },
        { name: 'Reservar Cita', path: '/cita', icon: Calendar },
    ];

    return (
        <header className="sticky top-0 z-50 bg-dark-surface/80 backdrop-blur-md backdrop-saturate-180 border-b border-white/10 shadow-ios-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0">
                        {/* Usamos Link para el logo, que lleva al inicio */}
                        <Link to="/" className="flex flex-col items-start">
                            <h1 className="text-4xl sm:text-5xl text-gold-accent font-bold tracking-tight font-script">
                                Unghie JAZZ
                            </h1>
                            <p className="text-sm text-text-secondary hidden sm:block">
                                Transforma tus uñas en obras de arte
                            </p>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-6 lg:space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path} // Usamos 'to' en lugar de un manejador de click
                                className={`
                                    flex items-center text-base font-medium transition duration-150 ease-in-out px-3 py-2 rounded-lg
                                    ${location.pathname === item.path // Comparamos la ruta actual para el estilo activo
                                        ? 'bg-gold-accent/20 text-gold-accent font-semibold' 
                                        : 'text-text-secondary hover:bg-white/10 hover:text-gold-accent'}
                                `}
                            >
                                <item.icon className="w-5 h-5 mr-2" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-xl text-gold-accent hover:bg-gold-accent/20 focus:outline-none transition duration-150"
                        >
                            {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute w-full bg-dark-surface/90 backdrop-blur-md backdrop-saturate-180 shadow-ios-float border-t border-white/10">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)} // Cierra el menú al navegar
                            className={`
                                block w-full text-left px-6 py-4 text-base font-medium transition duration-150 ease-in-out
                                ${location.pathname === item.path 
                                    ? 'bg-gold-accent/10 text-gold-accent font-semibold' 
                                    : 'text-text-light hover:bg-white/5 hover:text-gold-accent'}
                            `}
                        >
                            <item.icon className="w-6 h-6 mr-3 inline" />
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;