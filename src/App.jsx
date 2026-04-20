import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Award, Briefcase, GraduationCap, X, Facebook, Instagram, Download, Sun, Moon, Code } from 'lucide-react';
import { UilDiscord } from '@iconscout/react-unicons';
import { Helmet } from 'react-helmet-async';
import useIntersectionObserver from './hooks/useIntersectionObserver';
import resumePdf from './assets/resume.pdf';
import tazaBazarImg from './assets/project_images/tazaBazar.png';
import biteNowImg from './assets/project_images/biteNow.png';
import solveSudokuImg from './assets/project_images/solveSudoku.png';
import icpc25Img from './assets/achievement_images/icpc_25.png';
import buyMeACoffeeQR from './assets/buy_me_a_cofee.jpg';
import FlippingName from './component/FlippingName';
import VideoBackground from './component/VideoBackground';
import RotatingCube from './component/RotatingCube';

const ProjectsSection = React.lazy(() => import('./component/ProjectsSection'));
const AchievementsSection = React.lazy(() => import('./component/AchievementsSection'));
const SkillsSection = React.lazy(() => import('./component/SkillsSection'));
const ExperienceSection = React.lazy(() => import('./component/ExperienceSection'));

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
  const [profileOrbitAngle, setProfileOrbitAngle] = useState(0);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') ?? 'current';
    } catch {
      return 'current';
    }
  }); // 'current' | 'previous'
  const [isMobile, setIsMobile] = useState(false);
  const [cardRipples, setCardRipples] = useState({});

  // Card hover handlers for 3D tilt effect
  const handleCardMouseMove = (e, cardId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setCardRipples(prev => ({
      ...prev,
      [cardId]: { x, y, active: true }
    }));
  };

  const handleCardMouseLeave = (cardId) => {
    setCardRipples(prev => ({
      ...prev,
      [cardId]: { ...prev[cardId], active: false }
    }));
  };

  // Intersection observers for sections
  const { elementRef: homeRef, isVisible: homeVisible } = useIntersectionObserver({ threshold: 0.2 });
  const { elementRef: contactRef, isVisible: contactVisible } = useIntersectionObserver({ threshold: 0.2 });

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
  const lastName = "CHAT0K JUNIOR";
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

  // Theme persistence and class application

  useEffect(() => {
    const body = document.body;
    body.classList.remove('theme-previous');
    if (theme === 'previous') {
      body.classList.add('theme-previous');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'current' ? 'previous' : 'current'));
  };

  // Orbit animation using requestAnimationFrame
  useEffect(() => {
    if (isMobile) return; // Skip animation on mobile
    
    let rafId;
    let lastTime = performance.now();
    const speed = 0.0002; // radians per ms (~0.0005 rad/ms ≈ 1 rev ~ 12,566ms)

    const tick = (now) => {
      const dt = now - lastTime;
      lastTime = now;
      if (!isOrbitPaused) {
        setOrbitAngle(prev => (prev + dt * speed) % (Math.PI * 2));
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isOrbitPaused, socialLinks.length, isMobile]);

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
    languages: ['Java', 'C++', 'JavaScript', 'SQL'],
    backend: ['Spring Boot', 'Node.js', 'Express', 'REST APIs'],
    database: ['PostgreSQL', 'MongoDB', 'MySQL', 'Mongoose', 'Hibernate JPA'],
    concepts: ['OOP', 'Data Structure', 'Algorithm', 'Agile'],
    tools: ['Linux', 'Git/Github', 'MongoDB Compass', 'Postman', 'DBeaver', 'Jira']
  };

  const projects = [
    {
      title: 'BiteNow',
      tech: 'Node.js, Express, MongoDB, Google oAuth, JWT',
      short: ` The backend is a Node.js + Express API for BiteNow, providing authentication, 
      user/restaurant/rider/admin management, orders, announcements, and audit logging, all 
      backed by MongoDB (via Mongoose). It implements REST routes by feature, uses JWT + bcrypt 
      for authentication, and is set up for local development with nodemon and production start via 
      node server.js.`,

      details: [
        '**RESTful API Server: Express.js-based backend powering the BiteNow food delivery platform.',
        '**Multi-Role Authentication: JWT-based authentication system supporting customers, restaurant owners, riders, and administrators with role-based access control.',
        '**Food Delivery Platform Features: Manages restaurants, menus, orders, carts, real-time location updates, and announcements for all user roles.',
        '**Admin Management System: Admin panel with user management, content moderation, announcements, and audit logging.',
        '**MongoDB Database: Mongoose ODM for data modeling with schemas for users, restaurants, orders, carts, audit logs, and more.',
        '**Production-Ready: Configured with CORS, security middleware, error handling, and deployment support for cloud hosting.'
      ],

      image: biteNowImg,
      projectLink: 'https://bite-now.netlify.app/',
      githubLink: 'https://github.com/chatok-jnr/BiteNow',
      highlights: ['JWT Authentication', 'RESTful API', 'Google oAuth', 'Multi-Role System', 'Admin Panel', 'MongoDB', 'Production-Ready', 'RBAC']
    },
    {
      title: 'Taza Bazar',
      tech: 'Node.js, Express, MongoDB',
      short: `The backend is a Node.js + Express API that provides authentication, 
      user/consumer/farmer management, alerts, bids, and admin functionality backed 
      by MongoDB (via Mongoose). It implements REST routes organized by feature, uses 
      JWT + bcrypt for auth, and is set up for local development with nodemon and production start via node server.js`,

      details: [
        '**RESTful API Server**: Express.js-based backend serving the TazaBazar agricultural marketplace platform',
        '**Multi-Role Authentication**: JWT-based authentication system supporting farmers, consumers, buyers, and administrators with role-specific access control',
        '**Agricultural Marketplace Features**: Manages farmer product listings, consumer requests, bidding system, and real-time alerts for both farmers and consumers',
        '**Admin Management System**: Comprehensive admin panel with user management, content moderation, announcements, and audit logging capabilities',
        '**MongoDB Database**: Mongoose ODM for data modeling with schemas for users, products, bids, alerts, and administrative records',
        '**Production-Ready**: Configured with CORS, security middleware, error handling, and deployment support for Render hosting'
      ],

      image: tazaBazarImg,
      projectLink: 'https://taza-bazar.netlify.app/',
      githubLink: 'https://github.com/chatok-jnr/taza-bazar-app',
      highlights: ['JWT Authentication', 'RESTful API', 'Multi-Role System', 'Admin Panel', 'MongoDB', 'Production-Ready']
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
      
      image: solveSudokuImg,
      projectLink: 'https://chatok-jnr.github.io/sudokuSolver/',
      githubLink: 'https://github.com/chatok-jnr/sudokuSolver',
      highlights: ['Backtracking Algorithm', 'Client-side Processing', 'Responsive Design']
    }
  ];

  const achievements = [
    { 
      icon: '🌐', 
      title: 'ICPC Dhaka Regional 2025', 
      short: 'Team UITS_ACES participant', 
      details: `A huge shoutout to my incredible teammates for their dedication, passion, and perseverance. 💪 It was a privilege to be part of this journey together!`, 
      image: icpc25Img,
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
    <div className="min-h-screen text-white relative overflow-hidden" style={{
      background: '#000000'
    }}>

      {/* Video Background */}
      <VideoBackground />

      <Helmet>
        <title>Chatok Junior | Portfolio</title>
        <meta name="description" content="Competitive Programmer and Backend Developer — projects, achievements, and contact info." />
        <meta property="og:title" content="Chatok Junior | Portfolio" />
        <meta property="og:description" content="Competitive Programmer and Backend Developer — projects, achievements, and contact info." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
      </Helmet>

      <nav className="fixed top-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md z-50 border border-white/20 shadow-lg shadow-white/5 rounded-[2.5rem]">
        <div className="px-4 sm:px-6 py-2">
          <div className="flex justify-between items-center gap-2 sm:gap-3">
            <FlippingName />
            {/* Theme toggle */}
            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-white hover:text-white focus:outline-none"
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
            </div>
            {/* Desktop menu */}
            <div className="hidden md:flex gap-8 items-center">
              {['home', 'skills', 'projects', 'achievements', 'contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="capitalize text-white hover:text-white transition-colors"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-white hover:text-white transition-colors"
                title={theme === 'current' ? 'Switch to previous theme' : 'Switch to current theme'}
                aria-label="Toggle theme"
              >
                {theme === 'current' ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>
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
                    className="capitalize text-white hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                ))}
                <button
                  onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}
                  className="p-2 rounded-md text-white hover:text-white transition-colors self-start"
                  title={theme === 'current' ? 'Switch to previous theme' : 'Switch to current theme'}
                  aria-label="Toggle theme"
                >
                  {theme === 'current' ? (
                    <Sun size={20} />
                  ) : (
                    <Moon size={20} />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section 
        ref={homeRef}
        id="home" 
        className={`min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 relative overflow-hidden transition-all duration-700 ease-out ${
          homeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="w-full max-w-7xl">
          {/* Hero Layout - Image Right, Text Left */}
          <div className="relative min-h-[700px] md:min-h-[800px] flex items-center justify-center py-12">
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 lg:gap-48 items-center relative">
              
              {/* Left Side - Text Content */}
              <div className="flex items-center justify-center lg:justify-start order-2 lg:order-1">
                <div className="space-y-6 text-center lg:text-left">
                <div className="space-y-4">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    <div className="text-white text-xl sm:text-2xl md:text-3xl">Hello, I am</div>
                    <div className="mt-4 flex flex-col justify-center lg:justify-start">
                      {/* <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">I am</span> */}
                      <span className="text-white">Md Sakib Hosen</span>
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl text-white">
                    {typedRole}
                    <span className={`typing-cursor ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
                  </div>
                </div>

                <div className="mt-8 lg:mt-12 flex flex-wrap justify-center lg:justify-start gap-4">
                  <a
                    href={resumePdf}
                    download="Md_Sakib_Hosen_Resume.pdf"
                    className="px-8 py-4 bg-black border-2 border-white text-white rounded-xl font-bold transition-all hover:bg-white hover:text-black flex items-center gap-2 will-change-auto"
                  >
                    <Download size={20} />
                    Download Resume
                  </a>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold transition-all hover:bg-white hover:text-black will-change-auto"
                  >
                    💬 Get In Touch
                  </button>
                </div>
              </div>
              </div>

              {/* Right Side - Rotating Cube */}
              <div className="relative flex flex-col items-center justify-center order-1 lg:order-2" style={{ zIndex: 1, marginTop: isMobile ? '0px' : '-170px' }}>
                {/* Rotating Cube - Same size as the previous image */}
                <div className="w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
                  <div className="scale-[2.4] md:scale-[2.9]">
                    <RotatingCube />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Suspense fallback={<section id="skills" className="px-4 sm:px-6 py-16 text-center text-white">Loading skills…</section>}>
        <SkillsSection skills={skills} />
        <ExperienceSection 
          cardRipples={cardRipples}
          handleCardMouseMove={handleCardMouseMove}
          handleCardMouseLeave={handleCardMouseLeave}
        />
      </Suspense>

      <Suspense fallback={<section id="projects" className="px-4 sm:px-6 py-16 text-center text-white">Loading projects…</section>}>
        <ProjectsSection projects={projects} onOpen={openProjectDetails} />
      </Suspense>

      <Suspense fallback={<section id="achievements" className="px-4 sm:px-6 py-16 text-center text-white">Loading achievements…</section>}>
        <AchievementsSection achievements={achievements} onOpen={openAchievementDetails} />
      </Suspense>

      {/* Mentorship & Community Section */}
      <section id="mentorship" className="min-h-[40vh] flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative">
        <div className="max-w-4xl w-full">
          <div 
            className="glass glow p-6 sm:p-8 transition-all relative overflow-hidden"
            onMouseMove={e => handleCardMouseMove(e, 'mentorship')}
            onMouseLeave={() => handleCardMouseLeave('mentorship')}
            style={{
              transform: cardRipples['mentorship']?.active 
                ? `perspective(1000px) rotateX(${(cardRipples['mentorship'].y - 50) * 0.05}deg) rotateY(${(cardRipples['mentorship'].x - 50) * 0.05}deg)`
                : 'none',
              transition: 'transform 0.1s ease-out'
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              {!isMobile && (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>👨‍🎓</span>
                </>
              )}
              Mentorship & Community
            </h3>
            <p className="text-white leading-relaxed text-lg">
              Regularly mentor junior students in Competitive Programming, organizing problem-solving sessions
              and guiding them through algorithmic concepts to improve their logical reasoning and contest performance.
            </p>
          </div>
        </div>
      </section>

      <section 
        ref={contactRef}
        id="contact" 
        className={`min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative transition-all duration-700 ease-out ${
          contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8 sm:mb-12">
            Get In Touch
          </h2>
          
          <div 
            className="glass glow p-6 sm:p-12 transition-all relative overflow-hidden"
            onMouseMove={(e) => handleCardMouseMove(e, 'contact')}
            onMouseLeave={() => handleCardMouseLeave('contact')}
            style={{
              transform: cardRipples['contact']?.active 
                ? `perspective(1000px) rotateX(${ (cardRipples['contact'].y - 50) * 0.05}deg) rotateY(${(cardRipples['contact'].x - 50) * 0.05}deg)`
                : 'none',
              transition: 'transform 0.1s ease-out'
            }}
          >
            <p className="text-xl text-white mb-8 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 🚀
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4 text-lg group">
                <Mail className="text-white transition-transform" size={24} />
                <a href="mailto:md.sakib.hos3n@gmail.com" className="text-white hover:text-white transition-all font-semibold">
                  md.sakib.hos3n@gmail.com
                </a>
              </div>
              
              {/* <div className="flex items-center justify-center gap-4 text-lg">
                <Phone className="text-white" size={24} />
                <span className="text-white">+880 1971 311958</span>
              </div> */}
              
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <a
                  href="https://github.com/chatok-jnr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black border-2 border-white text-white rounded-xl font-bold transition-all hover:bg-white hover:text-black"
                >
                  <Github className="inline mr-2" size={20} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/chatok-junior/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black border-2 border-white text-white rounded-xl font-bold transition-all hover:bg-white hover:text-black"
                >
                  <Linkedin className="inline mr-2" size={20} />
                  LinkedIn
                </a>
                <a
                  href="https://discord.com/users/741680363453022279"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black border-2 border-white text-white rounded-xl font-bold transition-all hover:bg-white hover:text-black"
                >
                  <UilDiscord className="inline mr-2" size={20} />
                  Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black/90 backdrop-blur-md border-t border-white/30 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 text-center text-white relative z-10">
          <p className="font-semibold text-white">© 2025 - 2026 Md. Sakib Hosen <span className="text-white">AKA</span> Chatok Junior</p>
          <p className="mt-2 text-white font-bold text-lg">
            🏆 Competitive Programmer | Backend Developer 💻
          </p>
        </div>
      </footer>

      {/* Details modal overlay for projects / achievements */}
      {(selectedProject || selectedAchievement) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in p-4">
          {/* backdrop that also closes on click */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" onClick={closeDetails} />

          <div
            role="dialog"
            aria-modal="true"
            className="relative z-50 max-w-3xl w-full mx-4 glass glow shadow-2xl shadow-white/30 transition-all max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 right-0 flex justify-end p-4 bg-gradient-to-b from-black/50 to-transparent z-10">
              <button
                onClick={() => closeDetails()}
                className="text-white hover:text-white p-2 rounded-full bg-gray-800/50 transition-all hover:rotate-90"
                aria-label="Close details"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-8 pb-8 -mt-4">{selectedProject && (
              <div className="animate-fade-in">
                {selectedProject.image && (
                  <div className="w-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center relative overflow-hidden mb-4">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )}
                <h3 className="text-3xl font-bold text-white mb-3">{selectedProject.title}</h3>
                <p className="text-white text-sm mb-4 font-semibold">{selectedProject.tech}</p>
                {Array.isArray(selectedProject.details) ? (
                  <ul className="text-white mb-6 leading-relaxed text-lg space-y-3 list-none">
                    {selectedProject.details.map((detail, i) => {
                      const parts = detail.split('**');
                      return (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-white">•</span>
                          <span>
                            {parts.map((part, j) => 
                              j % 2 === 1 ? <strong key={j} className="text-white">{part}</strong> : part
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-white mb-6 leading-relaxed text-lg">{selectedProject.details}</p>
                )}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.highlights.map((h, i) => (
                    <span key={i} className="px-4 py-2 bg-black text-white rounded-full text-sm border border-white font-bold">
                      {h}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.projectLink && (
                    <a
                      href={selectedProject.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-white/20 hover:border-white/50 flex items-center gap-2"
                    >
                      <ExternalLink size={16} />
                      View Project
                    </a>
                  )}
                  {selectedProject.githubLink && (
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-white/20 hover:border-white/50 flex items-center gap-2"
                    >
                      <Code size={16} />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            )}

            {selectedAchievement && (
              <div className="animate-fade-in">
                {selectedAchievement.image ? (
                  <div className="w-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center relative overflow-hidden mb-4">
                    <img 
                      src={selectedAchievement.image} 
                      alt={selectedAchievement.title}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-7xl mb-6 animate-bounce">{selectedAchievement.icon}</div>
                )}
                <h3 className="text-3xl font-bold text-white mb-3">{selectedAchievement.title}</h3>
                <p className="text-white mb-6 leading-relaxed text-lg">{selectedAchievement.details}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(selectedAchievement.highlights || []).map((h, i) => (
                    <span key={i} className="px-4 py-2 bg-black text-white rounded-full text-sm border border-white font-bold">
                      {h}
                    </span>
                  ))}
                </div>
                {selectedAchievement.link && (
                  <a
                    href={selectedAchievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-black border-2 border-white text-white rounded-xl font-bold transition-all hover:bg-white hover:text-black"
                  >
                    🏆 Open Link
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            )}
            </div>
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