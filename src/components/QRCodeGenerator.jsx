
// Componente para la generación simulada de QR
const QRCodeGenerator = ({ url, size }) => {
    // Nota: En un proyecto real, se usaría una librería como 'qrcode.react'
    // Aquí usamos un placeholder con un servicio externo
    return (
        <div className="flex flex-col items-center p-4 bg-dark-card rounded-2xl shadow-ios-card border border-white/10">
            <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`}
                alt="Código QR de la página"
                width={size}
                height={size}
                className="rounded-lg border-2 border-accent-pink/50"
            />
            <p className="mt-2 text-sm text-text-secondary">Escanea para agendar tu cita.</p>
        </div>
    );
};

export default QRCodeGenerator;