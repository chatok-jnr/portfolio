import React from 'react';
import { Briefcase, ExternalLink } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function ProjectsSection({ projects = [], onOpen }) {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section 
      ref={elementRef}
      id="projects" 
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative ${
        isMobile
          ? ''
          : ''
      }`}
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">
          {!isMobile && <Briefcase className="inline mr-2 sm:mr-3 w-8 h-8 sm:w-12 sm:h-12" />}
          Projects
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              onClick={() => onOpen && onOpen(project)}
              className="cursor-pointer glass glow p-8 group transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-2 transition-colors">{project.title}</h3>
              <p className="text-white text-sm mb-4 font-semibold">{project.tech}</p>
              <p className="text-white mb-4 leading-relaxed">{project.short}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.highlights.map((h, i) => (
                  <span key={i} className="px-3 py-1 bg-black text-white rounded-full text-xs border border-white font-semibold">
                    {h}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 text-white hover:text-white transition-all font-bold group-hover:gap-3"
              >
                View Project {!isMobile && <span>🚀</span>}
                {!isMobile && <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
