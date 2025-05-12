import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';

interface InternshipDetail {
  id: string;
  company: string;
  startDate: string;
  endDate: string;
  status: 'Onaylandı' | 'Onaylanmadı' | 'Beklemede';
  topics: string;
  companyAddress?: string;
  companyPhone?: string;
  supervisor?: string;
  supervisorEmail?: string;
}

// Örnek veri
const dummyInternshipDetail: InternshipDetail = {
  id: "1",
  company: "ABC Teknoloji",
  startDate: "2024-01-01",
  endDate: "2024-03-01",
  status: "Onaylandı",
  topics: "Web Geliştirme",
  companyAddress: "İstanbul, Türkiye",
  companyPhone: "0212 123 45 67",
  supervisor: "Ahmet Yılmaz",
  supervisorEmail: "ahmet.yilmaz@abcteknoloji.com"
};

const InternshipDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staj Detayı</h1>
        <div className="space-x-2">
          <Button 
            onClick={() => navigate("/student/internships")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Geri Dön
          </Button>
          <Button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Çıkış Yap
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Staj Bilgileri */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-3 text-gray-800 border-b pb-2">Staj Bilgileri</h3>
          <div className="space-y-2">
            <p><span className="font-medium text-gray-600">Kurum:</span> {dummyInternshipDetail.company}</p>
            <p><span className="font-medium text-gray-600">Başlangıç:</span> {dummyInternshipDetail.startDate}</p>
            <p><span className="font-medium text-gray-600">Bitiş:</span> {dummyInternshipDetail.endDate}</p>
            <p><span className="font-medium text-gray-600">Konular:</span> {dummyInternshipDetail.topics}</p>
            <p>
              <span className="font-medium text-gray-600">Durum:</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                dummyInternshipDetail.status === "Onaylandı" 
                  ? "bg-green-100 text-green-800" 
                  : dummyInternshipDetail.status === "Onaylanmadı"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
              }`}>
                {dummyInternshipDetail.status}
              </span>
            </p>
          </div>
        </div>

        {/* Kurum Bilgileri */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-3 text-gray-800 border-b pb-2">Kurum Bilgileri</h3>
          <div className="space-y-2">
            <p><span className="font-medium text-gray-600">Adres:</span> {dummyInternshipDetail.companyAddress}</p>
            <p><span className="font-medium text-gray-600">Telefon:</span> {dummyInternshipDetail.companyPhone}</p>
            <p><span className="font-medium text-gray-600">Staj Sorumlusu:</span> {dummyInternshipDetail.supervisor}</p>
            <p><span className="font-medium text-gray-600">E-posta:</span> {dummyInternshipDetail.supervisorEmail}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Button 
          onClick={() => navigate(`/student/internships/${id}/log`)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
        >
          Staj Defteri Doldur
        </Button>
      </div>
    </Card>
  );
};

export default InternshipDetails;
    