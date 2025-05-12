// src/components/Header.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { userRole, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {userRole === 'student' ? 'Öğrenci Paneli' : 
             userRole === 'company' ? 'Şirket Paneli' : 
             'Üniversite Paneli'}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Hoşgeldin, {userRole}
            </span>
            <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Çıkış Yap
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
