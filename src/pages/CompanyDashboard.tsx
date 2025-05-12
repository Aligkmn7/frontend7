import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

const CompanyDashboard: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-200 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Şirket Paneli</h1>
        <Button onClick={logout} variant="outline" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white transition-colors">
          Çıkış Yap
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-white shadow-xl rounded-lg hover:shadow-2xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Stajyerler</h2>
          <p className="text-gray-600 mb-4">
            Şirketinize başvuran ve kabul edilen stajyerleri görüntüleyin ve değerlendirin.
          </p>
          <Link to="/company/interns">
            <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
              Stajyerleri Görüntüle
            </Button>
          </Link>
        </Card>

        <Card className="p-6 bg-white shadow-xl rounded-lg hover:shadow-2xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Profil</h2>
          <p className="text-gray-600 mb-4">
            Şirket bilgilerinizi görüntüleyin ve güncelleyin.
          </p>
          <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
            Profili Görüntüle
          </Button>
        </Card>

        <Card className="p-6 bg-white shadow-xl rounded-lg hover:shadow-2xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">İlanlar</h2>
          <p className="text-gray-600 mb-4">
            Staj ilanlarınızı yönetin ve yeni ilanlar ekleyin.
          </p>
          <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
            İlanları Yönet
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default CompanyDashboard;
