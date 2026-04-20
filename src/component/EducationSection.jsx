import React from 'react';
import { GraduationCap } from 'lucide-react';

const EducationSection = ({ cardRipples, handleCardMouseMove, handleCardMouseLeave }) => {
  return (
    <section id="education" className="min-h-[40vh] flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">
          <GraduationCap className="inline mr-2 sm:mr-3 w-8 h-8 sm:w-12 sm:h-12" />
          Education
        </h2>

        <div
          className="glass glow p-6 sm:p-12 transition-all relative overflow-hidden text-left"
          onMouseMove={e => handleCardMouseMove && handleCardMouseMove(e, 'education')}
          onMouseLeave={() => handleCardMouseLeave && handleCardMouseLeave('education')}
          style={{
            transform: cardRipples && cardRipples['education']?.active
              ? `perspective(1000px) rotateX(${(cardRipples['education'].y - 50) * 0.05}deg) rotateY(${(cardRipples['education'].x - 50) * 0.05}deg)`
              : 'none',
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="flex flex-col sm:flex-row sm:flex-nowrap sm:items-start sm:justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">University of Information Technology & Sciences</h3>
              <p className="text-white/90 mt-2 text-lg sm:text-xl">Department of CSE</p>
            </div>
            <span className="inline-block bg-blue-600/80 text-white text-xs font-semibold px-3 py-1 rounded-full shadow self-start sm:flex-shrink-0 whitespace-nowrap">
              Expected Graduation: June 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
