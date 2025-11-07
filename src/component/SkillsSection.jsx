import React from 'react';
import { Code2 } from 'lucide-react';

export default function SkillsSection({ skills = {} }) {
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
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl sm:text-5xl font-bold text-emerald-400 mb-8 sm:mb-12 text-center">
          <Code2 className="inline mr-2 sm:mr-3 w-8 h-8 sm:w-12 sm:h-12" />
          Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {entries.map(([category, items]) => {
            const key = String(category).toLowerCase();
            const icon = iconMap[key] || '🔹';
            const title = category.charAt(0).toUpperCase() + category.slice(1);
            return (
              <div key={category} className="glass glow p-6 text-center">
                <div className="text-5xl mb-4">{icon}</div>
                <h3 className="text-lg font-bold text-emerald-400 mb-3">{title}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs border border-emerald-500/20"
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
