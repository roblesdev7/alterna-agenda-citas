import { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import LoadingSpinner from '../ui/LoadingSpinner';

const DateTimeSelection = ({ onNext, onBack }) => {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const { bookingData, updateBookingData } = useBooking();

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    if (selectedDate && selectedResource) {
      fetchAvailableSlots();
    }
  }, [selectedDate, selectedResource]);

  const fetchResources = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await resourcesAPI.getAvailableByService(bookingData.service.id);
      // setResources(response.data);
      
      setTimeout(() => {
        setResources([
          { id: '1', name: 'Juan Pérez', specialty: 'Barbero Senior' },
          { id: '2', name: 'María García', specialty: 'Estilista' },
          { id: '3', name: 'Carlos López', specialty: 'Barbero' },
        ]);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setLoading(false);
    }
  };

  const fetchAvailableSlots = async () => {
    setLoadingSlots(true);
    try {
      // TODO: Replace with actual API call
      // const response = await availabilityAPI.getAvailableSlots(
      //   selectedDate,
      //   bookingData.service.id,
      //   selectedResource.id
      // );
      // setAvailableSlots(response.data);
      
      setTimeout(() => {
        setAvailableSlots([
          '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
          '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
        ]);
        setLoadingSlots(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      setLoadingSlots(false);
    }
  };

  const handleContinue = () => {
    if (selectedResource && selectedDate && selectedTime) {
      updateBookingData({
        resource: selectedResource,
        date: selectedDate,
        time: selectedTime,
      });
      onNext();
    }
  };

  // Generate next 14 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  if (loading) {
    return <LoadingSpinner text="Cargando disponibilidad..." />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Selecciona Fecha y Hora</h2>

      {/* Service Summary */}
      <div className="bg-primary-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-600">Servicio seleccionado:</p>
        <p className="text-lg font-semibold text-primary-900">
          {bookingData.service?.name}
        </p>
      </div>

      {/* Resource Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Selecciona un Profesional</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <div
              key={resource.id}
              onClick={() => setSelectedResource(resource)}
              className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                selectedResource?.id === resource.id
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              <p className="font-semibold">{resource.name}</p>
              <p className="text-sm text-gray-600">{resource.specialty}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      {selectedResource && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Selecciona una Fecha</h3>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input-field"
          >
            <option value="">Selecciona una fecha</option>
            {getAvailableDates().map((date) => (
              <option key={date} value={date}>
                {new Date(date + 'T00:00:00').toLocaleDateString('es-MX', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Time Selection */}
      {selectedDate && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Selecciona una Hora</h3>
          {loadingSlots ? (
            <LoadingSpinner size="sm" text="Cargando horarios..." />
          ) : availableSlots.length > 0 ? (
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                    selectedTime === slot
                      ? 'border-primary-600 bg-primary-600 text-white'
                      : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No hay horarios disponibles para esta fecha
            </p>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button onClick={onBack} className="btn-secondary">
          Atrás
        </button>
        <button
          onClick={handleContinue}
          disabled={!selectedResource || !selectedDate || !selectedTime}
          className="btn-primary"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default DateTimeSelection;
