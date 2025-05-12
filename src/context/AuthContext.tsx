import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'student' | 'company' | 'university';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentNumber?: string;
  department?: string;
  company?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    setIsAuthenticated(true);
    setUserRole(role);
    
    // Dummy user data for testing
    setUser({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: role,
      studentNumber: role === 'student' ? '2024001' : undefined,
      department: role === 'student' ? 'Bilgisayar Mühendisliği' : undefined,
      company: role === 'company' ? 'Test Company' : undefined
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};