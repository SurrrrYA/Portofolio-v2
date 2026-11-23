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

  // Scroll Reveal Animations via Intersection Observer
  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px -20px 0px',
        }
      );

      const revealElements = document.querySelectorAll(
        '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-reveal-stagger'
      );
      revealElements.forEach((el) => observer.observe(el));
    }, 60);

    return () => clearTimeout(timer);
  }, [loading]);

  const handleStartTour = () => {
    setTourTrigger((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <p className="text-sm font-semibold tracking-wide text-slate-400">
          Memuat Portofolio...
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* Navigation */}
      <Navbar
        onStartTour={handleStartTour}
        siteTitle={data.settings?.site_title}
      />

      {/* Main Content Sections with Scroll Reveal */}
      <main>
        <HeroSection
          profile={data.profile}
          settings={data.settings}
          socialLinks={data.socialLinks}
        />
        <div className="scroll-reveal">
          <AboutSection profile={data.profile} />
        </div>
        <div className="scroll-reveal">
          <ProjectsSection projects={data.projects} />
        </div>
        <div className="scroll-reveal">
          <SkillsSection skillCategories={data.skills} />
        </div>
        <div className="scroll-reveal">
          <CertificatesSection certificates={data.certificates} />
        </div>
        <div className="scroll-reveal">
          <ExperienceSection experiences={data.experiences} />
        </div>
        <div className="scroll-reveal">
          <EducationSection educations={data.educations} />
        </div>
        <div className="scroll-reveal">
          <ContactSection
            profile={data.profile}
            socialLinks={data.socialLinks}
          />
        </div>
      </main>



      {/* Floating Guided Tour Button */}
      <button
        onClick={handleStartTour}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-2xl shadow-blue-600/50 hover:scale-105 active:scale-95 transition-all"
        title="Buka Interaktif Tour"
      >
        <Compass className="w-4 h-4 animate-spin-slow" />
        <span className="hidden sm:inline">Panduan Tour</span>
      </button>

      {/* Guided Tour Driver Component */}
      <GuidedTour
        steps={data.tour.steps}
        enabled={data.tour.enabled}
        triggerTour={tourTrigger}
        onTourComplete={() => {}}
      />
    </div>
  );
};

export default HomePage;
