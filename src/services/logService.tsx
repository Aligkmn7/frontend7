// src/services/logService.ts

export interface LogEntry {
  id: number;
  date: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  studentName?: string; // Opsiyonel, sadece şirkete özel
}

// Başlangıç mock verisi
let mockLogs: LogEntry[] = [
  { id: 1, date: '2025-04-21', content: 'Bugün proje kurulumu yaptım.', status: 'pending' },
];

// Mevcut öğrenci günlüklerini getirir
export async function fetchLogs(): Promise<LogEntry[]> {
  return new Promise((res) => setTimeout(() => res([...mockLogs]), 300));
}


// Yeni günlük ekler
export async function addLog(content: string): Promise<LogEntry> {
  const newEntry: LogEntry = {
    id: mockLogs.length + 1,
    date: new Date().toISOString().split('T')[0],
    content,
    status: 'pending',
  };
  mockLogs = [newEntry, ...mockLogs];
  return new Promise((res) => setTimeout(() => res(newEntry), 300));
}

// Şirket paneli için tüm günlükleri getirir
export async function fetchAllLogs(): Promise<LogEntry[]> {
  return new Promise((res) => setTimeout(() => res([...mockLogs]), 300));
}

// Bir günlüğün status'unu günceller
export async function updateLogStatus(
  id: number,
  status: 'approved' | 'rejected'
): Promise<LogEntry> {
  mockLogs = mockLogs.map((l) =>
    l.id === id
      ? {
          ...l,
          status,
        }
      : l
  );
  const updated = mockLogs.find((l) => l.id === id)!;
  return new Promise((res) => setTimeout(() => res(updated), 300));
}
