import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code2, Award, Briefcase, GraduationCap, MessageSquare, Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [typedCode, setTypedCode] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [showOutput, setShowOutput] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const cppCode = `#include<bits/stdc++.h>
using namespace std;

int32_t main() {
  cout << "I am Chatok Junior" << endl;
  cout << "Backend Developer | Compititive Programmer" << endl;
  return 0;
}`;

  const playKeySound = () => {
    if (!soundEnabled) return;
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800 + Math.random() * 200;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 300;
      oscillator.type = 'square';
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= cppCode.length) {
        setTypedCode(cppCode.slice(0, index));
        if (index > 0 && index <= cppCode.length) {
          playKeySound();
        }
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowOutput(true), 500);
      }
    }, 50);

    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  const colorizeCode = (code) => {
    // Escape angle brackets first so C++ code like <bits/stdc++.h> shows correctly
    let result = code
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    result = result
      .split(/(<[^>]+>)/g)
      .map((part) =>
        part.startsWith('<')
          ? part
          : part.replace(/\b(\d+)\b/g, '<span class="text-blue-400">$1</span>')
      )
      .join('');

    return result;
  };


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
      description: 'Architected secure RESTful APIs for user authentication, product management, and admin operations. Implemented JWT authentication with bcrypt and CORS policies.',
      link: 'https://taza-bazar-app-4l7i.onrender.com/',
      highlights: ['JWT Authentication', 'RESTful API', 'Secure Backend']
    },
    {
      title: 'Sudoku Solver',
      tech: 'JavaScript, HTML, CSS',
      description: 'Developed a responsive browser-based Sudoku solver using recursive backtracking algorithm with constraint checking.',
      link: 'https://chatok-jnr.github.io/sudokuSolver/',
      highlights: ['Backtracking Algorithm', 'Client-side Processing', 'Responsive Design']
    }
  ];

  const achievements = [
    { icon: '🏆', title: 'Champion – UITS Hackify Fest 2025', desc: 'Team UITS_ACES - 1st place among top university programmers' },
    { icon: '🥇', title: 'Champion – UITS Winter Fest 2024', desc: '1st place in solo contest' },
    { icon: '💻', title: 'Codeforces Pupil', desc: 'Max Rating: 1344 | 600+ problems solved' },
    { icon: '⭐', title: 'CodeChef 3-Star', desc: 'Max Rating: 1724' },
    { icon: '🎯', title: '1000+ Problems', desc: 'Solved across multiple online judges' },
    { icon: '🌐', title: 'ICPC Dhaka Regional 2024', desc: 'Team UITS_ACES participant' }
  ];

  const scrollToSection = (id) => {
    playClickSound();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <button
        onClick={() => {
          playClickSound();
          setSoundEnabled(!soundEnabled);
        }}
        className="fixed top-20 right-6 z-50 p-3 bg-gray-800/80 backdrop-blur-md rounded-full border border-emerald-500/30 hover:border-emerald-500/50 transition-all hover:scale-110 text-emerald-400"
      >
        {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-emerald-400">{'<Chatok Junior/>'}</div>
            <div className="flex gap-8">
              {['home', 'about', 'projects', 'achievements', 'contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize hover:text-emerald-400 transition-colors ${
                    activeSection === item ? 'text-emerald-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-3xl w-full">
          <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/10 overflow-hidden">
            <div className="p-6 bg-gray-900/80">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 ml-4">
                  <Code2 size={20} />
                  <span className="font-mono text-sm">main.cpp</span>
                </div>
              </div>
              <div className="bg-gray-950/50 rounded-lg p-4 font-mono text-sm overflow-x-auto min-h-[200px]">
                <div className="flex">
                  <div className="pr-4 text-gray-600 select-none border-r border-gray-700 mr-4">
                    {[1,2,3,4,5,6,7,8,9].map(i => (
                      <div key={i}>{i}</div>
                    ))}
                  </div>
                  <pre className="flex-1">
                    <code dangerouslySetInnerHTML={{ __html: colorizeCode(typedCode) + `<span class="${cursorVisible ? 'opacity-100' : 'opacity-0'} text-emerald-400">|</span>` }} />
                  </pre>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-900/60 border-t border-emerald-500/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-emerald-400 font-mono text-sm">Output</div>
              </div>
              <div className="bg-gray-950/50 rounded-lg p-4 font-mono text-sm min-h-[140px]">
                {showOutput && (
                  <div className="space-y-2 animate-fade-in">
                    <div className="text-gray-400">$ ./main</div>
                    <div className="text-emerald-400 text-lg font-semibold">Hello, I am Chatok Junior</div>
                    <div className="text-cyan-400">Competitive Programmer | Backend Developer</div>
                    <div className="text-gray-500 mt-4">Process finished with exit code 0</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/chatok-jnr"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="px-6 py-3 bg-emerald-500 text-gray-900 rounded-lg font-semibold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 hover:scale-105"
            >
              View GitHub
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3 border-2 border-emerald-500 text-emerald-400 rounded-lg font-semibold hover:bg-emerald-500/10 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105"
            >
              Get In Touch
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-6">
            <a href="https://github.com/chatok-jnr" target="_blank" rel="noopener noreferrer" onClick={playClickSound} className="text-gray-400 hover:text-emerald-400 transition-colors hover:scale-110 transform">
              <Github size={28} />
            </a>
            <a href="https://www.linkedin.com/in/chatok-junior/" target="_blank" rel="noopener noreferrer" onClick={playClickSound} className="text-gray-400 hover:text-emerald-400 transition-colors hover:scale-110 transform">
              <Linkedin size={28} />
            </a>
            <a href="mailto:md.sakib.hos3n@gmail.com" onClick={playClickSound} className="text-gray-400 hover:text-emerald-400 transition-colors hover:scale-110 transform">
              <Mail size={28} />
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full">
          <h2 className="text-5xl font-bold text-emerald-400 mb-12 text-center">
            <GraduationCap className="inline mr-3" size={48} />
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/20">
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">Education</h3>
              <p className="text-xl font-semibold mb-2">University of Information Technology & Sciences</p>
              <p className="text-gray-400 mb-2">B.Sc. in Computer Science and Engineering</p>
              <p className="text-emerald-400 font-semibold">CGPA: 3.60 / 4.00</p>
              <p className="text-gray-400">Expected Graduation: June 2026</p>
              <p className="mt-4 text-gray-300">Focus: Data Structures, Algorithms, and Backend Development</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/20">
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">Skills</h3>
              <div className="space-y-4">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <p className="text-gray-400 capitalize font-semibold mb-2">{category}:</p>
                    <div className="flex flex-wrap gap-2">
                      {items.map(skill => (
                        <span key={skill} className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm border border-emerald-500/30 hover:bg-emerald-500/30 transition-all hover:scale-105">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20 bg-gray-900/50">
        <div className="max-w-6xl w-full">
          <h2 className="text-5xl font-bold text-emerald-400 mb-12 text-center">
            <Briefcase className="inline mr-3" size={48} />
            Projects
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/20">
                <h3 className="text-2xl font-bold text-emerald-400 mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.tech}</p>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.highlights.map((h, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs border border-emerald-500/20">
                      {h}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold group"
                >
                  View Project
                  <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="achievements" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full">
          <h2 className="text-5xl font-bold text-emerald-400 mb-12 text-center">
            <Award className="inline mr-3" size={48} />
            Achievements
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, idx) => (
              <div key={idx} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/30 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/20 text-center">
                <div className="text-5xl mb-4">{achievement.icon}</div>
                <h3 className="text-lg font-bold text-emerald-400 mb-2">{achievement.title}</h3>
                <p className="text-gray-400 text-sm">{achievement.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30">
            <h3 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <MessageSquare size={28} />
              Mentorship & Community
            </h3>
            <p className="text-gray-300">
              Regularly mentor junior students in Competitive Programming, organizing problem-solving sessions 
              and guiding them through algorithmic concepts to improve their logical reasoning and contest performance.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20 bg-gray-900/50">
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-5xl font-bold text-emerald-400 mb-12">
            Get In Touch
          </h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-emerald-500/30">
            <p className="text-xl text-gray-300 mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4 text-lg">
                <Mail className="text-emerald-400" size={24} />
                <a href="mailto:md.sakib.hos3n@gmail.com" onClick={playClickSound} className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  md.sakib.hos3n@gmail.com
                </a>
              </div>
              
              <div className="flex items-center justify-center gap-4 text-lg">
                <Phone className="text-emerald-400" size={24} />
                <span className="text-gray-300">+880 1971 311958</span>
              </div>
              
              <div className="flex justify-center gap-6 mt-8">
                <a
                  href="https://github.com/chatok-jnr"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  className="px-8 py-4 bg-emerald-500 text-gray-900 rounded-lg font-semibold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 hover:scale-110 transform"
                >
                  <Github className="inline mr-2" size={20} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/chatok-junior/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  className="px-8 py-4 bg-emerald-500 text-gray-900 rounded-lg font-semibold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 hover:scale-110 transform"
                >
                  <Linkedin className="inline mr-2" size={20} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 border-t border-emerald-500/20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>© 2025 Md. Sakib Hosen. Built with React & Tailwind CSS</p>
          <p className="mt-2 text-emerald-400">Competitive Programmer | Backend Developer</p>
        </div>
      </footer>

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