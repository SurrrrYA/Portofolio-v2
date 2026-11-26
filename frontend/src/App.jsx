import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { ScrollDirectionProvider } from './contexts/ScrollDirectionContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';

// Pages
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/admin/LoginPage';
import AdminLayout from './components/layout/AdminLayout';
import DashboardOverview from './pages/admin/DashboardOverview';
import ProfileAdmin from './pages/admin/ProfileAdmin';
import ProjectsAdmin from './pages/admin/ProjectsAdmin';
import SkillsAdmin from './pages/admin/SkillsAdmin';
import CertificatesAdmin from './pages/admin/CertificatesAdmin';
import ExperiencesAdmin from './pages/admin/ExperiencesAdmin';
import EducationsAdmin from './pages/admin/EducationsAdmin';
import SocialLinksAdmin from './pages/admin/SocialLinksAdmin';
import MediaAdmin from './pages/admin/MediaAdmin';
import MessagesAdmin from './pages/admin/MessagesAdmin';
import GuidedTourAdmin from './pages/admin/GuidedTourAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <span className="text-sm font-semibold text-slate-400">Memverifikasi autentikasi...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollDirectionProvider>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Website */}
                <Route path="/" element={<HomePage />} />

                {/* Admin Login */}
                <Route path="/admin/login" element={<LoginPage />} />

                {/* Protected Admin CMS Dashboard */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<DashboardOverview />} />
                  <Route path="profile" element={<ProfileAdmin />} />
                  <Route path="projects" element={<ProjectsAdmin />} />
                  <Route path="skills" element={<SkillsAdmin />} />
                  <Route path="certificates" element={<CertificatesAdmin />} />
                  <Route path="experiences" element={<ExperiencesAdmin />} />
                  <Route path="educations" element={<EducationsAdmin />} />
                  <Route path="social-links" element={<SocialLinksAdmin />} />
                  <Route path="media" element={<MediaAdmin />} />
                  <Route path="messages" element={<MessagesAdmin />} />
                  <Route path="guided-tour" element={<GuidedTourAdmin />} />
                  <Route path="settings" element={<SettingsAdmin />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
      </ScrollDirectionProvider>
    </MotionConfig>
  );
}

export default App;
