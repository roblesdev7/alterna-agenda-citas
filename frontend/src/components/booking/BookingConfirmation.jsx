import { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import { formatPrice } from '../../utils/formatters';

const BookingConfirmation = ({ onComplete }) => {
  const { bookingData } = useBooking();
  const [loading, setLoading] = useState(true);
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    createAppointment();
  }, []);

  const createAppointment = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await appointmentsAPI.create({
      //   serviceId: bookingData.service.id,
      //   resourceId: bookingData.resource.id,
      //   date: bookingData.date,
      //   time: bookingData.time,
      //   customer: bookingData.customer,
      // });
      // setConfirmation(response.data);

      // Mock response for development
      setTimeout(() => {
        setConfirmation({
          reference: `APT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          ...bookingData,
        });
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('Error al crear la cita. Por favor intenta nuevamente.');
      setLoading(false);
    }
  };

  const handleAddToCalendar = () => {
    // Create calendar event
    const title = `Cita: ${bookingData.service.name}`;
    const details = `Profesional: ${bookingData.resource.name}\\nReferencia: ${confirmation.reference}`;
    const location = 'Agenda Citas';
    const startDate = new Date(`${bookingData.date}T${bookingData.time}`);
    const endDate = new Date(startDate.getTime() + bookingData.service.duration * 60000);

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
      location
    )}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate
      .toISOString()
      .replace(/[-:]/g, '')
      .split('.')[0]}Z`;

    window.open(googleCalendarUrl, '_blank');
  };

  if (loading) {
    return <LoadingSpinner text="Confirmando tu cita..." />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
        <p className="text-gray-600 mb-8">{error}</p>
        <button onClick={onComplete} className="btn-primary">
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-10 h-10 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-4">¡Cita Confirmada!</h2>
      <p className="text-lg text-gray-600 mb-8">
        Tu cita ha sido reservada exitosamente
      </p>

      {/* Reference Number */}
      <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
        <p className="text-sm text-gray-600 mb-2">Número de Referencia</p>
        <p className="text-3xl font-bold text-primary-600">{confirmation.reference}</p>
        <p className="text-sm text-gray-500 mt-2">
          Guarda este número para consultar o modificar tu cita
        </p>
      </div>

      {/* Appointment Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 max-w-md mx-auto text-left">
        <h3 className="font-semibold text-lg mb-4 text-center">Detalles de la Cita</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Servicio:</span>
            <span className="font-medium">{bookingData.service.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Profesional:</span>
            <span className="font-medium">{bookingData.resource.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Fecha:</span>
            <span className="font-medium">
              {new Date(bookingData.date + 'T00:00:00').toLocaleDateString('es-MX', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Hora:</span>
            <span className="font-medium">{bookingData.time}</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span className="text-gray-600">Total:</span>
            <span className="font-bold text-lg">{formatPrice(bookingData.service.price)}</span>
          </div>
        </div>
      </div>

      {/* Confirmation Message */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
        <p className="text-sm text-blue-800">
          <strong>Hemos enviado un email de confirmación a:</strong>
          <br />
          {bookingData.customer.email}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <button onClick={handleAddToCalendar} className="btn-secondary">
          <svg
            className="w-5 h-5 inline mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Agregar al Calendario
        </button>
        <button onClick={onComplete} className="btn-primary">
          Finalizar
        </button>
      </div>

      {/* Additional Info */}
      <div className="mt-8 text-sm text-gray-500 max-w-md mx-auto">
        <p>
          Recibirás un recordatorio 24 horas antes de tu cita.
          <br />
          Si necesitas cancelar, hazlo con al menos 2 horas de anticipación.
        </p>
      </div>
    </div>
  );
};

export default BookingConfirmation;
