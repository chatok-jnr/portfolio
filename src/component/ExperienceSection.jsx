import React, { useState } from 'react';
import { Briefcase, Info, MessageSquare } from 'lucide-react';
import brainStationLogo from '../assets/experience_images/intern_at_bs23.png';
import uitsLogo from '../assets/experience_images/programming_mentor_at_uits.png';

const ExperienceSection = ({ cardRipples, handleCardMouseMove, handleCardMouseLeave }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="experience" className="min-h-[40vh] flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">
          <Briefcase className="inline mr-2 sm:mr-3 w-8 h-8 sm:w-12 sm:h-12" />
          Experience
        </h2>
        <div
          className="glass glow p-6 sm:p-12 transition-all relative overflow-hidden group flex flex-col cursor-pointer"
          onMouseMove={e => handleCardMouseMove && handleCardMouseMove(e, 'experience')}
          onMouseLeave={() => handleCardMouseLeave && handleCardMouseLeave('experience')}
          style={{
            transform: cardRipples && cardRipples['experience']?.active
              ? `perspective(1000px) rotateX(${(cardRipples['experience'].y - 50) * 0.05}deg) rotateY(${(cardRipples['experience'].x - 50) * 0.05}deg)`
              : 'none',
            transition: 'transform 0.1s ease-out',
            backgroundImage: `url(${brainStationLogo})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 text-left">
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow">Brain Station 23</h3>
            </div>
            <div className="flex-1 text-right">
              <span className="inline-block bg-blue-600/80 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">Dec 2026</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 text-left">
            <div className="flex-1">
              <span className="text-lg sm:text-xl text-white font-semibold">Intern as Backend Developer</span>
            </div>
            <div className="flex-1 text-right"></div>
          </div>
          <div className="flex flex-row justify-between items-end mt-4">
            <div></div>
            <button
              onClick={e => {
                e.stopPropagation();
                setShowDetails(true);
              }}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-white/20 hover:border-white/50 flex items-center gap-2"
            >
              <Info size={16} />
              Details
            </button>
          </div>
          <div className="text-right mt-4">
            <span className="text-white/80 text-sm">Duration: 2 weeks</span>
          </div>
        </div>

        {/* Details Modal */}
        {showDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="glass glow max-w-2xl w-full p-8 sm:p-12 relative animate-fade-in">
              <button
                className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-red-400 transition-colors"
                onClick={() => setShowDetails(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Internship at Brain Station 23</h3>
              <div className="mb-4 text-left flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <span className="inline-block bg-blue-600/80 text-white text-xs font-semibold px-3 py-1 rounded-full shadow mr-2">Dec 2026</span>
                <span className="text-lg sm:text-xl text-white font-semibold ml-2">Backend Developer</span>
              </div>
              <p className="text-white mb-4 text-left">I completed a 2-week internship as a backend developer and contributed to the <span className="font-semibold">BiteNow</span> project.</p>
              
              <div className="text-left">
                <h4 className="text-xl font-bold text-white mb-3">Key Contributions:</h4>
                <ul className="text-white space-y-2 list-none">
                  <li className="flex items-start">
                    <span className="mr-2 text-white">•</span>
                    <span>Worked with <strong className="text-white">MERN stack</strong> (MongoDB, Express.js, React, Node.js) to build full-stack features</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-white">•</span>
                    <span>Created <strong className="text-white">15+ RESTful API endpoints</strong> for various features including user management, orders, and restaurant operations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-white">•</span>
                    <span>Implemented <strong className="text-white">JWT authentication</strong> and <strong className="text-white">Google OAuth</strong> integration for secure user authentication</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-white">•</span>
                    <span>Developed role-based access control (RBAC) system for multi-role user management</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-right mt-6">
                <span className="text-white/80 text-sm">Duration: 2 weeks</span>
              </div>
            </div>
          </div>
        )}

        {/* Mentorship & Community Section */}
        <div 
          className="glass glow p-6 sm:p-8 mt-8 transition-all relative overflow-hidden"
          onMouseMove={e => handleCardMouseMove && handleCardMouseMove(e, 'mentorship')}
          onMouseLeave={() => handleCardMouseLeave && handleCardMouseLeave('mentorship')}
          style={{
            transform: cardRipples && cardRipples['mentorship']?.active 
              ? `perspective(1000px) rotateX(${(cardRipples['mentorship'].y - 50) * 0.05}deg) rotateY(${(cardRipples['mentorship'].x - 50) * 0.05}deg)`
              : 'none',
            transition: 'transform 0.1s ease-out',
            backgroundImage: `url(${uitsLogo})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }}
        >
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
};

export default ExperienceSection;
