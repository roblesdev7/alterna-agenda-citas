const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Agenda Citas</h3>
            <p className="text-gray-400">
              Sistema de reserva de citas para barbería y clínica estética.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/booking" className="text-gray-400 hover:text-white transition-colors">
                  Reservar Cita
                </a>
              </li>
              <li>
                <a href="/my-appointments" className="text-gray-400 hover:text-white transition-colors">
                  Mis Citas
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p className="text-gray-400">
              Email: info@agendacitas.com<br />
              Teléfono: (555) 123-4567
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Agenda Citas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
