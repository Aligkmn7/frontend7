import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LogEntry {
  id: string;
  date: string;
  content: string;
}

interface InternshipLog {
  id: string;
  studentId: string;
  studentName: string;
  studentNumber: string;
  department: string;
  company: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  entries: LogEntry[];
}

interface LogContextType {
  logs: InternshipLog[];
  addLog: (log: InternshipLog) => void;
  updateLog: (id: string, log: Partial<InternshipLog>) => void;
  getLogById: (id: string) => InternshipLog | undefined;
  getLogsByStudentId: (studentId: string) => InternshipLog[];
  getAllLogs: () => InternshipLog[];
}

const LogContext = createContext<LogContextType | undefined>(undefined);

export const LogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<InternshipLog[]>([]);

  const addLog = (log: InternshipLog) => {
    setLogs(prevLogs => [...prevLogs, log]);
  };

  const updateLog = (id: string, updatedLog: Partial<InternshipLog>) => {
    setLogs(prevLogs =>
      prevLogs.map(log =>
        log.id === id ? { ...log, ...updatedLog } : log
      )
    );
  };

  const getLogById = (id: string) => {
    return logs.find(log => log.id === id);
  };

  const getLogsByStudentId = (studentId: string) => {
    return logs.filter(log => log.studentId === studentId);
  };

  const getAllLogs = () => {
    return logs;
  };

  return (
    <LogContext.Provider
      value={{
        logs,
        addLog,
        updateLog,
        getLogById,
        getLogsByStudentId,
        getAllLogs,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};

export const useLogs = () => {
  const context = useContext(LogContext);
  if (context === undefined) {
    throw new Error('useLogs must be used within a LogProvider');
  }
  return context;
}; 