import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';

interface JobFormData {
  title: string;
  description: string;
  requirements: string[];
  location: string;
  startDate: string;
  endDate: string;
  applicationDeadline: string;
  companyDetails: {
    address: string;
    phone: string;
    email: string;
    website: string;
    about: string;
  };
}

const PostJob: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { addJob } = useJobs();
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    requirements: [''],
    location: '',
    startDate: '',
    endDate: '',
    applicationDeadline: '',
    companyDetails: {
      address: '',
      phone: '',
      email: '',
      website: '',
      about: ''
    }
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData({ ...formData, requirements: newRequirements });
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, '']
    });
  };

  const removeRequirement = (index: number) => {
    if (formData.requirements.length > 1) {
      const newRequirements = formData.requirements.filter((_, i) => i !== index);
      setFormData({ ...formData, requirements: newRequirements });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.location || 
        !formData.startDate || !formData.endDate || !formData.applicationDeadline ||
        formData.requirements.some(req => !req.trim()) ||
        !formData.companyDetails.address || !formData.companyDetails.phone ||
        !formData.companyDetails.email || !formData.companyDetails.website ||
        !formData.companyDetails.about) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    // Add the job using the context
    addJob({
      ...formData,
      company: user?.company || 'Şirket Adı',
      status: 'active'
    });

    alert('İlan başarıyla oluşturuldu.');
    navigate('/company/job-listings');
  };

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Yeni İlan Oluştur</h1>
        <div className="space-x-2">
          <Button 
            onClick={() => navigate("/company/job-listings")}
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Temel Bilgiler */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-3 text-gray-800 border-b pb-2">Temel Bilgiler</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                İlan Başlığı
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Örn: Yazılım Geliştirme Stajı"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                İlan Açıklaması
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="İlan detaylarını buraya yazın..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Konum
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Örn: İstanbul"
              />
            </div>
          </div>
        </div>

        {/* Gereksinimler */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Gereksinimler</h3>
            <Button 
              type="button"
              onClick={addRequirement}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Gereksinim Ekle
            </Button>
          </div>
          <div className="space-y-2">
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => handleRequirementChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Gereksinim yazın..."
                />
                {formData.requirements.length > 1 && (
                  <Button 
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Sil
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tarih Bilgileri */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-3 text-gray-800 border-b pb-2">Tarih Bilgileri</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Başlangıç Tarihi
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bitiş Tarihi
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Son Başvuru Tarihi
              </label>
              <input
                type="date"
                value={formData.applicationDeadline}
                onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Firma Bilgileri */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-3 text-gray-800 border-b pb-2">Firma Bilgileri</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adres
              </label>
              <input
                type="text"
                value={formData.companyDetails.address}
                onChange={(e) => setFormData({
                  ...formData,
                  companyDetails: { ...formData.companyDetails, address: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Firma adresi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon
              </label>
              <input
                type="tel"
                value={formData.companyDetails.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  companyDetails: { ...formData.companyDetails, phone: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Firma telefonu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-posta
              </label>
              <input
                type="email"
                value={formData.companyDetails.email}
                onChange={(e) => setFormData({
                  ...formData,
                  companyDetails: { ...formData.companyDetails, email: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Firma e-posta adresi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                value={formData.companyDetails.website}
                onChange={(e) => setFormData({
                  ...formData,
                  companyDetails: { ...formData.companyDetails, website: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Firma websitesi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Firma Hakkında
              </label>
              <textarea
                value={formData.companyDetails.about}
                onChange={(e) => setFormData({
                  ...formData,
                  companyDetails: { ...formData.companyDetails, about: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Firma hakkında kısa bir açıklama..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button 
            type="button"
            onClick={() => navigate("/company/job-listings")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            İptal
          </Button>
          <Button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            İlanı Yayınla
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default PostJob; 