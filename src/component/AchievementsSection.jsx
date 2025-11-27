import React from 'react';
import { Award, ExternalLink, MessageSquare } from 'lucide-react';

export default function AchievementsSection({ achievements = [], onOpen }) {
  return (
    <section id="achievements" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 bg-gray-900/30 relative">
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl sm:text-5xl font-bold text-emerald-400 mb-8 sm:mb-12 text-center">
          <Award className="inline mr-2 sm:mr-3 w-8 h-8 sm:w-12 sm:h-12" />
          Achievements & Awards
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {achievements.map((achievement, idx) => (
            <div
              key={idx}
              onClick={() => onOpen && onOpen(achievement)}
              className="cursor-pointer glass glow p-6 text-center transition-all duration-300 group"
            >
              <div className="text-5xl mb-4 transition-transform duration-300" style={{animation: 'float 5s ease-in-out infinite'}}>{achievement.icon}</div>
              <h3 className="text-lg font-bold text-emerald-400 mb-2 group-hover:text-emerald-300">{achievement.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{achievement.short}</p>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {(achievement.highlights || []).map((h, i) => (
                  <span key={i} className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-300 rounded-full text-xs border border-emerald-400/40 font-semibold">
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
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-all font-bold group-hover:gap-3"
                >
                  Learn More 🏆
                  <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="glass glow p-8 mt-12 transition-all">
          <h3 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-3">
            <MessageSquare size={28} />
            👨‍🏫 Mentorship & Community
          </h3>
          <p className="text-gray-300 leading-relaxed text-lg">
            Regularly mentor junior students in Competitive Programming, organizing problem-solving sessions
            and guiding them through algorithmic concepts to improve their logical reasoning and contest performance.
          </p>
        </div>
      </div>
    </section>
  );
}
