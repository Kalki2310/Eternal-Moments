import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // If still loading, show loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  // Check if user is logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if the route matches the user's role
  const path = location.pathname.toLowerCase();
  
  if (path.includes('/admin') && user.role !== 'admin') {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }
  
  if (path.includes('/vendor') && user.role !== 'vendor') {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }
  
  if (path.includes('/client') && user.role !== 'client') {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;