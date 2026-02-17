import { Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import LoadingSpinner from './ui/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAdmin();

  if (loading) {
    return <LoadingSpinner text="Verificando acceso..." />;
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
