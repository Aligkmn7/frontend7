import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { useLogs } from '../context/LogContext';
import { useApplications } from '../context/ApplicationContext';

interface InternshipApplication {
  id: string;
  studentId: string;
  studentName: string;
  studentNumber: string;
  department: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  startDate: string;
  endDate: string;
  supervisorName: string;
  supervisorTitle: string;
  supervisorEmail: string;
  supervisorPhone: string;
  projectTitle: string;
  projectDescription: string;
  learningObjectives: string[];
  status: 'pending' | 'approved' | 'rejected';
}

const UniversityDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout, userRole } = useAuth();
  const { getAllLogs, updateLog } = useLogs();
  const { getAllApplications, updateApplication } = useApplications();
  const [selectedLog, setSelectedLog] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [logs, setLogs] = useState(getAllLogs());
  const [applications, setApplications] = useState(getAllApplications());
  const [activeTab, setActiveTab] = useState<'logs' | 'applications'>('logs');

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(getAllLogs());
      setApplications(getAllApplications());
    }, 5000);

    return () => clearInterval(interval);
  }, [getAllLogs, getAllApplications]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleApprove = (id: string, type: 'log' | 'application') => {
    if (type === 'log') {
      updateLog(id, { status: 'approved' });
      setLogs(getAllLogs());
      alert('Staj günlüğü onaylandı.');
    } else {
      updateApplication(id, { status: 'approved' });
      setApplications(getAllApplications());
      alert('Staj başvurusu onaylandı.');
    }
  };

  const handleReject = (id: string, type: 'log' | 'application') => {
    if (type === 'log') {
      updateLog(id, { status: 'rejected' });
      setLogs(getAllLogs());
      alert('Staj günlüğü reddedildi.');
    } else {
      updateApplication(id, { status: 'rejected' });
      setApplications(getAllApplications());
      alert('Staj başvurusu reddedildi.');
    }
  };

  const selectedLogData = selectedLog ? logs.find(log => log.id === selectedLog) : null;
  const selectedApplicationData = selectedApplication ? applications.find(app => app.id === selectedApplication) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <Card className="p-8 max-w-7xl mx-auto shadow-xl border-0">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Üniversite Paneli</h1>
            <p className="text-gray-600 mt-1">Staj başvurularını ve günlükleri yönetin</p>
          </div>
          <Button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white shadow-sm"
          >
            Çıkış Yap
          </Button>
        </div>

        {/* Tab Menüsü */}
        <div className="flex space-x-4 mb-6">
          <Button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'logs'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Staj Günlükleri
          </Button>
          <Button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'applications'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Staj Başvuruları
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sol Panel - Liste */}
          <div className="space-y-4">
            {activeTab === 'logs' ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Staj Günlükleri</h2>
                  <span className="text-sm text-gray-500">
                    {logs.length} günlük bulundu
                  </span>
                </div>
                {logs.length === 0 ? (
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                    <p className="text-gray-500">Henüz günlük bulunmamaktadır.</p>
                  </div>
                ) : (
                  logs.map((log) => (
                    <div
                      key={log.id}
                      className={`bg-white p-6 rounded-xl shadow-sm border ${
                        log.status === 'approved' ? 'border-green-200' :
                        log.status === 'rejected' ? 'border-red-200' :
                        'border-gray-100'
                      } hover:shadow-md transition-all duration-200`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{log.studentName}</h3>
                          <p className="text-sm text-gray-600">{log.studentNumber} - {log.department}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          log.status === 'approved' ? 'bg-green-100 text-green-800' :
                          log.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {log.status === 'approved' ? '✓ Onaylandı' :
                           log.status === 'rejected' ? '✕ Reddedildi' :
                           '⏳ Beklemede'}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Şirket:</span> {log.company}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Tarih:</span> {log.startDate} - {log.endDate}
                        </p>
                      </div>
                      <Button
                        onClick={() => setSelectedLog(log.id)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm transition-all duration-200"
                      >
                        Detayları Gör
                      </Button>
                    </div>
                  ))
                )}
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Staj Başvuruları</h2>
                  <span className="text-sm text-gray-500">
                    {applications.length} başvuru bulundu
                  </span>
                </div>
                {applications.length === 0 ? (
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                    <p className="text-gray-500">Henüz başvuru bulunmamaktadır.</p>
                  </div>
                ) : (
                  applications.map((app) => (
                    <div
                      key={app.id}
                      className={`bg-white p-6 rounded-xl shadow-sm border ${
                        app.status === 'approved' ? 'border-green-200' :
                        app.status === 'rejected' ? 'border-red-200' :
                        'border-gray-100'
                      } hover:shadow-md transition-all duration-200`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{app.studentName}</h3>
                          <p className="text-sm text-gray-600">{app.studentNumber} - {app.department}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          app.status === 'approved' ? 'bg-green-100 text-green-800' :
                          app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {app.status === 'approved' ? '✓ Onaylandı' :
                           app.status === 'rejected' ? '✕ Reddedildi' :
                           '⏳ Beklemede'}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Şirket:</span> {app.companyName}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Tarih:</span> {app.startDate} - {app.endDate}
                        </p>
                      </div>
                      <Button
                        onClick={() => setSelectedApplication(app.id)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm transition-all duration-200"
                      >
                        Detayları Gör
                      </Button>
                    </div>
                  ))
                )}
              </>
            )}
          </div>

          {/* Sağ Panel - Detaylar */}
          {activeTab === 'logs' ? (
            selectedLogData ? (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Günlük Detayları</h2>
                  <Button
                    onClick={() => setSelectedLog(null)}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 p-2 rounded-full transition-colors duration-200"
                  >
                    ✕
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">Öğrenci Bilgileri</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">{selectedLogData.studentName}</p>
                      <p className="text-gray-600">{selectedLogData.studentNumber}</p>
                      <p className="text-gray-600">{selectedLogData.department}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">Staj Bilgileri</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Şirket:</span> {selectedLogData.company}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Tarih:</span> {selectedLogData.startDate} - {selectedLogData.endDate}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">Günlük Kayıtları</h3>
                    <div className="space-y-3">
                      {selectedLogData.entries.map((entry, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg border border-gray-100">
                          <p className="text-sm font-medium text-gray-900 mb-1">{entry.date}</p>
                          <p className="text-gray-600">{entry.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedLogData.status === 'pending' && (
                    <div className="flex space-x-3 mt-6">
                      <Button
                        onClick={() => handleApprove(selectedLogData.id, 'log')}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white shadow-sm transition-all duration-200"
                      >
                        ✓ Onayla
                      </Button>
                      <Button
                        onClick={() => handleReject(selectedLogData.id, 'log')}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white shadow-sm transition-all duration-200"
                      >
                        ✕ Reddet
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                <p className="text-gray-500">Detayları görüntülemek için bir günlük seçin</p>
              </div>
            )
          ) : (
            selectedApplicationData ? (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Başvuru Detayları</h2>
                  <Button
                    onClick={() => setSelectedApplication(null)}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 p-2 rounded-full transition-colors duration-200"
                  >
                    ✕
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">Öğrenci Bilgileri</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">{selectedApplicationData.studentName}</p>
                      <p className="text-gray-600">{selectedApplicationData.studentNumber}</p>
                      <p className="text-gray-600">{selectedApplicationData.department}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">Şirket Bilgileri</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Şirket Adı:</span> {selectedApplicationData.companyName}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Adres:</span> {selectedApplicationData.companyAddress}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Telefon:</span> {selectedApplicationData.companyPhone}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">E-posta:</span> {selectedApplicationData.companyEmail}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">Danışman Bilgileri</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Ad Soyad:</span> {selectedApplicationData.supervisorName}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Ünvan:</span> {selectedApplicationData.supervisorTitle}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">E-posta:</span> {selectedApplicationData.supervisorEmail}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Telefon:</span> {selectedApplicationData.supervisorPhone}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">Proje Bilgileri</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Proje Başlığı:</span> {selectedApplicationData.projectTitle}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Açıklama:</span> {selectedApplicationData.projectDescription}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">Öğrenme Hedefleri</h3>
                    <div className="space-y-2">
                      {selectedApplicationData.learningObjectives.map((objective, index) => (
                        <p key={index} className="text-gray-600">
                          • {objective}
                        </p>
                      ))}
                    </div>
                  </div>

                  {selectedApplicationData.status === 'pending' && (
                    <div className="flex space-x-3 mt-6">
                      <Button
                        onClick={() => handleApprove(selectedApplicationData.id, 'application')}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white shadow-sm transition-all duration-200"
                      >
                        ✓ Onayla
                      </Button>
                      <Button
                        onClick={() => handleReject(selectedApplicationData.id, 'application')}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white shadow-sm transition-all duration-200"
                      >
                        ✕ Reddet
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                <p className="text-gray-500">Detayları görüntülemek için bir başvuru seçin</p>
              </div>
            )
          )}
        </div>
      </Card>
    </div>
  );
};

export default UniversityDashboard;
