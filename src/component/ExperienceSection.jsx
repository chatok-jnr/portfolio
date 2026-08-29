import React, { useState } from 'react';
import { Briefcase, Info } from 'lucide-react';
import brainStationLogo from '../assets/experience_images/intern_at_bs23.png';
import maktechLogo from '../assets/experience_images/intern_at_maktech.jpg'; 

const experiences = [
  {
    id: 'maktech',
    company: 'Maktech',
    role: 'Backend Developer Intern (MERN)',
    badge: 'Jul 2026 – Present',
    duration: 'Ongoing',
    logo: maktechLogo,
    project: null,
    summary: 'I\'m currently interning as a backend developer, working on authentication, payments, and API infrastructure.',
    contributions: [
      <>Built <strong className="text-white">JWT-based auth</strong> with access/refresh token rotation and role-based authorization</>,
      <>Integrated <strong className="text-white">Stripe payments</strong>, including webhook handling and subscription billing</>,
      <>Designed relational <strong className="text-white">PostgreSQL schemas via Prisma ORM</strong> with nested writes and migrations</>,
      <>Implemented per-user/IP <strong className="text-white">API rate limiting</strong> with proper HTTP headers to prevent abuse</>,
    ],
  },
  {
    id: 'brainstation',
    company: 'Brain Station 23',
    role: 'Intern as Backend Developer',
    badge: 'Dec 2025',
    duration: 'Duration: 2 weeks',
    logo: brainStationLogo,
    project: 'BiteNow',
    summary: 'I completed a 2-week internship as a backend developer and contributed to the BiteNow project.',
    contributions: [
      <>Worked with <strong className="text-white">MERN stack</strong> (MongoDB, Express.js, React, Node.js) to build full-stack features</>,
      <>Created <strong className="text-white">15+ RESTful API endpoints</strong> for various features including user management, orders, and restaurant operations</>,
      <>Implemented <strong className="text-white">JWT authentication</strong> and <strong className="text-white">Google OAuth</strong> integration for secure user authentication</>,
      <>Developed role-based access control (RBAC) system for multi-role user management</>,
    ],
  },
];

const ExperienceSection = ({ cardRipples, handleCardMouseMove, handleCardMouseLeave }) => {
  const [openDetailsId, setOpenDetailsId] = useState(null);
  const activeExperience = experiences.find(exp => exp.id === openDetailsId);

  return (
    <section id="experience" className="min-h-[40vh] flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative">
      <div className="max-w-4xl w-full mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">
          <Briefcase className="inline mr-2 sm:mr-3 w-8 h-8 sm:w-12 sm:h-12" />
          Experience
        </h2>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <article
              key={exp.id}
              className="experience-entry"
              onMouseMove={e => handleCardMouseMove && handleCardMouseMove(e, exp.id)}
              onMouseLeave={() => handleCardMouseLeave && handleCardMouseLeave(exp.id)}
            >
              <div className="experience-node" aria-hidden="true">
                <span>{index + 1}</span>
              </div>
              <div
                className="glass experience-card p-5 sm:p-7 text-left"
                style={{
                  transform: cardRipples && cardRipples[exp.id]?.active
                    ? `perspective(1000px) rotateX(${(cardRipples[exp.id].y - 50) * 0.05}deg) rotateY(${(cardRipples[exp.id].x - 50) * 0.05}deg)`
                    : 'none',
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="experience-logo shrink-0" aria-label={`${exp.company} logo`}>
                    <img src={exp.logo} alt="" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">{exp.role}</h3>
                        <p className="text-white/75 font-medium mt-1">{exp.company}</p>
                      </div>
                      <span className="self-start bg-blue-600/80 text-white text-xs font-semibold px-3 py-1 rounded-full shadow whitespace-nowrap">{exp.badge}</span>
                    </div>
                    <div className="flex flex-col items-start gap-3 mt-5 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-white/60 text-sm">{exp.duration}</span>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setOpenDetailsId(exp.id);
                        }}
                        className="w-full sm:w-auto px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-white/20 hover:border-white/50 flex items-center justify-center gap-2"
                      >
                        <Info size={16} />
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Details Modal */}
        {activeExperience && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="glass glow max-w-2xl w-full p-8 sm:p-12 relative animate-fade-in">
              <button
                className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-red-400 transition-colors"
                onClick={() => setOpenDetailsId(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {activeExperience.company === 'Brain Station 23' ? 'Internship at Brain Station 23' : `Internship at ${activeExperience.company}`}
              </h3>
              <div className="mb-4 text-left flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <span className="inline-block bg-blue-600/80 text-white text-xs font-semibold px-3 py-1 rounded-full shadow mr-2">{activeExperience.badge}</span>
                <span className="text-lg sm:text-xl text-white font-semibold ml-2">{activeExperience.role}</span>
              </div>
              <p className="text-white mb-4 text-left">
                {activeExperience.summary}
              </p>

              <div className="text-left">
                <h4 className="text-xl font-bold text-white mb-3">Key Contributions:</h4>
                <ul className="text-white space-y-2 list-none">
                  {activeExperience.contributions.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-white">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-right mt-6">
                <span className="text-white/80 text-sm">{activeExperience.duration}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
