import { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import { formatDuration, formatPrice } from '../../utils/formatters';

const ServiceSelection = ({ onNext }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const { bookingData, updateBookingData } = useBooking();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await servicesAPI.getAll();
      // setServices(response.data);
      
      // Mock data for development
      setTimeout(() => {
        setServices([
          {
            id: '1',
            name: 'Corte de Cabello',
            description: 'Corte profesional con estilo personalizado',
            duration: 30,
            price: 150,
            image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400',
          },
          {
            id: '2',
            name: 'Corte + Barba',
            description: 'Corte de cabello más arreglo de barba',
            duration: 45,
            price: 200,
            image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400',
          },
          {
            id: '3',
            name: 'Facial',
            description: 'Limpieza facial profunda e hidratación',
            duration: 60,
            price: 350,
            image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400',
          },
          {
            id: '4',
            name: 'Masaje',
            description: 'Masaje relajante y descontracturante',
            duration: 60,
            price: 400,
            image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
          },
        ]);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    updateBookingData({ service });
  };

  const handleContinue = () => {
    if (selectedService) {
      onNext();
    }
  };

  if (loading) {
    return <LoadingSpinner text="Cargando servicios..." />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Selecciona un Servicio</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => handleServiceSelect(service)}
            className={`cursor-pointer rounded-lg border-2 transition-all hover:shadow-lg ${
              selectedService?.id === service.id
                ? 'border-primary-600 ring-2 ring-primary-200'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {formatDuration(service.duration)}
                </span>
                <span className="text-lg font-bold text-primary-600">
                  {formatPrice(service.price)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          disabled={!selectedService}
          className="btn-primary"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default ServiceSelection;
