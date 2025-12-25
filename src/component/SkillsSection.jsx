import React from 'react';
import { Code2 } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const SkillsSection = ({ skills = {} }) => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const [isMobile, setIsMobile] = React.useState(false);
  const [ripples, setRipples] = React.useState({});

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e, key) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setRipples(prev => ({
      ...prev,
      [key]: { x, y, active: true }
    }));
  };

  const handleMouseLeave = (key) => {
    setRipples(prev => ({
      ...prev,
      [key]: { ...prev[key], active: false }
    }));
  };

  // Skill icons mapping
  const skillIcons = {
    'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    'Mongoose': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'OOP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/objectivec/objectivec-plain.svg',
    'Algorithms': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'Problem Solving': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codepen/codepen-plain.svg',
    'DSA': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-line.svg',
    'Linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    'Git/Github': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'MongoDB Compass': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg'
  };

  const categoryTitles = {
    languages: 'Languages',
    language: 'Languages',
    frameworks: 'Frameworks',
    framework: 'Frameworks',
    database: 'Database',
    databases: 'Database',
    db: 'Database',
    concepts: 'Concepts',
    tools: 'Tools',
    tool: 'Tools'
  };

  const entries = Object.entries(skills);

  return (
    <section 
      ref={elementRef}
      id="skills" 
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative ${
        isMobile
          ? ''
          : `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`
      }`}
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">
          <Code2 className="inline mr-2 sm:mr-3 w-8 h-8 sm:w-12 sm:h-12" />
          Skills & Technologies
        </h2>

        <div className="space-y-8">
          {entries.map(([category, items], index) => {
            const key = String(category).toLowerCase();
            const title = categoryTitles[key] || category.charAt(0).toUpperCase() + category.slice(1);
            const isConcepts = key === 'concepts' || key === 'concept';
            
            return (
              <div key={category} className={`w-full max-w-5xl mx-auto ${isMobile ? 'px-4' : 'pl-16 sm:pl-32'}`}>
                {isMobile ? (
                  // Mobile Layout: Title on top, skills below in rows of 3
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-white text-center">{title}</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {items.map((item) => {
                        const itemKey = `${category}-${item}`;
                        return (
                        <div
                          key={item}
                          className="group cursor-default transition-all duration-200 hover:scale-110 flex flex-col items-center relative overflow-hidden"
                          title={item}
                          onMouseMove={(e) => handleMouseMove(e, itemKey)}
                          onMouseLeave={() => handleMouseLeave(itemKey)}
                          style={{
                            transform: ripples[itemKey]?.active 
                              ? `perspective(1000px) rotateX(${(ripples[itemKey].y - 50) * 0.1}deg) rotateY(${(ripples[itemKey].x - 50) * 0.1}deg)`
                              : 'none',
                            transition: 'transform 0.1s ease-out'
                          }}
                        >
                          {isConcepts ? (
                            <div className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-lg transition-all duration-200 hover:bg-white/20">
                              <p className="text-xs text-white font-semibold text-center leading-tight px-1">{item}</p>
                            </div>
                          ) : (
                            <>
                              <div className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-lg p-3 transition-all duration-200 hover:bg-white/20">
                                <img 
                                  src={skillIcons[item] || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg'} 
                                  alt={item}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <p className="text-xs text-white text-center mt-2 opacity-80">{item}</p>
                            </>
                          )}
                        </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  // Desktop Layout: Side-by-side
                  <div className="flex flex-row items-center gap-4 sm:gap-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-white w-[140px] sm:w-[160px] text-right flex-shrink-0">{title}</h3>
                    <div className="flex flex-wrap gap-4 sm:gap-6 flex-1">
                      {items.map((item) => {
                        const itemKey = `${category}-${item}`;
                        return (
                        <div
                          key={item}
                          className="group cursor-default transition-all duration-200 hover:scale-110 relative overflow-hidden"
                          title={item}
                          onMouseMove={(e) => handleMouseMove(e, itemKey)}
                          onMouseLeave={() => handleMouseLeave(itemKey)}
                          style={{
                            transform: ripples[itemKey]?.active 
                              ? `perspective(1000px) rotateX(${(ripples[itemKey].y - 50) * 0.1}deg) rotateY(${(ripples[itemKey].x - 50) * 0.1}deg)`
                              : 'none',
                            transition: 'transform 0.1s ease-out'
                          }}
                        >
                          {isConcepts ? (
                            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white/10 rounded-lg transition-all duration-200 hover:bg-white/20">
                              <p className="text-xs sm:text-sm text-white font-semibold text-center leading-tight">{item}</p>
                            </div>
                          ) : (
                            <>
                              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white/10 rounded-lg p-3 transition-all duration-200 hover:bg-white/20">
                                <img 
                                  src={skillIcons[item] || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg'} 
                                  alt={item}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <p className="text-xs text-white text-center mt-2 opacity-80">{item}</p>
                            </>
                          )}
                        </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
