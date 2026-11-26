import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Navbar from '../../components/portfolio/Navbar';
import HeroSection from '../../components/portfolio/HeroSection';
import AboutSection from '../../components/portfolio/AboutSection';
import ProjectsSection from '../../components/portfolio/ProjectsSection';
import SkillsSection from '../../components/portfolio/SkillsSection';
import CertificatesSection from '../../components/portfolio/CertificatesSection';
import ExperienceSection from '../../components/portfolio/ExperienceSection';
import EducationSection from '../../components/portfolio/EducationSection';
import ContactSection from '../../components/portfolio/ContactSection';
// Footer removed
import GuidedTour from '../../components/portfolio/GuidedTour';
import AuroraBackground from '../../components/portfolio/AuroraBackground';
import ScrollProgress from '../../components/portfolio/ScrollProgress';
import CursorGlow from '../../components/portfolio/CursorGlow';
import Preloader from '../../components/portfolio/Preloader';
import { Compass, Loader2 } from 'lucide-react';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    profile: null,
    projects: [],
    skills: [],
    certificates: [],
    experiences: [],
    educations: [],
    socialLinks: [],
    settings: {},
    tour: { enabled: true, steps: [] },
  });
  const [tourTrigger, setTourTrigger] = useState(0);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          profileRes,
          projectsRes,
          skillsRes,
          certRes,
          expRes,
          eduRes,
          socialRes,
          settingsRes,
          tourRes,
        ] = await Promise.all([
          api.get('/profile').catch(() => ({ data: { data: null } })),
          api.get('/projects').catch(() => ({ data: { data: [] } })),
          api.get('/skills').catch(() => ({ data: { data: [] } })),
          api.get('/certificates').catch(() => ({ data: { data: [] } })),
          api.get('/experiences').catch(() => ({ data: { data: [] } })),
          api.get('/educations').catch(() => ({ data: { data: [] } })),
          api.get('/social-links').catch(() => ({ data: { data: [] } })),
          api.get('/site-settings').catch(() => ({ data: { data: {} } })),
          api.get('/guided-tour').catch(() => ({ data: { enabled: true, steps: [] } })),
        ]);

        setData({
          profile: profileRes.data.data,
          projects: projectsRes.data.data || [],
          skills: skillsRes.data.data || [],
          certificates: certRes.data.data || [],
          experiences: expRes.data.data || [],
          educations: eduRes.data.data || [],
          socialLinks: socialRes.data.data || [],
          settings: settingsRes.data.data || {},
          tour: tourRes.data || { enabled: true, steps: [] },
        });

        // Track page view event
        const deviceType = window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop';
        api.post('/analytics/page-view', {
          path: window.location.pathname,
          referrer: document.referrer || 'direct',
          device: deviceType,
        }).catch(() => {});
      } catch (err) {
        console.error('Error fetching portfolio data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleStartTour = () => {
    setTourTrigger((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100">
        <div className="relative mb-5 flex h-16 w-16 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-blue-500/30" />
          <span className="absolute inset-0 animate-spin-slow rounded-full border-2 border-transparent border-t-blue-400" />
          <Loader2 className="w-7 h-7 text-blue-500 animate-spin" />
        </div>
        <p className="text-sm font-semibold tracking-wide text-slate-400">
          Memuat Portofolio...
        </p>
      </div>
    );
  }

  return (
    <>
      <Preloader name={data.profile?.name} />
      <CursorGlow />
      <div className="relative min-h-screen overflow-x-hidden">
        <AuroraBackground />
        <ScrollProgress />

        <div className="relative z-10">
          {/* Navigation */}
          <Navbar
            onStartTour={handleStartTour}
            siteTitle={data.settings?.site_title}
          />

          {/* Main Content Sections */}
          <main>
            <HeroSection
              profile={data.profile}
              settings={data.settings}
              socialLinks={data.socialLinks}
            />
            <AboutSection
              profile={data.profile}
              stats={{
                projects: data.projects.length,
                certificates: data.certificates.length,
                experiences: data.experiences.length,
                gpa: data.educations?.[0]?.gpa,
              }}
            />
            <ProjectsSection projects={data.projects} />
            <SkillsSection skillCategories={data.skills} />
            <CertificatesSection certificates={data.certificates} />
            <ExperienceSection experiences={data.experiences} />
            <EducationSection educations={data.educations} />
            <ContactSection
              profile={data.profile}
              socialLinks={data.socialLinks}
            />
          </main>

          {/* Floating Guided Tour Button */}
          <button
            onClick={handleStartTour}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-2xl shadow-blue-600/50 hover:scale-105 active:scale-95 transition-all relative"
            title="Buka Interaktif Tour"
          >
            <span className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
            <Compass className="relative w-4 h-4 animate-spin-slow" />
            <span className="relative hidden sm:inline">Panduan Tour</span>
          </button>

          {/* Guided Tour Driver Component */}
          <GuidedTour
            steps={data.tour.steps}
            enabled={data.tour.enabled}
            triggerTour={tourTrigger}
            onTourComplete={() => {}}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
