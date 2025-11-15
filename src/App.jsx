import { useState } from 'react';
// Importamos los componentes de la nueva estructura
import Header from './components/Header';
import Footer from './components/Footer';

// Importamos las vistas (las pantallas completas)
import LandingPage from './views/LandingPage';
import AppointmentScreen from './views/AppointmentScreen';
import ServicesGalleryScreen from './views/ServicesGalleryScreen'; 

const App = () => {
    // Uso de estado para la navegación simple entre vistas
    const [currentView, setCurrentView] = useState('Home');

    // Mapeo de vistas
    const renderView = () => {
        switch (currentView) {
            case 'Gallery':
                return <ServicesGalleryScreen />;
            case 'Appointment':
                return <AppointmentScreen />;
            case 'Home':
            default:
                return <LandingPage setView={setCurrentView} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col antialiased">
            <style jsx global>{`
                .font-script {
                    font-family: 'Dancing Script', cursive; 
                }
            `}</style>
            
            {/* Pasamos el control de la vista al Header */}
            <Header setView={setCurrentView} currentView={currentView} />
            
            <main className="flex-grow">
                {renderView()}
            </main>
            
            <Footer />
        </div>
    );
};

export default App;