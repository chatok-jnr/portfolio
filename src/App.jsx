import React, { useState, useEffect, Suspense } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Award, Briefcase, GraduationCap, MessageSquare, X, Facebook, Instagram } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import StatsSection from './component/StatsSection';

const ProjectsSection = React.lazy(() => import('./component/ProjectsSection'));
const AchievementsSection = React.lazy(() => import('./component/AchievementsSection'));
const SkillsSection = React.lazy(() => import('./component/SkillsSection'));

export default function App() {
  const [typedText, setTypedText] = useState('');
  const [typedRole, setTypedRole] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const firstName = "Hello, I am ";
  const lastName = "CHA70K JUNIOR";
  const roles = ["Competitive Programmer", "Back-end Developer"];

  useEffect(() => {
    let nameIndex = 0;
    let currentRole = 0;
    let roleIndex = 0;
    let isDeleting = false;
    let nameInterval;
    let roleInterval;
    let cursorInterval;
    
    // Type the name first
    nameInterval = setInterval(() => {
      const fullName = firstName + lastName;
      if (nameIndex <= fullName.length) {
        setTypedText(fullName.slice(0, nameIndex));
        nameIndex++;
      } else {
        clearInterval(nameInterval);
        
        // Start typing roles after name is complete
        roleInterval = setInterval(() => {
          if (!isDeleting) {
            if (roleIndex <= roles[currentRole].length) {
              setTypedRole(roles[currentRole].slice(0, roleIndex));
              roleIndex++;
            } else {
              // Pause before deleting
              setTimeout(() => {
                isDeleting = true;
              }, 1500);
            }
          } else {
            if (roleIndex > 0) {
              roleIndex--;
              setTypedRole(roles[currentRole].slice(0, roleIndex));
            } else {
              isDeleting = false;
              currentRole = (currentRole + 1) % roles.length; // Continuously cycle through roles
            }
          }
        }, 100);
      }
    }, 100);

    cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => {
      if (nameInterval) clearInterval(nameInterval);
      if (roleInterval) clearInterval(roleInterval);
      if (cursorInterval) clearInterval(cursorInterval);
    };
  }, []);

  // Console easter egg + help()
  useEffect(() => {
    try {
      const style = 'color:#34d399;font-weight:700;font-size:14px';
      console.log('%cWelcome curious dev 👋', style);
      console.log('%cBackend running on Express & MongoDB 💚', 'color:#10b981;font-weight:600');
      console.log('%cType help() for a surprise!', 'color:#a7f3d0');
    } catch {}

    window.help = () => {
      console.log('Open GitHub → https://github.com/chatok-jnr');
    };
    return () => {
      try { delete window.help; } catch {}
    };
  }, []);

  const skills = {
    languages: ['C++', 'JavaScript'],
    frameworks: ['Node.js', 'Express', 'React'],
    database: ['MongoDB'],
    concepts: ['OOP', 'Algorithms', 'Problem Solving', 'DSA']
  };

  const projects = [
    {
      title: 'Taza Bazar',
      tech: 'Node.js, Express, MongoDB',
      short: `The backend is a Node.js + Express API that provides authentication, 
      user/consumer/farmer management, alerts, bids, and admin functionality backed 
      by MongoDB (via Mongoose). It implements REST routes organized by feature, uses 
      JWT + bcrypt for auth, and is set up for local development with nodemon and production start via node server.js`,

      details: `The backend is a Node.js + Express (v5) REST API using MongoDB (accessed through Mongoose and the native mongodb package) 
      with configuration via dotenv; its primary entry point is server.js (scripts in package.json expose start and dev), and the codebase 
      follows a modular MVC-like layout with feature-separated folders — controllers for request handlers, models for Mongoose schemas, routes 
      for endpoint wiring, middleware for auth and request guards. 
      Authentication is JWT-based (jsonwebtoken) with password hashing via bcrypt/bcryptjs and route protection implemented in authMiddleware.js; 
      cors and morgan are used for cross-origin handling and request logging, secrets live in config.env (see config.env.example), 
      and common request flows include register → bcrypt-hash → login → JWT issuance → protected-route validation.`,

      link: 'https://taza-bazar-app-4l7i.onrender.com/',
      highlights: ['JWT Authentication', 'RESTful API', 'Secure Backend']
    },
    {
      title: 'Sudoku Solver',
      tech: 'JavaScript, HTML, CSS',
      short: `sudokuSolver is a lightweight web-based Sudoku solver 
      and visualizer that lets you enter a Sudoku puzzle in the browser 
      and automatically solves it using the project's solving logic.`,

      details: `sudokuSolver is a small, self-contained web project that demonstrates a Sudoku solving 
      tool implemented in plain HTML, CSS, and JavaScript. It provides an interactive grid UI where users 
      can enter known numbers, then run the solver to compute and display a solution. The repository is 
      ideal for learning about puzzle solving algorithms, DOM manipulation, and small front-end app structure.`,

      link: 'https://chatok-jnr.github.io/sudokuSolver/',
      highlights: ['Backtracking Algorithm', 'Client-side Processing', 'Responsive Design']
    }
  ];

  const achievements = [
    { 
      icon: '🌐', 
      title: 'ICPC Dhaka Regional 2024', 
      short: 'Team UITS_ACES participant', 
      details: `A huge shoutout to my incredible teammates for their dedication, passion, and perseverance. 💪 It was a privilege to be part of this journey together!`, 
      link: '#',
      highlights: ['ICPC Regional Participant', 'Team Competition']
    },

    { 
      icon: '🌐', 
      title: 'Competed in 5 Different Inter University Programming Contest', 
      short: 'Team UITS_ACES participant', 
      details: `A huge shoutout to my incredible teammates for their dedication, passion, and perseverance. 💪 It was a privilege to be part of this journey together!`, 
      link: '#',
      highlights: ['IUT', 'KUET', 'UIU', 'AUST', 'UU']
    },

    { 
      icon: '🟢', 
      title: 'Codeforces Pupil', 
      short: 'Max Rating: 1344 | 600+ problems solved', 
      details: ``,
      link: `https://codeforces.com/profile/chatok.jr`,
      highlights: ['600+ Problems', 'Active Contestant']
    },

    { 
      icon: '⭐', 
      title: 'CodeChef 3-Star', 
      short: 'Max Rating: 1724', 
      details: ``,
      link: 'https://www.codechef.com/users/chatok_junior',
      highlights: ['3-Star', 'Contest Performance']
    },

    { 
      icon: '🏆', 
      title: 'Champion – UITS Hackify Fest 2025', 
      short: 'Team UITS_ACES - 1st place among top university programmers', 
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
      link: `https://www.linkedin.com/posts/chatok-junior_hackify2025-programmingchampions-uitsabraces-activity-7328465793086566400-H8Wv?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADWQgRYBTcu-Rldj4Z0YC59wEOuxG-zfjNA`,
      highlights: ['Team Win', 'Top University Teams']
    },

     { 
      icon: '🏆', 
      title: 'Champion – UITS Intra University Programming Contest 2025', 
      short: 'Team UITS_ACES - 1st place among top university programmers', 
      details: 'What an incredible journey! Team UITS_ACES emerged as the champion in the UITS Intra University Programming Contest 2025 held on February 18, 2025.',
      link: `https://www.linkedin.com/posts/chatok-junior_uitsabraces-champion-uits-activity-7303339882007932928--UgU?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADWQgRYBTcu-Rldj4Z0YC59wEOuxG-zfjNA`,
      highlights: ['Team Win', 'Top University Teams']
    },

    { 
      icon: '🥇', 
      title: 'Champion – UITS Winter Fest 2024', 
      short: '1st place in solo contest', 
      details: 'I became the first at the UITS winter fest programming contest. Which was held on 18 February 2024.',
      link: `https://www.linkedin.com/posts/chatok-junior_i-am-happy-to-share-that-i-became-the-first-activity-7182949932599840769-iTSU?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADWQgRYBTcu-Rldj4Z0YC59wEOuxG-zfjNA`,
      highlights: ['Solo Victory', 'Problem Solving']
    },

    { 
      icon: '🎯', 
      title: '1000+ Problems', 
      short: 'Solved across multiple online judges', 
      details: '',
      highlights: ['1000+ Problems', 'Wide Platform Coverage']
    }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const openAchievementDetails = (achievement) => {
    setSelectedAchievement(achievement);
  };

  const closeDetails = () => {
    setSelectedProject(null);
    setSelectedAchievement(null);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && (selectedProject || selectedAchievement)) {
        closeDetails();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedProject, selectedAchievement]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">


      <Helmet>
        <title>Chatok Junior | Portfolio</title>
        <meta name="description" content="Competitive Programmer and Backend Developer — projects, achievements, and contact info." />
        <meta property="og:title" content="Chatok Junior | Portfolio" />
        <meta property="og:description" content="Competitive Programmer and Backend Developer — projects, achievements, and contact info." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
      </Helmet>

      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl sm:text-2xl font-bold text-emerald-400">{'< Chatok Junior />'}</div>
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-300 hover:text-emerald-400 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X size={24} />
              ) : (
                <div className="space-y-2">
                  <div className="w-6 h-0.5 bg-current"></div>
                  <div className="w-6 h-0.5 bg-current"></div>
                  <div className="w-6 h-0.5 bg-current"></div>
                </div>
              )}
            </button>
            {/* Desktop menu */}
            <div className="hidden md:flex gap-8">
              {['home', 'skills', 'projects', 'achievements', 'contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="capitalize text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* Mobile menu panel */}
          {isMobileMenuOpen && (
            <div className="md:hidden pt-4">
              <div className="flex flex-col space-y-4 pb-3">
                {['home', 'skills', 'projects', 'achievements', 'contact'].map(item => (
                  <button
                    key={item}
                    onClick={() => {
                      scrollToSection(item);
                      setIsMobileMenuOpen(false);
                    }}
                    className="capitalize text-gray-300 hover:text-emerald-400 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20">
        <div className="w-full max-w-5xl text-center">
          <div className="space-y-4">
            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold">
              <span className="text-white glowing-text">{typedText.slice(0, 11)}</span>
              <span className="text-emerald-400 glowing-text">{typedText.slice(11)}</span>
            </div>
            <div className="glowing-text text-2xl sm:text-3xl md:text-4xl">
              {typedRole}
              <span className={`typing-cursor ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/chatok-jnr"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-500 text-gray-900 rounded-lg font-semibold transition-all glow"
            >
              View GitHub
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3 border-2 border-emerald-500 text-emerald-400 rounded-lg font-semibold transition-all glow"
            >
              Get In Touch
            </button>
          </div>

          <div className="flex justify-center gap-4 sm:gap-6 mt-8">
            <a href="https://github.com/chatok-jnr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors hover:scale-110 transform p-2">
              <Github size={24} className="sm:w-7 sm:h-7" />
            </a>
            <a href="https://www.linkedin.com/in/chatok-junior/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors hover:scale-110 transform p-2">
              <Linkedin size={24} className="sm:w-7 sm:h-7" />
            </a>
            <a href="mailto:md.sakib.hos3n@gmail.com" className="text-gray-400 hover:text-emerald-400 transition-colors hover:scale-110 transform p-2">
              <Mail size={24} className="sm:w-7 sm:h-7" />
            </a>
          </div>
        </div>
      </section>

      <Suspense fallback={<section id="skills" className="px-4 sm:px-6 py-16 text-center text-gray-400">Loading skills…</section>}>
        <SkillsSection skills={skills} />
      </Suspense>

      {/* Live developer stats */}
      <StatsSection githubUser="chatok-jnr" codeforcesUser="chatok.jr" />
      <Suspense fallback={<section id="projects" className="px-4 sm:px-6 py-16 text-center text-gray-400">Loading projects…</section>}>
        <ProjectsSection projects={projects} onOpen={openProjectDetails} />
      </Suspense>

      <Suspense fallback={<section id="achievements" className="px-4 sm:px-6 py-16 text-center text-gray-400">Loading achievements…</section>}>
        <AchievementsSection achievements={achievements} onOpen={openAchievementDetails} />
      </Suspense>

      <section id="contact" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 bg-gray-900/50">
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-emerald-400 mb-8 sm:mb-12">
            Get In Touch
          </h2>
          
          <div className="glass glow p-6 sm:p-12">
            <p className="text-xl text-gray-300 mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4 text-lg">
                <Mail className="text-emerald-400" size={24} />
                <a href="mailto:md.sakib.hos3n@gmail.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  md.sakib.hos3n@gmail.com
                </a>
              </div>
              
              {/* <div className="flex items-center justify-center gap-4 text-lg">
                <Phone className="text-emerald-400" size={24} />
                <span className="text-gray-300">+880 1971 311958</span>
              </div> */}
              
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <a
                  href="https://github.com/chatok-jnr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-emerald-500 text-gray-900 rounded-lg font-semibold transition-all glow transform"
                >
                  <Github className="inline mr-2" size={20} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/chatok-junior/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-emerald-500 text-gray-900 rounded-lg font-semibold transition-all glow transform"
                >
                  <Linkedin className="inline mr-2" size={20} />
                  LinkedIn
                </a>
                {/* TODO: Replace `your-user-id` with your actual Discord user ID (Settings -> Advanced -> Developer Mode -> copy ID) */}
                <a
                  href="https://discord.com/users/741680363453022279"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-emerald-500 text-gray-900 rounded-lg font-semibold transition-all glow transform"
                >
                  <MessageSquare className="inline mr-2" size={20} />
                  Discord
                </a>
                <a
                  href="https://www.facebook.com/sakib.the.jnr.chatok/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-emerald-500 text-gray-900 rounded-lg font-semibold transition-all glow transform"
                >
                  <Facebook className="inline mr-2" size={20} />
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/chatok.jr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-emerald-500 text-gray-900 rounded-lg font-semibold transition-all glow transform"
                >
                  <Instagram className="inline mr-2" size={20} />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 border-t border-emerald-500/20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>© 2025 Md. Sakib Hosen AKA Chatok Junior</p>
          <p className="mt-2 text-emerald-400">Competitive Programmer | Backend Developer</p>
        </div>
      </footer>

      {/* Details modal overlay for projects / achievements */}
      {(selectedProject || selectedAchievement) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop that also closes on click */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeDetails} />

          <div
            role="dialog"
            aria-modal="true"
            className="relative z-50 max-w-3xl w-full mx-4 bg-gray-900/90 rounded-2xl border border-emerald-500/30 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => closeDetails()}
              className="absolute top-4 right-4 text-gray-400 hover:text-emerald-400"
              aria-label="Close details"
            >
              <X size={20} />
            </button>

                {selectedProject && (
              <div>
                <h3 className="text-2xl font-bold text-emerald-400 mb-2">{selectedProject.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{selectedProject.tech}</p>
                <p className="text-gray-300 mb-4">{selectedProject.details}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.highlights.map((h, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs border border-emerald-500/20">
                      {h}
                    </span>
                  ))}
                </div>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
                >
                  Open Project
                  <ExternalLink size={16} />
                </a>
              </div>
            )}

            {selectedAchievement && (
              <div>
                <div className="text-6xl mb-4">{selectedAchievement.icon}</div>
                <h3 className="text-2xl font-bold text-emerald-400 mb-2">{selectedAchievement.title}</h3>
                <p className="text-gray-300 mb-4">{selectedAchievement.details}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(selectedAchievement.highlights || []).map((h, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs border border-emerald-500/20">
                      {h}
                    </span>
                  ))}
                </div>
                {selectedAchievement.link && (
                  <a
                    href={selectedAchievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
                  >
                    Open Link
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}