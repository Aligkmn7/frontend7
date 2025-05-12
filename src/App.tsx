import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LogProvider } from './context/LogContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { JobProvider } from './context/JobContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import InternshipList from './pages/InternshipList';
import InternshipDetails from './pages/InternshipDetails';
import DailyLog from './pages/DailyLog';
import ApplyNewInternship from './pages/NewInternshipForm'; // Yeni Staj Başvurusu Sayfası
import UniversityDashboard from './pages/UniversityDashboard'; // eğer varsa
import CompanyInterns from './pages/CompanyInterns';
import CompanyInternDetail from './pages/CompanyInternDetail';
import Profile from './pages/Profile';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import PostJob from './pages/PostJob';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <LogProvider>
          <ApplicationProvider>
            <JobProvider>
              <Routes>
                {/* Login Sayfası */}
                <Route path="/" element={<Login />} />

                {/* Öğrenci Paneli */}
                <Route
                  path="/student"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Şirket Paneli */}
                <Route
                  path="/company"
                  element={
                    <ProtectedRoute allowedRoles={['company']}>
                      <CompanyDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Şirket Stajyer Listesi */}
                <Route
                  path="/company/interns"
                  element={
                    <ProtectedRoute allowedRoles={['company']}>
                      <CompanyInterns />
                    </ProtectedRoute>
                  }
                />

                {/* Şirket Stajyer Detay */}
                <Route
                  path="/company/interns/:id"
                  element={
                    <ProtectedRoute allowedRoles={['company']}>
                      <CompanyInternDetail />
                    </ProtectedRoute>
                  }
                />

                {/* Öğrenci Staj Listesi */}
                <Route
                  path="/student/internships"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <InternshipList />
                    </ProtectedRoute>
                  }
                />

                {/* Öğrenci Staj Detayları */}
                <Route
                  path="/student/internships/:id"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <InternshipDetails />
                    </ProtectedRoute>
                  }
                />

                {/* Öğrenci Staj Günlüğü */}
                <Route
                  path="/student/internships/:id/log"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <DailyLog />
                    </ProtectedRoute>
                  }
                />

                {/* Yeni Staj Başvurusu Sayfası */}
                <Route
                  path="/apply-new-internship"
                  element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <ApplyNewInternship />
                    </ProtectedRoute>
                  }
                />
                
                {/* Üniversite Paneli */}
                <Route
                  path="/university"
                  element={
                    <ProtectedRoute allowedRoles={['university']}>
                      <UniversityDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Profil Sayfası */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute allowedRoles={['student', 'company', 'university']}>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* İş İlanları Listesi */}
                <Route
                  path="/job-listings"
                  element={
                    <ProtectedRoute allowedRoles={['student', 'company', 'university']}>
                      <JobListings />
                    </ProtectedRoute>
                  }
                />

                {/* İş İlanı Detayı */}
                <Route
                  path="/job-listings/:id"
                  element={
                    <ProtectedRoute allowedRoles={['student', 'company', 'university']}>
                      <JobDetails />
                    </ProtectedRoute>
                  }
                />

                {/* İş İlanı Paylaşımı */}
                <Route
                  path="/company/post-job"
                  element={
                    <ProtectedRoute allowedRoles={['company']}>
                      <PostJob />
                    </ProtectedRoute>
                  }
                />

                {/* Geçersiz rotalar için yönlendirme */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </JobProvider>
          </ApplicationProvider>
        </LogProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
