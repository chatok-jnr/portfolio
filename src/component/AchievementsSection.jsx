import React from 'react';
import { Award, ExternalLink, Info } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function AchievementsSection({ achievements = [], onOpen }) {
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
      id="achievements" 
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative ${
        isMobile
          ? ''
          : ''
      }`}
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">
          {!isMobile && <Award className="inline mr-2 sm:mr-3 w-8 h-8 sm:w-12 sm:h-12" />}
          Achievements & Awards
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-10 sm:gap-y-8 sm:gap-x-12">
          {achievements.map((achievement, idx) => (
            <div
              key={idx}
              className="cursor-pointer glass glow p-6 text-center transition-all duration-300 group flex flex-col relative overflow-hidden"
              onClick={() => onOpen && onOpen(achievement)}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              style={{
                transform: ripples[idx]?.active 
                  ? `perspective(1000px) rotateX(${(ripples[idx].y - 50) * 0.1}deg) rotateY(${(ripples[idx].x - 50) * 0.1}deg)`
                  : 'none',
                transition: 'transform 0.1s ease-out'
              }}
            >
              
              {!isMobile && (
                <div className="text-5xl mb-4 transition-transform duration-300 relative z-10" style={{animation: 'float 5s ease-in-out infinite'}}>{achievement.icon}</div>
              )}
              <h3 className="text-lg font-bold text-white mb-2 relative z-10">{achievement.title}</h3>
              <p className="text-white text-sm leading-relaxed relative z-10">{achievement.short}</p>
              <div className="flex flex-wrap gap-1.5 mt-4 justify-center mb-auto relative z-10">
                {(achievement.highlights || []).map((h, i) => (
                  <span key={i} className="px-2 py-0.5 bg-black text-white rounded-full text-[10px] border border-white font-semibold">
                    {h}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-4 relative z-10">
                {achievement.link && (
                  <a
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg text-xs font-semibold transition-all duration-300 hover:bg-white/20 hover:border-white/50 flex items-center gap-1.5"
                  >
                    <ExternalLink size={14} />
                    Open Link
                  </a>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen && onOpen(achievement);
                  }}
                  className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg text-xs font-semibold transition-all duration-300 hover:bg-white/20 hover:border-white/50 flex items-center gap-1.5"
                >
                  <Info size={14} />
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
