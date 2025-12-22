import { useState, useEffect } from 'react';

const FlippingName = () => {
  const [showFirst, setShowFirst] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // On mobile, use simple fade instead of 3D rotation
  if (isMobile) {
    return (
      <div 
        className="text-xl sm:text-2xl font-bold text-white transition-colors hover:text-white cursor-pointer whitespace-nowrap"
        style={{
          minWidth: '280px',
          position: 'relative',
        }}
      >
        <div
          style={{
            // opacity and transition removed
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }}
        >
          Chatok Junior
        </div>
        <div
          style={{
            // opacity and transition removed
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }}
        >
          Md. Sakib Hosen
        </div>
        <div style={{ opacity: 0, pointerEvents: 'none' }}>
          Md. Sakib Hosen
        </div>
      </div>
    );
  }

  // Desktop: keep 3D flip animation
  return (
    <div 
      className="text-xl sm:text-2xl font-bold text-white transition-colors hover:text-white cursor-pointer whitespace-nowrap"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        minWidth: '280px',
        position: 'relative',
      }}
    >
      <div
        style={{
          transform: showFirst ? 'rotateX(0deg)' : 'rotateX(90deg)',
          // opacity and transition removed
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }}
      >
        Chatok Junior
      </div>
      <div
        style={{
          transform: !showFirst ? 'rotateX(0deg)' : 'rotateX(-90deg)',
          // opacity and transition removed
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }}
      >
        Md. Sakib Hosen
      </div>
      <div style={{ opacity: 0, pointerEvents: 'none' }}>
        Md. Sakib Hosen
      </div>
    </div>
  );
};

export default FlippingName;
