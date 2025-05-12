import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user, userRole } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleBack = () => {
    if (userRole === 'student') {
      navigate('/student');
    } else if (userRole === 'company') {
      navigate('/company');
    } else if (userRole === 'university') {
      navigate('/university');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <Card className="p-8 max-w-2xl mx-auto shadow-xl border-0">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Profil</h1>
            <p className="text-gray-600 mt-1">Kullanıcı bilgilerinizi görüntüleyin</p>
          </div>
          <div className="space-x-3">
            <Button 
              onClick={handleBack}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm"
            >
              ← Geri Dön
            </Button>
            <Button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white shadow-sm"
            >
              Çıkış Yap
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Kullanıcı Bilgileri</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
                <p className="mt-1 text-gray-900">{user?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">E-posta</label>
                <p className="mt-1 text-gray-900">{user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rol</label>
                <p className="mt-1 text-gray-900">
                  {userRole === 'student' ? 'Öğrenci' :
                   userRole === 'company' ? 'Şirket' :
                   'Üniversite'}
                </p>
              </div>
              {user?.studentNumber && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Öğrenci Numarası</label>
                  <p className="mt-1 text-gray-900">{user.studentNumber}</p>
                </div>
              )}
              {user?.department && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bölüm</label>
                  <p className="mt-1 text-gray-900">{user.department}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile; 