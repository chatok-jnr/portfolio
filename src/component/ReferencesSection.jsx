import React from 'react';
import { Quote, Mail, Phone } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const references = [
  {
    name: 'Mrinmoy Biswas Akash',
    role: 'Lecturer and Course Coordinator',
    organization: 'University of Information Technology & Sciences',
    email: 'mrinmoy.biswas@uits.edu.bd',
    phone: '+8801782246931',
    phoneLabel: '+880 1782 246931',
  },
  {
    name: 'Golam Zilane',
    role: 'Software Engineer L2',
    organization: 'Brain Station 23',
    email: 'golamjilane1@gmail.com',
    phone: '+8801609286465',
    phoneLabel: '+880 1609 286465',
  },
];

export default function ReferencesSection() {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const [isMobile, setIsMobile] = React.useState(false);
  const [ripples, setRipples] = React.useState({});

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setRipples(prev => ({
      ...prev,
      [id]: { x, y, active: true }
    }));
  };

  const handleMouseLeave = (id) => {
    setRipples(prev => ({
      ...prev,
      [id]: { ...prev[id], active: false }
    }));
  };

  return (
    <section
      ref={elementRef}
      id="references"
      className={`min-h-[40vh] flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-4xl w-full mx-auto">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">
          {!isMobile && <Quote className="inline mr-2 sm:mr-3 w-8 h-8 sm:w-12 sm:h-12" />}
          References
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {references.map((reference) => (
            <article
              key={reference.email}
              className="glass glow p-6 sm:p-8 text-left transition-all relative overflow-hidden h-full"
              onMouseMove={(e) => handleMouseMove(e, reference.email)}
              onMouseLeave={() => handleMouseLeave(reference.email)}
              style={{
                transform: ripples[reference.email]?.active
                  ? `perspective(1000px) rotateX(${(ripples[reference.email].y - 50) * 0.05}deg) rotateY(${(ripples[reference.email].x - 50) * 0.05}deg)`
                  : 'none',
                transition: 'transform 0.1s ease-out'
              }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white">{reference.name}</h3>
              <p className="text-white mt-2 leading-relaxed">{reference.role}</p>
              <p className="text-white/80 text-sm mt-1 leading-relaxed">{reference.organization}</p>

              <div className="mt-6 space-y-4">
                <a
                  href={`mailto:${reference.email}`}
                  className="flex items-center gap-3 px-3 py-2 text-white hover:text-white transition-all font-semibold break-all"
                >
                  <Mail className="shrink-0" size={20} />
                  {reference.email}
                </a>
                <a
                  href={`tel:${reference.phone}`}
                  className="flex items-center gap-3 px-3 py-2 text-white hover:text-white transition-all font-semibold"
                >
                  <Phone className="shrink-0" size={20} />
                  {reference.phoneLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
