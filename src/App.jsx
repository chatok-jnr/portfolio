import React, { useState, useEffect, Suspense } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Award, Briefcase, GraduationCap, X, Facebook, Instagram, Download } from 'lucide-react';
import { UilDiscord } from '@iconscout/react-unicons';
import { Helmet } from 'react-helmet-async';
import StatsSection from './component/StatsSection';
import profilePhoto from './assets/Md. Sakib Hosen.png';
import cvPdf from './assets/cv.pdf';

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
  const [hoveredLink, setHoveredLink] = useState(null);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [isOrbitPaused, setIsOrbitPaused] = useState(false);
  const [particles, setParticles] = useState([]);
  const particleIdRef = React.useRef(0);
  const emitAccumRef = React.useRef(0);

  // Orbital links configuration
  const socialLinks = [
    { id: 'github', url: 'https://github.com/chatok-jnr', icon: Github, label: 'GitHub' },
    { id: 'codeforces', url: 'https://codeforces.com/profile/chatok.jr', text: 'CF', label: 'Codeforces' },
    { id: 'codechef', url: 'https://www.codechef.com/users/chatok_junior', text: 'CC', label: 'CodeChef' },
    { id: 'linkedin', url: 'https://www.linkedin.com/in/chatok-junior/', icon: Linkedin, label: 'LinkedIn' },
    { id: 'email', url: 'mailto:md.sakib.hos3n@gmail.com', icon: Mail, label: 'Email' },
    { id: 'discord', url: 'https://discord.com/users/741680363453022279', icon: UilDiscord, label: 'Discord' }
  ];

  // Calculate orbital positions using trigonometry
  const getOrbitalPosition = (index, total, radius, baseAngle = 0) => {
    const angle = ((index * 2 * Math.PI) / total) + baseAngle - Math.PI / 2; // Start from top
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  const firstName = "Hello, I am ";
  const lastName = "CHA70K JUNIOR";
  const roles = ["Competitive Programmer", "Back-End Developer"];

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

  // Orbit animation using requestAnimationFrame
  useEffect(() => {
    let rafId;
    let lastTime = performance.now();
    const speed = 0.0002; // radians per ms (~0.0005 rad/ms ≈ 1 rev ~ 12,566ms)

    const tick = (now) => {
      const dt = now - lastTime;
      lastTime = now;
      if (!isOrbitPaused) {
        // advance angle first
        setOrbitAngle(prev => (prev + dt * speed) % (Math.PI * 2));

        // Emit particles at a controlled cadence (every ~60ms)
        emitAccumRef.current += dt;
        const shouldEmit = emitAccumRef.current >= 60; // ms
        if (shouldEmit) {
          emitAccumRef.current = 0;
          const currentAngle = (orbitAngle + dt * speed) % (Math.PI * 2);
          setParticles(prev => {
            const next = [...prev];
            const imageRadius = { base: 112, sm: 128, md: 144 };
            const margin = 36;
            const radius = imageRadius.base + margin + 40;
            socialLinks.forEach((_, index) => {
              const pos = getOrbitalPosition(index, socialLinks.length, radius, currentAngle);
              const id = particleIdRef.current++;
              next.push({
                id,
                x: pos.x + (Math.random() - 0.5) * 6,
                y: pos.y + (Math.random() - 0.5) * 6,
                size: 3 + Math.random() * 2,
                opacity: 0.9,
                life: 800
              });
            });
            // Age particles
            const aged = next.map(p => ({
              ...p,
              life: p.life - dt,
              opacity: Math.max(0, p.opacity - (dt / 800)),
              size: Math.max(1, p.size - (dt / 800) * 1.5)
            }));
            return aged.filter(p => p.life > 0).slice(-600);
          });
        } else {
          // Even if not emitting this frame, continue aging existing particles
          setParticles(prev => prev.map(p => ({
            ...p,
            life: p.life - dt,
            opacity: Math.max(0, p.opacity - (dt / 800)),
            size: Math.max(1, p.size - (dt / 800) * 1.5)
          })).filter(p => p.life > 0));
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isOrbitPaused, socialLinks.length]);

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
      title: 'ICPC Dhaka Regional 2025', 
      short: 'Team UITS_ACES participant', 
    //  details: `A huge shoutout to my incredible teammates for their dedication, passion, and perseverance. 💪 It was a privilege to be part of this journey together!`, 
      //link: 'https://ln.run/XHCRL',
      highlights: ['ICPC Regional Participant', 'Team Competition']
    },

    { 
      icon: '🌐', 
      title: 'ICPC Dhaka Regional 2024', 
      short: 'Team UITS_ACES participant', 
      details: `A huge shoutout to my incredible teammates for their dedication, passion, and perseverance. 💪 It was a privilege to be part of this journey together!`, 
      link: 'https://ln.run/XHCRL',
      highlights: ['ICPC Regional Participant', 'Team Competition']
    },

    { 
      icon: '🌐', 
      title: 'Competed in 5 Different Inter University Programming Contest', 
      short: 'Team UITS_ACES participant', 
      details: `A huge shoutout to my incredible teammates for their dedication, passion, and perseverance. 💪 It was a privilege to be part of this journey together!`, 
      //link: '#',
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
      title: 'Solved 1000+ Problems', 
      short: 'Solved across multiple online judges', 
      details: '',
      highlights: ['Codeforces', 'Atcoder', 'Light Oj', 'Toph', 'UVA', 'Spoj', 'Codechef', 'Beecrowd']
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 relative overflow-hidden">
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-emerald-300 rounded-full" style={{animation: 'float 6s ease-in-out infinite'}}></div>
        <div className="absolute top-60 left-1/4 w-2 h-2 bg-emerald-500 rounded-full" style={{animation: 'float 8s ease-in-out infinite 1s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/2 w-3 h-3 bg-emerald-300 rounded-full" style={{animation: 'float 7s ease-in-out infinite 2s'}}></div>
      </div>


      <Helmet>
        <title>Chatok Junior | Portfolio</title>
        <meta name="description" content="Competitive Programmer and Backend Developer — projects, achievements, and contact info." />
        <meta property="og:title" content="Chatok Junior | Portfolio" />
        <meta property="og:description" content="Competitive Programmer and Backend Developer — projects, achievements, and contact info." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
      </Helmet>

      <nav className="fixed top-0 w-full bg-gray-900/60 backdrop-blur-xl z-50 border-b border-emerald-400/30 shadow-lg shadow-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 transition-colors hover:text-emerald-300 cursor-pointer">{'< Chatok Junior />'}</div>
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

      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 relative">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side - Text Content */}
            <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
              <div className="space-y-4">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <div className="text-white glowing-text">Hello,</div>
                  <div>
                    <span className="text-white glowing-text">I am </span>
                    <span className="text-emerald-400 glowing-text">CHA70K JUNIOR</span>
                  </div>
                </div>
                <div className="glowing-text text-xl sm:text-2xl md:text-3xl text-emerald-300">
                  {typedRole}
                  <span className={`typing-cursor ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
                </div>
              </div>

              <div className="mt-8 lg:mt-12 flex flex-wrap justify-center lg:justify-start gap-4">
                {/* <a
                  href="https://github.com/chatok-jnr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-gray-900 rounded-xl font-bold transition-all glow hover:from-emerald-400 hover:to-emerald-500 shadow-xl shadow-emerald-500/40"
                >
                  🚀 View GitHub
                </a> */}
                <a
                  href={cvPdf}
                  download="Chatok_Junior_CV.pdf"
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-gray-900 rounded-xl font-bold transition-all glow hover:from-emerald-400 hover:to-emerald-500 shadow-xl shadow-emerald-500/40 flex items-center gap-2"
                >
                  <Download size={20} />
                  Download CV
                </a>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 border-2 border-emerald-400 bg-emerald-500/10 text-emerald-300 rounded-xl font-bold transition-all glow hover:bg-emerald-500/20 hover:border-emerald-300 shadow-lg shadow-emerald-500/20"
                >
                  💬 Get In Touch
                </button>
              </div>
            </div>

            {/* Right Side - Profile Image with Orbital Links */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px]">
                {/* Center Profile Image */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                    <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-emerald-400 shadow-2xl shadow-emerald-500/50">
                      <img 
                        src={profilePhoto} 
                        alt="Chatok Junior" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                {/* Dynamically positioned orbital links with rotation */}
                <div
                  className="absolute inset-0"
                  onClick={() => setIsOrbitPaused(p => !p)}
                  aria-label="Orbit container"
                >
                  {/* Particle trail layer (behind icons) */}
                  <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 15 }}>
                    {particles.map(p => (
                      <div
                        key={p.id}
                        className="absolute rounded-full"
                        style={{
                          left: `calc(50% + ${p.x}px)`,
                          top: `calc(50% + ${p.y}px)`,
                          width: `${p.size}px`,
                          height: `${p.size}px`,
                          transform: 'translate(-50%, -50%)',
                          background: 'rgba(16,185,129,0.9)', // emerald-500
                          boxShadow: '0 0 8px rgba(16,185,129,0.6)',
                          opacity: p.opacity
                        }}
                      />
                    ))}
                  </div>
                  {socialLinks.map((link, index) => {
                    // Ensure icons don't overlap the image: set radius > imageRadius + margin
                    const imageRadius = {
                      base: 112, // w-56 -> diameter 224 -> radius 112
                      sm: 128,    // w-64 -> 256 -> 128
                      md: 144     // w-72 -> 288 -> 144
                    };
                    const margin = 36; // gap between image edge and orbit
                    const radius = imageRadius.base + margin + 40; // extra for icon size
                    const radiusSm = imageRadius.sm + margin + 40;
                    const radiusMd = imageRadius.md + margin + 40;

                    const pos = getOrbitalPosition(index, socialLinks.length, radius, orbitAngle);
                    const posSm = getOrbitalPosition(index, socialLinks.length, radiusSm, orbitAngle);
                    const posMd = getOrbitalPosition(index, socialLinks.length, radiusMd, orbitAngle);

                    const Icon = link.icon;

                    const pauseOnHover = () => { setHoveredLink(link.id); setIsOrbitPaused(true); };
                    const resumeOnLeave = () => { setHoveredLink(null); setIsOrbitPaused(false); };

                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target={link.id !== 'email' ? '_blank' : undefined}
                        rel={link.id !== 'email' ? 'noopener noreferrer' : undefined}
                        onMouseEnter={pauseOnHover}
                        onMouseLeave={resumeOnLeave}
                        className="absolute z-20 transition-transform duration-300"
                        style={{
                          left: `calc(50% + ${pos.x}px)`,
                          top: `calc(50% + ${pos.y}px)`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        title={link.label}
                      >
                        <style>{`
                          @media (min-width: 640px) {
                            a[title="${link.label}"] {
                              left: calc(50% + ${posSm.x}px) !important;
                              top: calc(50% + ${posSm.y}px) !important;
                            }
                          }
                          @media (min-width: 768px) {
                            a[title="${link.label}"] {
                              left: calc(50% + ${posMd.x}px) !important;
                              top: calc(50% + ${posMd.y}px) !important;
                            }
                          }
                        `}</style>
                        <div className="p-4 rounded-full bg-gray-800/90 border-2 border-emerald-400/50 transition-all duration-300 hover:scale-110 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/50 orbital-glow flex items-center justify-center min-w-[56px] min-h-[56px]">
                          {Icon ? (
                            <Icon size={24} className={`transition-colors ${hoveredLink === link.id ? 'text-emerald-400' : 'text-gray-300'}`} />
                          ) : (
                            <span className={`text-xl font-bold transition-colors ${hoveredLink === link.id ? 'text-emerald-400' : 'text-gray-300'}`}>
                              {link.text}
                            </span>
                          )}
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

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

      <section id="contact" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 bg-gray-900/50 relative">
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-emerald-400 mb-8 sm:mb-12">
            💬 Get In Touch
          </h2>
          
          <div className="glass glow p-6 sm:p-12 transition-all">
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 🚀
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4 text-lg group">
                <Mail className="text-emerald-400 transition-transform" size={24} />
                <a href="mailto:md.sakib.hos3n@gmail.com" className="text-emerald-400 hover:text-emerald-300 transition-all font-semibold" style={{textShadow: '0 0 10px rgba(16,185,129,0.3)'}}>
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
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-gray-900 rounded-xl font-bold transition-all glow hover:from-emerald-400 hover:to-emerald-500 shadow-xl shadow-emerald-500/40"
                >
                  <Github className="inline mr-2" size={20} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/chatok-junior/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-gray-900 rounded-xl font-bold transition-all glow hover:from-emerald-400 hover:to-emerald-500 shadow-xl shadow-emerald-500/40"
                >
                  <Linkedin className="inline mr-2" size={20} />
                  LinkedIn
                </a>
                <a
                  href="https://discord.com/users/741680363453022279"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-gray-900 rounded-xl font-bold transition-all glow hover:from-emerald-400 hover:to-emerald-500 shadow-xl shadow-emerald-500/40"
                >
                  <UilDiscord className="inline mr-2" size={20} />
                  Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900/90 backdrop-blur-md border-t border-emerald-400/30 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 relative z-10">
          <p className="font-semibold text-gray-300">© 2025 Md. Sakib Hosen <span className="text-emerald-400">AKA</span> Chatok Junior</p>
          <p className="mt-2 text-emerald-400 font-bold text-lg">
            🏆 Competitive Programmer | Backend Developer 💻
          </p>
          <p className="mt-3 text-sm text-gray-500">Built with React + Vite • Styled with Tailwind CSS</p>
        </div>
      </footer>

      {/* Details modal overlay for projects / achievements */}
      {(selectedProject || selectedAchievement) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
          {/* backdrop that also closes on click */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" onClick={closeDetails} />

          <div
            role="dialog"
            aria-modal="true"
            className="relative z-50 max-w-3xl w-full mx-4 glass glow p-8 shadow-2xl shadow-emerald-500/30 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => closeDetails()}
              className="absolute top-4 right-4 text-gray-400 hover:text-emerald-400 p-2 rounded-full bg-gray-800/50 hover:bg-emerald-500/20 transition-all hover:rotate-90"
              aria-label="Close details"
            >
              <X size={24} />
            </button>

                {selectedProject && (
              <div className="animate-fade-in">
                <h3 className="text-3xl font-bold text-emerald-400 mb-3">{selectedProject.title}</h3>
                <p className="text-gray-400 text-sm mb-4 font-semibold">{selectedProject.tech}</p>
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">{selectedProject.details}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.highlights.map((h, i) => (
                    <span key={i} className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-300 rounded-full text-sm border border-emerald-400/40 font-bold">
                      {h}
                    </span>
                  ))}
                </div>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-gray-900 rounded-xl font-bold transition-all hover:from-emerald-400 hover:to-emerald-500 shadow-xl shadow-emerald-500/50"
                >
                  🚀 Open Project
                  <ExternalLink size={20} />
                </a>
              </div>
            )}

            {selectedAchievement && (
              <div className="animate-fade-in">
                <div className="text-7xl mb-6 animate-bounce">{selectedAchievement.icon}</div>
                <h3 className="text-3xl font-bold text-emerald-400 mb-3">{selectedAchievement.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">{selectedAchievement.details}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(selectedAchievement.highlights || []).map((h, i) => (
                    <span key={i} className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-300 rounded-full text-sm border border-emerald-400/40 font-bold">
                      {h}
                    </span>
                  ))}
                </div>
                {selectedAchievement.link && (
                  <a
                    href={selectedAchievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-gray-900 rounded-xl font-bold transition-all hover:from-emerald-400 hover:to-emerald-500 shadow-xl shadow-emerald-500/50"
                  >
                    🏆 Open Link
                    <ExternalLink size={20} />
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
        @keyframes pulse-glow {
          0% {
            filter: drop-shadow(0 0 8px rgba(52, 211, 153, 0.5));
            box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(52, 211, 153, 1));
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.6);
          }
          100% {
            filter: drop-shadow(0 0 8px rgba(52, 211, 153, 0.5));
            box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
          }
        }
        @keyframes orbital-pulse {
          0%, 100% {
            box-shadow: 0 0 10px rgba(52, 211, 153, 0.3);
            border-color: rgba(52, 211, 153, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(52, 211, 153, 0.6);
            border-color: rgba(52, 211, 153, 0.8);
          }
        }
        /* Removed orbital rotation for stable layout */
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .social-icon-glow {
          animation: pulse-glow 3s ease-in-out infinite;
          transition: all 0.3s ease;
        }
        .social-icon-glow:hover {
          transform: scale(1.1);
        }
        .orbital-glow {
          animation: orbital-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}