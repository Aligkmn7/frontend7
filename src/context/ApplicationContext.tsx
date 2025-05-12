import React, { createContext, useContext, useState } from 'react';

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

interface ApplicationContextType {
  applications: InternshipApplication[];
  addApplication: (application: Omit<InternshipApplication, 'id' | 'status'>) => void;
  updateApplication: (id: string, updates: Partial<InternshipApplication>) => void;
  getApplication: (id: string) => InternshipApplication | undefined;
  getApplicationsByStudent: (studentId: string) => InternshipApplication[];
  getAllApplications: () => InternshipApplication[];
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<InternshipApplication[]>([]);

  const addApplication = (application: Omit<InternshipApplication, 'id' | 'status'>) => {
    const newApplication: InternshipApplication = {
      ...application,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending'
    };
    setApplications(prev => [...prev, newApplication]);
  };

  const updateApplication = (id: string, updates: Partial<InternshipApplication>) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, ...updates } : app
      )
    );
  };

  const getApplication = (id: string) => {
    return applications.find(app => app.id === id);
  };

  const getApplicationsByStudent = (studentId: string) => {
    return applications.filter(app => app.studentId === studentId);
  };

  const getAllApplications = () => {
    return applications;
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        updateApplication,
        getApplication,
        getApplicationsByStudent,
        getAllApplications
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
}; 