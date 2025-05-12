import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { InternDetail } from '../types/intern';
import { dummyInternDetail } from '../data/dummyData';
import { useAuth } from '../context/AuthContext';

export default function CompanyInternDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [intern, setIntern] = useState<InternDetail | null>(null);
  const [approval, setApproval] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setIntern(dummyInternDetail);
  }, [id]);

  const handleSave = () => {
    if (!intern) return;

    const updatedIntern: InternDetail = {
      ...intern,
      status: "Onaylandı",
      evaluation: {
        approved: approval,
        description: description
      }
    };

    console.log('Saving evaluation:', updatedIntern);
    navigate("/company/interns");
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!intern) return <div>Yükleniyor...</div>;

  return (
    <Card className="p-8 max-w-5xl mx-auto bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-900">Öğrenci Detayı</h2>
        <div className="space-x-4">
          <Button 
            onClick={() => navigate("/company/interns")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded-lg"
          >
            Geri Dön
          </Button>
          <Button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-lg"
          >
            Çıkış Yap
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Kişisel Bilgiler */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-3">Kişisel Bilgiler</h3>
          <div className="space-y-3">
            <p><span className="font-medium text-gray-600">Ad:</span> {intern.name}</p>
            <p><span className="font-medium text-gray-600">Soyad:</span> {intern.surname}</p>
            {intern.email && <p><span className="font-medium text-gray-600">E-posta:</span> {intern.email}</p>}
            {intern.phone && <p><span className="font-medium text-gray-600">Telefon:</span> {intern.phone}</p>}
          </div>
        </div>
        
        {/* Eğitim Bilgileri */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-3">Eğitim Bilgileri</h3>
          <div className="space-y-3">
            {intern.university && <p><span className="font-medium text-gray-600">Üniversite:</span> {intern.university}</p>}
            {intern.department && <p><span className="font-medium text-gray-600">Bölüm:</span> {intern.department}</p>}
          </div>
        </div>
      </div>
      
      {/* Değerlendirme Formu */}
      {intern.status === "eksik raporu var" ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-6 my-6 rounded-lg">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Bu öğrencinin staj defteri eksiktir. Staj defteri teslim edilmeden değerlendirme yapılamaz.
              </p>
            </div>
          </div>
        </div>
      ) : intern.status === "eksik raporu yok" ? (
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">Staj Değerlendirme Formu</h3>
          
          <div className="mb-8">
            <label className="block font-medium mb-3 text-gray-700">Stajı onaylıyor musunuz?</label>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  checked={approval}
                  onChange={() => setApproval(true)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Evet</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  checked={!approval}
                  onChange={() => setApproval(false)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Hayır</span>
              </label>
            </div>
          </div>
          
          <div className="mb-8">
            <label className="block font-medium mb-3 text-gray-700">Değerlendirme ve Açıklama</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
              placeholder="Stajyer öğrenci hakkında değerlendirme ve açıklamalarınızı yazınız..."
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg"
            >
              Değerlendirmeyi Kaydet
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">Değerlendirme Sonucu</h3>
          <div className="space-y-6">
            <p>
              <span className="font-medium text-gray-600">Onay Durumu:</span>
              <span className={`ml-2 px-4 py-1 rounded-full text-xs font-medium ${
                intern.evaluation?.approved ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}>
                {intern.evaluation?.approved ? "Onaylandı" : "Onaylanmadı"}
              </span>
            </p>
            {intern.evaluation?.description && (
              <p>
                <span className="font-medium text-gray-600">Açıklama:</span>
                <span className="ml-2">{intern.evaluation.description}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
