import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    todayAppointments: 0,
    pendingAppointments: 0,
    completedToday: 0,
    revenue: 0,
  });
  const [todayAppointments, setTodayAppointments] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // TODO: Replace with actual API call
    // const response = await api.get('/admin/dashboard');
    
    // Mock data for development
    setTimeout(() => {
      setStats({
        todayAppointments: 8,
        pendingAppointments: 3,
        completedToday: 5,
        revenue: 2400,
      });

      setTodayAppointments([
        {
          id: '1',
          time: '09:00',
          customer: 'Juan Pérez',
          service: 'Corte de Cabello',
          resource: 'María García',
          status: 'confirmed',
        },
        {
          id: '2',
          time: '10:00',
          customer: 'Ana López',
          service: 'Facial',
          resource: 'Carlos López',
          status: 'in-progress',
        },
        {
          id: '3',
          time: '11:00',
          customer: 'Pedro Sánchez',
          service: 'Corte + Barba',
          resource: 'Juan Pérez',
          status: 'confirmed',
        },
      ]);
    }, 500);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { class: 'bg-blue-100 text-blue-800', text: 'Confirmada' },
      'in-progress': { class: 'bg-yellow-100 text-yellow-800', text: 'En Curso' },
      completed: { class: 'bg-green-100 text-green-800', text: 'Completada' },
      cancelled: { class: 'bg-red-100 text-red-800', text: 'Cancelada' },
      'no-show': { class: 'bg-gray-100 text-gray-800', text: 'No Asistió' },
    };

    const config = statusConfig[status] || statusConfig.confirmed;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Citas Hoy</p>
              <p className="text-3xl font-bold">{stats.todayAppointments}</p>
            </div>
            <svg className="w-12 h-12 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm mb-1">Pendientes</p>
              <p className="text-3xl font-bold">{stats.pendingAppointments}</p>
            </div>
            <svg className="w-12 h-12 text-yellow-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Completadas Hoy</p>
              <p className="text-3xl font-bold">{stats.completedToday}</p>
            </div>
            <svg className="w-12 h-12 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Ingresos Hoy</p>
              <p className="text-3xl font-bold">${stats.revenue}</p>
            </div>
            <svg className="w-12 h-12 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Today's Appointments */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Citas de Hoy</h2>
          <Link to="/admin/appointments" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Ver todas →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Servicio</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profesional</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {todayAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {appointment.time}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {appointment.customer}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {appointment.service}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {appointment.resource}
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(appointment.status)}
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      to={`/admin/appointments/${appointment.id}`}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Ver detalles
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
