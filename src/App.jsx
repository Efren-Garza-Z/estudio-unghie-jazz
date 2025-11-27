import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

// Importamos los componentes de la nueva estructura
import Header from './components/Header';
import Footer from './components/Footer';

// Importamos las vistas (las pantallas completas)
import LandingPage from './views/LandingPage';
import AppointmentApp from './views/apointments/AppointmentApp';
import ServicesGalleryScreen from './views/ServicesGalleryScreen'; 
import 'flowbite';

const App = () => {
  return (
    // Envolvemos toda la aplicación con BrowserRouter para habilitar el routing
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-dark-bg">
        {/* El Header se mantiene aquí para aparecer en todas las páginas */}
        <Header /> 

        {/* Contenido principal: Aquí es donde las vistas se renderizan */}
        <main className="flex-grow">
          <Routes>
            {/* Ruta principal (/) para la página de inicio */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Ruta /cita para la pantalla de agendamiento */}
            <Route path="/cita" element={<AppointmentApp />} />
            
            {/* Ruta /galeria para la galería de arte */}
            <Route path="/galeria" element={<ServicesGalleryScreen />} />
            
            {/* Ruta 404 (opcional) */}
            <Route path="*" element={
              <div className="text-center p-20">
                <h1 className="text-5xl font-script text-gold-accent mb-4">404</h1>
                <p className="text-xl text-text-light">Página no encontrada.</p>
                <a href="/" className="text-gold-accent hover:text-gold-secondary mt-4 inline-block underline">Volver al Inicio</a>
              </div>
            } />
          </Routes>
        </main>

        {/* Footer se mantiene igual */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;