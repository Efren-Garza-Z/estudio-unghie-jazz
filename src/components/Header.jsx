import { useState } from 'react';
import { Menu, X, Calendar, Image as ImageIcon, Sparkles } from 'lucide-react';

const Header = ({ setView, currentView }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const navigate = (view) => {
        setView(view);
        setIsMenuOpen(false);
    };

    const navItems = [
        { name: 'Inicio', view: 'Home', icon: Sparkles },
        { name: 'Galería de Arte', view: 'Gallery', icon: ImageIcon },
        { name: 'Reservar Cita', view: 'Appointment', icon: Calendar },
    ];

    return (
        <header className="sticky top-0 z-50 bg-dark-surface/80 backdrop-blur-md backdrop-saturate-180 border-b border-white/10 shadow-ios-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex flex-col items-start">
                        <h1 className="text-4xl sm:text-5xl text-accent-pink font-bold tracking-tight font-script">
                            Unghie JAZZ
                        </h1>
                        <p className="text-sm text-text-secondary hidden sm:block">
                            Transforma tus uñas en obras de arte
                        </p>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-6 lg:space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.view)}
                                className={`
                                    flex items-center text-base font-medium transition duration-150 ease-in-out px-3 py-2 rounded-lg
                                    ${currentView === item.view 
                                        ? 'bg-accent-pink/20 text-accent-pink' 
                                        : 'text-text-secondary hover:bg-white/10 hover:text-text-light'}
                                `}
                            >
                                <item.icon className="w-5 h-5 mr-2" />
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-xl text-accent-pink hover:bg-accent-pink/20 focus:outline-none transition duration-150"
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
                        <button
                            key={item.name}
                            onClick={() => navigate(item.view)}
                            className={`
                                block w-full text-left px-6 py-4 text-base font-medium transition duration-150 ease-in-out
                                ${currentView === item.view 
                                    ? 'bg-accent-pink/10 text-accent-pink' 
                                    : 'text-text-light hover:bg-white/5 hover:text-accent-pink'}
                            `}
                        >
                            <item.icon className="w-6 h-6 mr-3 inline" />
                            {item.name}
                        </button>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;