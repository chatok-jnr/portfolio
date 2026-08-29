import React from 'react';
import { Code2, Braces, Database, Layers3, ListChecks, Network, ShieldCheck, Workflow } from 'lucide-react';
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

  const skillIcons = {
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'Spring Boot': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
    'Spring Security': ShieldCheck,
    'Spring Data JPA': Database,
    'NestJS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg',
    'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'REST APIs': Network,
    'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'Hibernate (JPA)': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg',
    'Mongoose': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg',
    'Prisma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg',
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'Jira': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
    'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    'DBeaver': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dbeaver/dbeaver-original.svg',
    'Linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    'Data Structures & Algorithms': ListChecks,
    'OOP': Braces,
    'Layered Architecture': Layers3,
    'Agile': Workflow
  };

  const categoryTitles = {
    languages: 'Languages',
    language: 'Languages',
    backend: 'Backend',
    database: 'Database',
    databases: 'Database',
    db: 'Database',
    methodology: 'Methodology',
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
      <div className="max-w-6xl w-full mx-auto">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">
          <Code2 className="inline mr-2 sm:mr-3 w-8 h-8 sm:w-12 sm:h-12" />
          Skills & Technologies
        </h2>

        <div className="space-y-8">
          {entries.map(([category, items], index) => {
            const key = String(category).toLowerCase();
            const title = categoryTitles[key] || category.charAt(0).toUpperCase() + category.slice(1);

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
                          className="group cursor-default transition-all duration-300 hover:scale-125 flex flex-col items-center relative overflow-hidden"
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
                          <div className="w-16 h-16 flex items-center justify-center bg-white/10 p-3 transition-all duration-300 hover:scale-125 hover:bg-white/20">
                            {typeof skillIcons[item] === 'string' ? (
                              <img src={skillIcons[item]} alt="" className="w-full h-full object-contain" />
                            ) : (
                              React.createElement(skillIcons[item], { className: 'w-full h-full text-cyan-300', strokeWidth: 1.5, 'aria-hidden': true })
                            )}
                          </div>
                          <p className="text-xs text-white text-center mt-2 opacity-80 max-w-[7rem] mx-auto leading-tight break-words">{item}</p>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  // Desktop Layout: Side-by-side
                  <div className="flex flex-row items-start gap-4 sm:gap-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-white w-[140px] sm:w-[160px] text-right flex-shrink-0">{title}</h3>
                    <div className="flex flex-wrap gap-4 sm:gap-6 flex-1">
                      {items.map((item) => {
                        const itemKey = `${category}-${item}`;
                        return (
                        <div
                          key={item}
                          className="group cursor-default transition-all duration-300 hover:scale-125 relative overflow-hidden"
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
                          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white/10 p-3 transition-all duration-300 hover:scale-125 hover:bg-white/20">
                            {typeof skillIcons[item] === 'string' ? (
                              <img src={skillIcons[item]} alt="" className="w-full h-full object-contain" />
                            ) : (
                              React.createElement(skillIcons[item], { className: 'w-full h-full text-cyan-300', strokeWidth: 1.5, 'aria-hidden': true })
                            )}
                          </div>
                          <p className="text-xs text-white text-center mt-2 opacity-80 max-w-[7rem] mx-auto leading-tight break-words">{item}</p>
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
