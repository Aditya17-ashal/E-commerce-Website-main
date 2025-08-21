import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  role?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const { user, loading } = useAuth();

  const isAdmin = !!user && (
    String((user as any).role ?? '').toLowerCase().includes('admin') ||
    (user as any).isAdmin === true
  );

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role) {
    const requested = String(role).toLowerCase();
    if (requested === 'admin' && !isAdmin) {
      return <Navigate to="/" />;
    }
    if (requested !== 'admin') {
      const userRole = String((user as any).role ?? '').toLowerCase();
      if (userRole !== requested) {
        return <Navigate to="/" />;
      }
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;