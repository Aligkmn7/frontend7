// InternshipList.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';

interface Internship {
  id: string;
  company: string;
  startDate: string;
  endDate: string;
  status: 'Onaylandı' | 'Onaylanmadı' | 'Beklemede';
  topics: string;
}

// Örnek veri
const dummyInternships: Internship[] = [
  {
    id: "1",
    company: "ABC Teknoloji",
    startDate: "2024-01-01",
    endDate: "2024-03-01",
    status: "Onaylandı",
    topics: "Web Geliştirme"
  },
  {
    id: "2",
    company: "XYZ Yazılım",
    startDate: "2024-03-15",
    endDate: "2024-05-15",
    status: "Beklemede",
    topics: "Mobil Uygulama Geliştirme"
  }
];

const InternshipList: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Card className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Stajlarım</h1>
        <div className="space-x-2">
          <Button 
            onClick={() => navigate("/apply-new-internship")}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Yeni Staj Başvurusu
          </Button>
          <Button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Çıkış Yap
          </Button>
        </div>
      </div>

      {dummyInternships.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Henüz staj başvurunuz bulunmamaktadır.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left border border-gray-200">Kurum</th>
                <th className="p-3 text-left border border-gray-200">Başlangıç</th>
                <th className="p-3 text-left border border-gray-200">Bitiş</th>
                <th className="p-3 text-left border border-gray-200">Konular</th>
                <th className="p-3 text-left border border-gray-200">Durum</th>
              </tr>
            </thead>
            <tbody>
              {dummyInternships.map((internship) => (
                <tr
                  key={internship.id}
                  className="hover:bg-gray-50 cursor-pointer border-b border-gray-200"
                  onClick={() => navigate(`/student/internships/${internship.id}`)}
                >
                  <td className="p-3 border border-gray-200">{internship.company}</td>
                  <td className="p-3 border border-gray-200">{internship.startDate}</td>
                  <td className="p-3 border border-gray-200">{internship.endDate}</td>
                  <td className="p-3 border border-gray-200">{internship.topics}</td>
                  <td className="p-3 border border-gray-200">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        internship.status === "Onaylandı" 
                          ? "bg-green-100 text-green-800" 
                          : internship.status === "Onaylanmadı"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {internship.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default InternshipList;
