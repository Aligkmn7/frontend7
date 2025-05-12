import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { useApplications } from '../context/ApplicationContext';

interface InternshipFormData {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  startDate: string;
  endDate: string;
  department: string;
  supervisorName: string;
  supervisorTitle: string;
  supervisorEmail: string;
  supervisorPhone: string;
  projectTitle: string;
  projectDescription: string;
  learningObjectives: string[];
  status: 'pending' | 'approved' | 'rejected';
}

const NewInternshipForm: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { addApplication } = useApplications();
  const [formData, setFormData] = useState<InternshipFormData>({
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
    startDate: '',
    endDate: '',
    department: '',
    supervisorName: '',
    supervisorTitle: '',
    supervisorEmail: '',
    supervisorPhone: '',
    projectTitle: '',
    projectDescription: '',
    learningObjectives: [''],
    status: 'pending'
  });

  const handleChange = (field: keyof InternshipFormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddObjective = () => {
    setFormData(prev => ({
      ...prev,
      learningObjectives: [...prev.learningObjectives, '']
    }));
  };

  const handleRemoveObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter((_, i) => i !== index)
    }));
  };

  const handleObjectiveChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.map((obj, i) => 
        i === index ? value : obj
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Başvuruyu context'e ekle
    addApplication({
      studentId: user?.id || '',
      studentName: user?.name || '',
      studentNumber: user?.studentNumber || '',
      department: formData.department,
      companyName: formData.companyName,
      companyAddress: formData.companyAddress,
      companyPhone: formData.companyPhone,
      companyEmail: formData.companyEmail,
      startDate: formData.startDate,
      endDate: formData.endDate,
      supervisorName: formData.supervisorName,
      supervisorTitle: formData.supervisorTitle,
      supervisorEmail: formData.supervisorEmail,
      supervisorPhone: formData.supervisorPhone,
      projectTitle: formData.projectTitle,
      projectDescription: formData.projectDescription,
      learningObjectives: formData.learningObjectives
    });

    alert('Staj başvurunuz başarıyla gönderildi.');
    navigate('/student/internships');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <Card className="p-8 max-w-4xl mx-auto shadow-xl border-0">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Yeni Staj Başvurusu</h1>
            <p className="text-gray-600 mt-1">Lütfen tüm alanları eksiksiz doldurun</p>
          </div>
          <div className="space-x-3">
            <Button 
              onClick={() => navigate('/student/internships')}
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Şirket Bilgileri */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Şirket Bilgileri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şirket Adı
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şirket Adresi
                </label>
                <input
                  type="text"
                  value={formData.companyAddress}
                  onChange={(e) => handleChange('companyAddress', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şirket Telefonu
                </label>
                <input
                  type="tel"
                  value={formData.companyPhone}
                  onChange={(e) => handleChange('companyPhone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şirket E-posta
                </label>
                <input
                  type="email"
                  value={formData.companyEmail}
                  onChange={(e) => handleChange('companyEmail', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Staj Bilgileri */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Staj Bilgileri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Başlangıç Tarihi
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bitiş Tarihi
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departman
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Danışman Bilgileri */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Danışman Bilgileri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Danışman Adı
                </label>
                <input
                  type="text"
                  value={formData.supervisorName}
                  onChange={(e) => handleChange('supervisorName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Danışman Ünvanı
                </label>
                <input
                  type="text"
                  value={formData.supervisorTitle}
                  onChange={(e) => handleChange('supervisorTitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Danışman E-posta
                </label>
                <input
                  type="email"
                  value={formData.supervisorEmail}
                  onChange={(e) => handleChange('supervisorEmail', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Danışman Telefonu
                </label>
                <input
                  type="tel"
                  value={formData.supervisorPhone}
                  onChange={(e) => handleChange('supervisorPhone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Proje Bilgileri */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Proje Bilgileri</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proje Başlığı
                </label>
                <input
                  type="text"
                  value={formData.projectTitle}
                  onChange={(e) => handleChange('projectTitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proje Açıklaması
                </label>
                <textarea
                  value={formData.projectDescription}
                  onChange={(e) => handleChange('projectDescription', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  required
                />
              </div>
            </div>
          </div>

          {/* Öğrenme Hedefleri */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Öğrenme Hedefleri</h2>
              <Button
                type="button"
                onClick={handleAddObjective}
                className="bg-green-500 hover:bg-green-600 text-white shadow-sm"
              >
                + Hedef Ekle
              </Button>
            </div>
            <div className="space-y-3">
              {formData.learningObjectives.map((objective, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={objective}
                    onChange={(e) => handleObjectiveChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Öğrenme Hedefi ${index + 1}`}
                    required
                  />
                  {formData.learningObjectives.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => handleRemoveObjective(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-full transition-colors duration-200"
                    >
                      Sil
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-lg shadow-sm transition-all duration-200"
            >
              Başvuruyu Gönder
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NewInternshipForm;
