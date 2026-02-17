import { useState } from 'react';
import Modal from '../components/ui/Modal';

const MyAppointments = () => {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleSearch = async () => {
    if (!referenceNumber.trim()) {
      setError('Por favor ingresa un número de referencia');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await appointmentsAPI.getByReference(referenceNumber);
      // setAppointment(response.data);
      
      // Mock data for development
      setTimeout(() => {
        setAppointment({
          id: '1',
          reference: referenceNumber,
          service: 'Corte de Cabello',
          resource: 'Juan Pérez',
          date: '2026-02-20',
          time: '10:00',
          customer: {
            name: 'Carlos García',
            email: 'carlos@email.com',
            phone: '555-1234',
          },
          status: 'confirmed',
        });
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('No se encontró ninguna cita con ese número de referencia');
      setLoading(false);
    }
  };

  const handleCancelAppointment = async () => {
    try {
      // TODO: Replace with actual API call
      // await appointmentsAPI.cancel(appointment.id, 'Cancelado por el cliente');
      setAppointment({ ...appointment, status: 'cancelled' });
      setShowCancelModal(false);
    } catch (err) {
      setError('Error al cancelar la cita');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Mis Citas</h1>

        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Buscar Cita</h2>
          <p className="text-gray-600 mb-4">
            Ingresa tu número de referencia para consultar tu cita
          </p>

          <div className="flex gap-4">
            <input
              type="text"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              placeholder="Número de referencia (ej: APT-12345)"
              className="input-field flex-1"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </div>

        {appointment && (
          <div className="card">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-semibold">Detalles de la Cita</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  appointment.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : appointment.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {appointment.status === 'confirmed' ? 'Confirmada' : 
                 appointment.status === 'cancelled' ? 'Cancelada' : 'Pendiente'}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Referencia</p>
                <p className="text-lg font-semibold">{appointment.reference}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Servicio</p>
                <p className="text-lg">{appointment.service}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Profesional</p>
                <p className="text-lg">{appointment.resource}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Fecha</p>
                  <p className="text-lg">
                    {new Date(appointment.date).toLocaleDateString('es-MX', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Hora</p>
                  <p className="text-lg">{appointment.time}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Cliente</p>
                <p className="text-lg">{appointment.customer.name}</p>
                <p className="text-sm text-gray-500">{appointment.customer.email}</p>
                <p className="text-sm text-gray-500">{appointment.customer.phone}</p>
              </div>
            </div>

            {appointment.status === 'confirmed' && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="btn-secondary text-red-600 hover:bg-red-50"
                >
                  Cancelar Cita
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  * Las citas deben cancelarse con al menos 2 horas de anticipación
                </p>
              </div>
            )}
          </div>
        )}

        <Modal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          title="Cancelar Cita"
        >
          <p className="text-gray-600 mb-6">
            ¿Estás seguro de que deseas cancelar esta cita? Esta acción no se puede deshacer.
          </p>
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setShowCancelModal(false)}
              className="btn-secondary"
            >
              No, mantener cita
            </button>
            <button
              onClick={handleCancelAppointment}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Sí, cancelar
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MyAppointments;
