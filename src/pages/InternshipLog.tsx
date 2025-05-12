// src/pages/InternshipLog.tsx
import React, { useState, useEffect } from 'react';
import { fetchAllLogs, addLog, LogEntry } from '../services/logService';

const InternshipLog: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    fetchAllLogs().then(setLogs).catch(console.error);
  }, []);

  const handleAdd = async () => {
    if (!newContent.trim()) {
      alert("Lütfen günlük içeriğini doldurun.");
      return;
    }

    try {
      const entry = await addLog(newContent.trim());
      setLogs(prev => [entry, ...prev]);
      setNewContent('');
    } catch (error) {
      console.error('Log eklenemedi:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleExit = () => {
    // Çıkış işlemi
    localStorage.removeItem("userToken");  // Kullanıcı token'ını sil
    localStorage.removeItem("userData");   // Eğer kullanıcı verisi varsa onu da sil

    // Kullanıcıyı ana sayfaya yönlendir (login sayfası yerine)
    window.location.href = "/"; // Ana sayfa
  };

  return (
    <div>
      <h2>Yeni Günlük Ekle</h2>
      
      <div>
        <label htmlFor="newContent">Günlük İçeriği</label>
        <input
          type="text"
          id="newContent"
          value={newContent}
          onChange={e => setNewContent(e.target.value)}
          placeholder="Günlük içeriğini girin"
        />
      </div>

      <button onClick={handleAdd}>Günlük Ekle</button>

      <h3>Günlükler:</h3>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            <strong>{log.date}</strong> - {log.content} ({log.status})
          </li>
        ))}
      </ul>

      {/* Çıkış butonu */}
      <button 
        onClick={handleExit} 
        style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Çıkış Yap
      </button>
    </div>
  );
};

export default InternshipLog;
