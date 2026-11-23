import React, { useState, useEffect } from 'react';
import {
  Layers,
  ExternalLink,
  Eye,
  X,
  Star,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Image as ImageIcon,
} from 'lucide-react';
import { Github } from '../common/Icons';

const INITIAL_LIMIT = 3;

const ProjectsSection = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [fullscreenLightbox, setFullscreenLightbox] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const categories = React.useMemo(() => {
    const set = new Set(['All']);
    projects?.forEach((p) => {
      p.skills?.forEach((s) => {
        if (s.name) set.add(s.name);
      });
    });
    return Array.from(set).slice(0, 6);
  }, [projects]);

  const filteredProjects = React.useMemo(() => {
    if (!projects) return [];
    if (selectedCategory === 'All') return projects;
    return projects.filter((p) => p.skills?.some((s) => s.name === selectedCategory));
  }, [projects, selectedCategory]);

  // Show all if filter active or showAll = true; else limit
  const visibleProjects = (showAll || selectedCategory !== 'All')
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_LIMIT);

  const hasMore = selectedCategory === 'All' && filteredProjects.length > INITIAL_LIMIT;

  // Active Project Images
  const projectImages = React.useMemo(() => {
    if (!activeModalProject) return [];
    if (activeModalProject.images && activeModalProject.images.length > 0) {
      return activeModalProject.images;
    }
    if (activeModalProject.thumbnail_url) {
      return [
        {
          id: 'thumb',
          image_url: activeModalProject.thumbnail_url,
          caption: activeModalProject.title,
        },
      ];
    }
    return [];
  }, [activeModalProject]);

  const currentImage = projectImages[activeImageIndex] || projectImages[0];

  const handleOpenModal = (project) => {
    setActiveModalProject(project);
    setActiveImageIndex(0);
  };

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : projectImages.length - 1));
  };

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev < projectImages.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!fullscreenLightbox && !activeModalProject) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (fullscreenLightbox) setFullscreenLightbox(false);
        else setActiveModalProject(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenLightbox, activeModalProject, projectImages.length]);

  return (
    <section id="projects-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <Layers className="w-3.5 h-3.5" />
          <span>Karya & Portofolio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Proyek Terpilih yang Pernah Saya Bangun
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
          Implementasi perangkat lunak nyata dengan kode bersih, database terstruktur, dan pengalaman pengguna yang optimal.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setShowAll(false); }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-reveal-stagger">
        {visibleProjects.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            {/* Project Thumbnail Image */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
              <img
                src={project.thumbnail_url || 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800'}
                alt={project.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />

              {/* Status / Featured Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {project.is_featured && (
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-bold shadow-sm">
                    <Star className="w-3 h-3 fill-white" /> Featured
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[11px] font-semibold backdrop-blur-sm">
                  {project.status || 'Completed'}
                </span>
              </div>

              {/* Photos count badge */}
              {project.images?.length > 1 && (
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-sm text-white text-[11px] font-semibold flex items-center gap-1 shadow">
                  <ImageIcon className="w-3 h-3 text-blue-400" />
                  <span>{project.images.length} Foto</span>
                </div>
              )}

              {/* Quick View Button on Hover */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => handleOpenModal(project)}
                  className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-slate-100 transition-all"
                >
                  <Eye className="w-4 h-4 text-blue-600" /> Detail & Galeri
                </button>
              </div>
            </div>

            {/* Card Content */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {project.summary || project.description}
                </p>
              </div>

              {/* Tech Stack Tags */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.skills?.slice(0, 4).map((skill) => (
                    <span
                      key={skill.id}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold"
                    >
                      {skill.name}
                    </span>
                  ))}
                  {project.skills?.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 text-[11px] font-medium">
                      +{project.skills.length - 4}
                    </span>
                  )}
                </div>

                {/* Action Links */}
                <div className="flex items-center justify-between text-xs font-bold">
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>Lihat Selengkapnya</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Repository Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Less Button */}
      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            {showAll ? (
              <><ChevronUp className="w-4 h-4" /> Tutup</>
            ) : (
              <><ChevronDown className="w-4 h-4" /> Lihat Semua {filteredProjects.length} Proyek</>
            )}
          </button>
        </div>
      )}

      {/* Project Detail Modal with Full Gallery & Lightbox */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors z-10"
              title="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gallery Image Viewer */}
            <div className="space-y-3 mb-6">
              <div
                className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 group cursor-pointer"
                onClick={() => setFullscreenLightbox(true)}
              >
                {currentImage ? (
                  <img
                    src={currentImage.image_url}
                    alt={currentImage.caption || activeModalProject.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <ImageIcon className="w-10 h-10" />
                  </div>
                )}

                {/* Lightbox / Zoom hint */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFullscreenLightbox(true);
                    }}
                    className="p-2 rounded-xl bg-slate-950/70 text-white backdrop-blur-sm hover:bg-slate-950 transition-all shadow"
                    title="Buka Gambar Layar Penuh"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Image counter */}
                {projectImages.length > 1 && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/70 text-white backdrop-blur-sm text-xs font-bold shadow">
                    Foto {activeImageIndex + 1} / {projectImages.length}
                  </div>
                )}

                {/* Left & Right Navigation Arrows */}
                {projectImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-sm transition-all shadow opacity-80 hover:opacity-100"
                      title="Gambar Sebelumnya"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-sm transition-all shadow opacity-80 hover:opacity-100"
                      title="Gambar Selanjutnya"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Caption if available */}
              {currentImage?.caption && (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic text-center">
                  {currentImage.caption}
                </p>
              )}

              {/* Thumbnail Strip / Carousel */}
              {projectImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
                  {projectImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-blue-600 scale-105 shadow-md ring-2 ring-blue-500/20'
                          : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.image_url}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {activeModalProject.is_featured && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-bold">
                  Featured Project
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                Status: {activeModalProject.status || 'Completed'}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {activeModalProject.title}
            </h3>

            <div className="mt-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line font-normal">
              {activeModalProject.description || activeModalProject.summary}
            </div>

            {/* Tech Stack */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Teknologi yang Digunakan
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeModalProject.skills?.map((s) => (
                  <span
                    key={s.id}
                    className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            {/* External Links */}
            <div className="mt-8 flex items-center gap-3 pt-5 border-t border-slate-100 dark:border-slate-800">
              {activeModalProject.demo_url && (
                <a
                  href={activeModalProject.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Buka Live Demo
                </a>
              )}
              {activeModalProject.repo_url && (
                <a
                  href={activeModalProject.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  <Github className="w-3.5 h-3.5" /> Buka Repository
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {fullscreenLightbox && currentImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setFullscreenLightbox(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setFullscreenLightbox(false)}
            className="absolute top-6 right-6 p-2 rounded-full text-white/80 hover:text-white bg-slate-900/80 hover:bg-slate-900 transition-colors z-20"
            title="Tutup (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          {projectImages.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-all z-20"
                title="Sebelumnya (Panah Kiri)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-all z-20"
                title="Selanjutnya (Panah Kanan)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Large Image with Caption */}
          <div
            className="max-w-[92vw] max-h-[88vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage.image_url}
              alt={currentImage.caption || 'Preview'}
              className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-3 text-center">
              {currentImage.caption && (
                <p className="text-sm font-medium text-white mb-1">
                  {currentImage.caption}
                </p>
              )}
              {projectImages.length > 1 && (
                <p className="text-xs text-slate-400">
                  {activeImageIndex + 1} dari {projectImages.length} foto
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
