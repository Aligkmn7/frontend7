import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Job {
  id: string;
  company: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  startDate: string;
  endDate: string;
  applicationDeadline: string;
  status: 'active' | 'closed';
  companyDetails?: {
    address: string;
    phone: string;
    email: string;
    website: string;
    about: string;
  };
}

interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, 'id'>) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  getJob: (id: string) => Job | undefined;
  applyToJob: (jobId: string, studentId: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

interface JobProviderProps {
  children: ReactNode;
}

export const JobProvider: React.FC<JobProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const addJob = (job: Omit<Job, 'id'>) => {
    const newJob: Job = {
      ...job,
      id: Math.random().toString(36).substr(2, 9),
    };
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const updateJob = (id: string, updatedJob: Partial<Job>) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, ...updatedJob } : job
      )
    );
  };

  const deleteJob = (id: string) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const getJob = (id: string) => {
    return jobs.find((job) => job.id === id);
  };

  const applyToJob = (jobId: string, studentId: string) => {
    // In a real app, this would make an API call to record the application
    console.log(`Student ${studentId} applied to job ${jobId}`);
  };

  const value = {
    jobs,
    addJob,
    updateJob,
    deleteJob,
    getJob,
    applyToJob,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}; 