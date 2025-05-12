import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { useLogs } from '../context/LogContext';

interface LogEntry {
  id: string;
  date: string;
  content: string;
}

const DailyLog: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout, userRole } = useAuth();
  const { getLogById, updateLog, addLog } = useLogs();
  const [entries, setEntries] = useState<LogEntry[]>([]);

  // Günlük verilerini yükle
  useEffect(() => {
    if (id) {
      const log = getLogById(id);
      if (log) {
        setEntries(log.entries);
      } else {
        // Yeni günlük oluştur
        setEntries([{
          id: Date.now().toString(),
          date: new Date().toISOString().split('T')[0],
          content: ''
        }]);
      }
    }
  }, [id, getLogById]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddEntry = () => {
    const newEntry: LogEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      content: ''
    };
    setEntries([...entries, newEntry]);
  };

  const handleUpdateEntry = (id: string, field: keyof LogEntry, value: string) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const handleRemoveEntry = (id: string) => {
    if (entries.length > 1) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const handleSave = () => {
    // Tüm alanların doldurulduğunu kontrol et
    const isComplete = entries.every(entry => entry.date && entry.content);
    if (!isComplete) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    if (id) {
      const existingLog = getLogById(id);
      if (existingLog) {
        // Mevcut günlüğü güncelle
        updateLog(id, { entries });
      } else {
        // Yeni günlük oluştur
        addLog({
          id,
          studentId: '1', // Gerçek uygulamada auth context'ten alınacak
          studentName: 'Test Öğrenci', // Gerçek uygulamada auth context'ten alınacak
          studentNumber: '2024001', // Gerçek uygulamada auth context'ten alınacak
          department: 'Bilgisayar Mühendisliği', // Gerçek uygulamada auth context'ten alınacak
          company: 'ABC Teknoloji', // Gerçek uygulamada staj detaylarından alınacak
          startDate: '2024-06-01', // Gerçek uygulamada staj detaylarından alınacak
          endDate: '2024-08-31', // Gerçek uygulamada staj detaylarından alınacak
          status: 'pending',
          entries
        });
      }
      alert('Günlük kayıtları başarıyla kaydedildi.');
    }
  };

  const log = id ? getLogById(id) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <Card className="p-8 max-w-4xl mx-auto shadow-xl border-0">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Staj Günlüğü</h1>
            {log && (
              <div className="mt-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  log.status === 'approved' ? 'bg-green-100 text-green-800' :
                  log.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {log.status === 'approved' ? '✓ Onaylandı' :
                   log.status === 'rejected' ? '✕ Reddedildi' :
                   '⏳ Beklemede'}
                </span>
              </div>
            )}
          </div>
          <div className="space-x-3">
            <Button 
              onClick={() => navigate(`/student/internships/${id}`)}
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
          {entries.map((entry, index) => (
            <div 
              key={entry.id} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Gün {index + 1}</h3>
                {entries.length > 1 && (
                  <Button
                    onClick={() => handleRemoveEntry(entry.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-full transition-colors duration-200"
                  >
                    Sil
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tarih
                  </label>
                  <input
                    type="date"
                    value={entry.date}
                    onChange={(e) => handleUpdateEntry(entry.id, 'date', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Günlük İçeriği
                  </label>
                  <textarea
                    value={entry.content}
                    onChange={(e) => handleUpdateEntry(entry.id, 'content', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    rows={4}
                    placeholder="O gün yaptığınız işleri ve öğrendiklerinizi yazın..."
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between pt-4">
            <Button
              onClick={handleAddEntry}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-sm transition-all duration-200 flex items-center space-x-2"
            >
              <span>+</span>
              <span>Yeni Gün Ekle</span>
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-lg shadow-sm transition-all duration-200"
            >
              Kaydet
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DailyLog;
