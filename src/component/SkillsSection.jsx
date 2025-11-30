import React from 'react';
import { Code2 } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function SkillsSection({ skills = {} }) {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.15 });

  const iconMap = {
    languages: '💻',
    language: '💻',
    frameworks: '🧩',
    framework: '🧩',
    database: '🗄️',
    databases: '🗄️',
    db: '🗄️',
    concepts: '🎓',
    tools: '🛠️',
    cloud: '☁️',
  };

  const entries = Object.entries(skills);

  return (
    <section 
      ref={elementRef}
      id="skills" 
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl sm:text-5xl font-bold text-emerald-400 mb-8 sm:mb-12 text-center">
          <Code2 className="inline mr-2 sm:mr-3 w-8 h-8 sm:w-12 sm:h-12" />
          Skills & Technologies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {entries.map(([category, items], index) => {
            const key = String(category).toLowerCase();
            const icon = iconMap[key] || '🔹';
            const title = category.charAt(0).toUpperCase() + category.slice(1);
            return (
              <div 
                key={category} 
                className="glass glow p-6 text-center transition-all duration-300 group"
              >
                <div className="text-5xl mb-4 transition-transform duration-300" style={{animation: 'float 6s ease-in-out infinite'}}>{icon}</div>
                <h3 className="text-lg font-bold text-emerald-400 mb-3 group-hover:text-emerald-300">{title}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-300 rounded-full text-xs border border-emerald-400/40 font-semibold cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
