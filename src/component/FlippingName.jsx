import { useState, useEffect } from 'react';

const FlippingName = () => {
  const [showFirst, setShowFirst] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="text-xl sm:text-2xl font-bold text-emerald-400 transition-colors hover:text-emerald-300 cursor-pointer whitespace-nowrap"
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
          opacity: showFirst ? 1 : 0,
          transition: 'all 0.5s ease-in-out',
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
          opacity: !showFirst ? 1 : 0,
          transition: 'all 0.5s ease-in-out',
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
