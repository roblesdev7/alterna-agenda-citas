import { useState } from 'react';
import { useBooking } from '../../context/BookingContext';

const CustomerInfo = ({ onNext, onBack }) => {
  const { bookingData, updateBookingData } = useBooking();
  const [formData, setFormData] = useState({
    name: bookingData.customer?.name || '',
    email: bookingData.customer?.email || '',
    phone: bookingData.customer?.phone || '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'Teléfono inválido (10 dígitos)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      updateBookingData({ customer: formData });
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>

      {/* Booking Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-2">Resumen de tu cita:</h3>
        <div className="space-y-1 text-sm">
          <p>
            <span className="text-gray-600">Servicio:</span>{' '}
            <span className="font-medium">{bookingData.service?.name}</span>
          </p>
          <p>
            <span className="text-gray-600">Profesional:</span>{' '}
            <span className="font-medium">{bookingData.resource?.name}</span>
          </p>
          <p>
            <span className="text-gray-600">Fecha:</span>{' '}
            <span className="font-medium">
              {new Date(bookingData.date + 'T00:00:00').toLocaleDateString('es-MX', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </p>
          <p>
            <span className="text-gray-600">Hora:</span>{' '}
            <span className="font-medium">{bookingData.time}</span>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre Completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input-field ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Juan Pérez"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input-field ${errors.email ? 'border-red-500' : ''}`}
            placeholder="juan@ejemplo.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
            placeholder="5551234567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Recibirás la confirmación y recordatorios a este número
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Nota:</strong> Al confirmar tu cita, recibirás un correo con tu número
            de referencia. Guárdalo para futuras consultas o cambios.
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <button type="button" onClick={onBack} className="btn-secondary">
            Atrás
          </button>
          <button type="submit" className="btn-primary">
            Confirmar Cita
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerInfo;
