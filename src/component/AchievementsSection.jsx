import React from 'react';
import { Award, ExternalLink, MessageSquare } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function AchievementsSection({ achievements = [], onOpen }) {
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
              onClick={() => onOpen && onOpen(achievement)}
              className="cursor-pointer glass glow p-6 text-center transition-all duration-300 group"
            >
              {!isMobile && (
                <div className="text-5xl mb-4 transition-transform duration-300" style={{animation: 'float 5s ease-in-out infinite'}}>{achievement.icon}</div>
              )}
              <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
              <p className="text-white text-sm leading-relaxed">{achievement.short}</p>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {(achievement.highlights || []).map((h, i) => (
                  <span key={i} className="px-3 py-1 bg-black text-white rounded-full text-xs border border-white font-semibold">
                    {h}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <a
                  href={achievement.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 text-white hover:text-white transition-all font-bold group-hover:gap-3"
                >
                  Learn More {!isMobile && <span>🏆</span>}
                  {!isMobile && <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="glass glow p-8 mt-12 transition-all">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            {!isMobile && <MessageSquare size={28} />}
            {!isMobile && <span>👨‍🎓</span>} Mentorship & Community
          </h3>
          <p className="text-white leading-relaxed text-lg">
            Regularly mentor junior students in Competitive Programming, organizing problem-solving sessions
            and guiding them through algorithmic concepts to improve their logical reasoning and contest performance.
          </p>
        </div>
      </div>
    </section>
  );
}
