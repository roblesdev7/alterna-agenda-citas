import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { AdminProvider } from './context/AdminContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Booking from './pages/Booking';
import MyAppointments from './pages/MyAppointments';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AppointmentsList from './pages/admin/AppointmentsList';
import AppointmentDetail from './pages/admin/AppointmentDetail';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AdminProvider>
        <BookingProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="booking" element={<Booking />} />
              <Route path="my-appointments" element={<MyAppointments />} />
            </Route>

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="appointments" element={<AppointmentsList />} />
              <Route path="appointments/:id" element={<AppointmentDetail />} />
              <Route path="resources" element={<div className="p-8">Recursos (Próximamente)</div>} />
              <Route path="services" element={<div className="p-8">Servicios (Próximamente)</div>} />
            </Route>
          </Routes>
        </BookingProvider>
      </AdminProvider>
    </Router>
  );
}

export default App;
