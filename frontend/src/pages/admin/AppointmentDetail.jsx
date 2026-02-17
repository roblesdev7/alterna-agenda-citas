import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../../components/ui/Modal';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AppointmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchAppointment();
  }, [id]);

  const fetchAppointment = async () => {
    // TODO: Replace with actual API call
    // const response = await api.get(`/admin/appointments/${id}`);
    
    // Mock data for development
    setTimeout(() => {
      setAppointment({
        id: id,
        reference: 'APT-ABC123',
        service: {
          name: 'Corte de Cabello',
          duration: 30,
          price: 150,
        },
        resource: {
          name: 'María García',
          specialty: 'Estilista',
        },
        customer: {
          name: 'Juan Pérez',
          email: 'juan@email.com',
          phone: '555-1234',
        },
        date: '2026-02-20',
        time: '10:00',
        status: 'confirmed',
        createdAt: '2026-02-16T10:30:00',
        notes: [],
        statusHistory: [
          {
            status: 'confirmed',
            timestamp: '2026-02-16T10:30:00',
            by: 'Sistema',
            notes: 'Cita creada por el cliente',
          },
        ],
      });
      setLoading(false);
    }, 500);
  };

  const handleStatusChange = async (newStatus) => {
    setSelectedStatus(newStatus);
    setShowStatusModal(true);
  };

  const confirmStatusChange = async () => {
    // TODO: Replace with actual API call
    // await api.patch(`/admin/appointments/${id}/status`, {
    //   status: selectedStatus,
    //   notes: notes,
    // });

    const timestamp = new Date().toISOString();
    const statusHistory = [
      ...appointment.statusHistory,
      {
        status: selectedStatus,
        timestamp,
        by: 'Administrador',
        notes: notes,
      },
    ];

    setAppointment({
      ...appointment,
      status: selectedStatus,
      statusHistory,
    });

    setShowStatusModal(false);
    setNotes('');
  };

  const getStatusConfig = (status) => {
    const configs = {
      confirmed: {
        class: 'bg-blue-100 text-blue-800 border-blue-200',
        text: 'Confirmada',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      'in-progress': {
        class: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        text: 'En Curso',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      completed: {
        class: 'bg-green-100 text-green-800 border-green-200',
        text: 'Completada',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ),
      },
      cancelled: {
        class: 'bg-red-100 text-red-800 border-red-200',
        text: 'Cancelada',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ),
      },
      'no-show': {
        class: 'bg-gray-100 text-gray-800 border-gray-200',
        text: 'No Asistió',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        ),
      },
      'arrived-late': {
        class: 'bg-orange-100 text-orange-800 border-orange-200',
        text: 'Llegó Tarde',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
    };

    return configs[status] || configs.confirmed;
  };

  if (loading) {
    return <LoadingSpinner text="Cargando detalles..." />;
  }

  if (!appointment) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No se encontró la cita</p>
        <button onClick={() => navigate('/admin/appointments')} className="btn-primary mt-4">
          Volver a citas
        </button>
      </div>
    );
  }

  const statusConfig = getStatusConfig(appointment.status);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <button
            onClick={() => navigate('/admin/appointments')}
            className="text-gray-600 hover:text-gray-900 mb-2 flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Cita #{appointment.reference}
          </h1>
        </div>

        <div className={`px-4 py-2 rounded-lg border-2 flex items-center space-x-2 ${statusConfig.class}`}>
          {statusConfig.icon}
          <span className="font-semibold">{statusConfig.text}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Información del Cliente</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Nombre:</span>
                <span className="font-medium">{appointment.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{appointment.customer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Teléfono:</span>
                <span className="font-medium">{appointment.customer.phone}</span>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Detalles de la Cita</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Servicio:</span>
                <span className="font-medium">{appointment.service.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Profesional:</span>
                <span className="font-medium">{appointment.resource.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha:</span>
                <span className="font-medium">
                  {new Date(appointment.date + 'T00:00:00').toLocaleDateString('es-MX', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hora:</span>
                <span className="font-medium">{appointment.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duración:</span>
                <span className="font-medium">{appointment.service.duration} min</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-600">Precio:</span>
                <span className="font-bold text-lg">${appointment.service.price}</span>
              </div>
            </div>
          </div>

          {/* Status History */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Historial de Estados</h2>
            <div className="space-y-4">
              {appointment.statusHistory.map((history, index) => {
                const config = getStatusConfig(history.status);
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${config.class}`}>
                      {config.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{config.text}</p>
                          <p className="text-sm text-gray-600">Por {history.by}</p>
                          {history.notes && (
                            <p className="text-sm text-gray-700 mt-1">{history.notes}</p>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(history.timestamp).toLocaleString('es-MX')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Acciones</h2>
            <div className="space-y-3">
              {appointment.status === 'confirmed' && (
                <>
                  <button
                    onClick={() => handleStatusChange('in-progress')}
                    className="w-full px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-medium transition-colors"
                  >
                    Cliente Llegó
                  </button>
                  <button
                    onClick={() => handleStatusChange('arrived-late')}
                    className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-colors"
                  >
                    Llegó Tarde
                  </button>
                  <button
                    onClick={() => handleStatusChange('no-show')}
                    className="w-full px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium transition-colors"
                  >
                    No Asistió
                  </button>
                </>
              )}

              {(appointment.status === 'in-progress' || appointment.status === 'arrived-late') && (
                <button
                  onClick={() => handleStatusChange('completed')}
                  className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium transition-colors"
                >
                  Marcar Completada
                </button>
              )}

              {appointment.status === 'confirmed' && (
                <button
                  onClick={() => handleStatusChange('cancelled')}
                  className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition-colors"
                >
                  Cancelar Cita
                </button>
              )}
            </div>
          </div>

          {/* Business Rules Info */}
          <div className="card bg-blue-50 border-2 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3">Reglas de Negocio</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>No-Show: Cobrar 50% como penalización</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Llegada tarde {'>'} 15 min: Cobrar tiempo completo</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Cancelación: Mínimo 2 horas antes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Completada: Notificar al cliente</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Status Change Modal */}
      <Modal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        title={`Cambiar estado a: ${getStatusConfig(selectedStatus).text}`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notas (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              rows="4"
              placeholder="Agregar notas sobre el cambio de estado..."
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowStatusModal(false)}
              className="btn-secondary"
            >
              Cancelar
            </button>
            <button
              onClick={confirmStatusChange}
              className="btn-primary"
            >
              Confirmar Cambio
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AppointmentDetail;
