import React from 'react';
import { Briefcase, ExternalLink, Code, Info } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function ProjectsSection({ projects = [], onOpen }) {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const [isMobile, setIsMobile] = React.useState(false);
  const [ripples, setRipples] = React.useState({});

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e, idx) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setRipples(prev => ({
      ...prev,
      [idx]: { x, y, active: true }
    }));
  };

  const handleMouseLeave = (idx) => {
    setRipples(prev => ({
      ...prev,
      [idx]: { ...prev[idx], active: false }
    }));
  };

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
      <div className="max-w-7xl w-full">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">
          {!isMobile && <Briefcase className="inline mr-2 sm:mr-3 w-8 h-8 sm:w-12 sm:h-12" />}
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="cursor-pointer glass glow p-6 transition-all duration-300 group flex flex-col relative overflow-hidden"
              onClick={() => onOpen && onOpen(project)}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              style={{
                transform: ripples[idx]?.active 
                  ? `perspective(1000px) rotateX(${(ripples[idx].y - 50) * 0.1}deg) rotateY(${(ripples[idx].x - 50) * 0.1}deg)`
                  : 'none',
                transition: 'transform 0.1s ease-out'
              }}
            >
              {/* Project Image */}
              <div className="w-full h-48 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center relative overflow-hidden rounded-lg mb-4">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-white text-6xl font-bold opacity-20">
                    {project.title.charAt(0)}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-grow flex flex-col">
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-auto">
                  {project.highlights.map((h, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-0.5 bg-black text-white rounded-full text-[10px] border border-white font-semibold"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.projectLink && (
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg text-xs font-semibold transition-all duration-300 hover:bg-white/20 hover:border-white/50 flex items-center gap-1.5"
                    >
                      <ExternalLink size={14} />
                      View Project
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg text-xs font-semibold transition-all duration-300 hover:bg-white/20 hover:border-white/50 flex items-center gap-1.5"
                    >
                      <Code size={14} />
                      View Code
                    </a>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpen && onOpen(project);
                    }}
                    className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg text-xs font-semibold transition-all duration-300 hover:bg-white/20 hover:border-white/50 flex items-center gap-1.5"
                  >
                    <Info size={14} />
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
