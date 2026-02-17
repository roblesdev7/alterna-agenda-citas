import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    date: '',
    search: '',
  });

  useEffect(() => {
    fetchAppointments();
  }, [filters]);

  const fetchAppointments = async () => {
    // TODO: Replace with actual API call
    // const response = await api.get('/admin/appointments', { params: filters });
    
    // Mock data for development
    setTimeout(() => {
      setAppointments([
        {
          id: '1',
          reference: 'APT-ABC123',
          customer: 'Juan Pérez',
          service: 'Corte de Cabello',
          resource: 'María García',
          date: '2026-02-20',
          time: '10:00',
          status: 'confirmed',
          price: 150,
        },
        {
          id: '2',
          reference: 'APT-DEF456',
          customer: 'Ana López',
          service: 'Facial',
          resource: 'Carlos López',
          date: '2026-02-20',
          time: '11:00',
          status: 'in-progress',
          price: 350,
        },
        {
          id: '3',
          reference: 'APT-GHI789',
          customer: 'Pedro Sánchez',
          service: 'Masaje',
          resource: 'Juan Pérez',
          date: '2026-02-19',
          time: '15:00',
          status: 'completed',
          price: 400,
        },
        {
          id: '4',
          reference: 'APT-JKL012',
          customer: 'María González',
          service: 'Corte + Barba',
          resource: 'María García',
          date: '2026-02-19',
          time: '14:00',
          status: 'no-show',
          price: 200,
        },
        {
          id: '5',
          reference: 'APT-MNO345',
          customer: 'Carlos Ramírez',
          service: 'Corte de Cabello',
          resource: 'Juan Pérez',
          date: '2026-02-18',
          time: '09:00',
          status: 'cancelled',
          price: 150,
        },
      ]);
      setLoading(false);
    }, 800);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { class: 'bg-blue-100 text-blue-800', text: 'Confirmada' },
      'in-progress': { class: 'bg-yellow-100 text-yellow-800', text: 'En Curso' },
      completed: { class: 'bg-green-100 text-green-800', text: 'Completada' },
      cancelled: { class: 'bg-red-100 text-red-800', text: 'Cancelada' },
      'no-show': { class: 'bg-gray-100 text-gray-800', text: 'No Asistió' },
      'arrived-late': { class: 'bg-orange-100 text-orange-800', text: 'Llegó Tarde' },
    };

    const config = statusConfig[status] || statusConfig.confirmed;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.text}
      </span>
    );
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filters.status !== 'all' && apt.status !== filters.status) return false;
    if (filters.date && apt.date !== filters.date) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        apt.reference.toLowerCase().includes(searchLower) ||
        apt.customer.toLowerCase().includes(searchLower) ||
        apt.service.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  if (loading) {
    return <LoadingSpinner text="Cargando citas..." />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Citas</h1>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="input-field"
            >
              <option value="all">Todos los estados</option>
              <option value="confirmed">Confirmadas</option>
              <option value="in-progress">En Curso</option>
              <option value="completed">Completadas</option>
              <option value="no-show">No Asistió</option>
              <option value="cancelled">Canceladas</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha
            </label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Referencia, cliente, servicio..."
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referencia</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Servicio</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profesional</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                    No se encontraron citas
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-primary-600">
                      {appointment.reference}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {appointment.customer}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {appointment.service}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {appointment.resource}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {new Date(appointment.date + 'T00:00:00').toLocaleDateString('es-MX', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {appointment.time}
                    </td>
                    <td className="px-4 py-4">
                      {getStatusBadge(appointment.status)}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      ${appointment.price}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <Link
                        to={`/admin/appointments/${appointment.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="border-t border-gray-200 mt-4 pt-4 px-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Mostrando {filteredAppointments.length} de {appointments.length} citas
            </span>
            <span className="font-medium text-gray-900">
              Total: ${filteredAppointments.reduce((sum, apt) => sum + apt.price, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsList;
