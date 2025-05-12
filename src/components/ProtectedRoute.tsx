import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type UserRole = 'student' | 'company' | 'university';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userRole as UserRole)) {
    // Kullanıcının rolü uygun değilse ilgili sayfaya yönlendir
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;