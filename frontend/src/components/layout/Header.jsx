import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">
              Agenda Citas
            </h1>
          </Link>
          
          <nav className="flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Inicio
            </Link>
            <Link 
              to="/booking" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Reservar Cita
            </Link>
            <Link 
              to="/my-appointments" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Mis Citas
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
