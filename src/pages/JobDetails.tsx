import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';

const JobDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout, userRole, user } = useAuth();
  const { getJob, applyToJob } = useJobs();

  const job = getJob(id || '');

  if (!job) {
    return (
      <Card className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">İlan Bulunamadı</h1>
          <Button 
            onClick={() => navigate("/job-listings")}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            İlanlara Dön
          </Button>
        </div>
      </Card>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleApply = () => {
    if (userRole !== 'student') {
      alert('Sadece öğrenciler başvuru yapabilir.');
      return;
    }
    if (user?.id) {
      applyToJob(job.id, user.id);
      alert('Başvurunuz alınmıştır. En kısa sürede size dönüş yapılacaktır.');
      navigate('/student/internships');
    }
  };

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">İlan Detayı</h1>
        <div className="space-x-2">
          <Button 
            onClick={() => navigate("/job-listings")}
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

      <div className="space-y-6">
        {/* İlan Başlığı ve Durum */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{job.title}</h2>
              <p className="text-xl text-gray-600 mt-1">{job.company}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              job.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {job.status === 'active' ? 'Aktif' : 'Kapalı'}
            </span>
          </div>
        </div>

        {/* İlan Detayları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sol Kolon */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium mb-3 text-gray-800 border-b pb-2">İlan Detayları</h3>
              <div className="space-y-4">
                <p className="text-gray-700">{job.description}</p>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Gereksinimler:</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium mb-3 text-gray-800 border-b pb-2">Tarih Bilgileri</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">Başlangıç Tarihi:</span> {job.startDate}</p>
                <p><span className="font-medium">Bitiş Tarihi:</span> {job.endDate}</p>
                <p><span className="font-medium">Son Başvuru Tarihi:</span> {job.applicationDeadline}</p>
              </div>
            </div>
          </div>

          {/* Sağ Kolon */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium mb-3 text-gray-800 border-b pb-2">Firma Bilgileri</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">Adres:</span> {job.companyDetails?.address}</p>
                <p><span className="font-medium">Telefon:</span> {job.companyDetails?.phone}</p>
                <p><span className="font-medium">E-posta:</span> {job.companyDetails?.email}</p>
                <p><span className="font-medium">Website:</span> {job.companyDetails?.website}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium mb-3 text-gray-800 border-b pb-2">Firma Hakkında</h3>
              <p className="text-gray-700">{job.companyDetails?.about}</p>
            </div>
          </div>
        </div>

        {/* Başvuru Butonu */}
        {userRole === 'student' && job.status === 'active' && (
          <div className="flex justify-center mt-6">
            <Button 
              onClick={handleApply}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg"
            >
              Başvur
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default JobDetails; 