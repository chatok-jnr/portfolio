import { useState, useEffect } from 'react';

const FlippingName = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [currentFace, setCurrentFace] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const names = ['Chatok Junior', 'Md. Sakib Hosen'];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setCurrentFace((prev) => (prev + 1) % 2); // Rotate between 2 faces
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRotate]);

  // Update rotation based on current face
  useEffect(() => {
    const rotations = [
      { x: 0, y: 0 },      // Front - Chatok Junior
      { x: -180, y: 0 },   // Bottom - Md. Sakib Hosen (flip vertically)
    ];
    setRotation(rotations[currentFace]);
  }, [currentFace]);

  // On mobile, show only "Chatok Junior"
  if (isMobile) {
    return (
      <div 
        className="text-xl sm:text-2xl font-bold text-white transition-colors hover:text-white cursor-pointer whitespace-nowrap"
      >
        Chatok Junior
      </div>
    );
  }

  // Desktop: 3D cube flip animation
  return (
    <div 
      className="text-xl sm:text-2xl font-bold text-white transition-colors hover:text-white cursor-pointer whitespace-nowrap"
      onMouseEnter={() => setAutoRotate(false)}
      onMouseLeave={() => setAutoRotate(true)}
      style={{
        perspective: '1000px',
        minWidth: '280px',
        position: 'relative',
        height: '2rem',
      }}
    >
      <div 
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: 'transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
          WebkitTransformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Front face - Chatok Junior */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            transform: 'translateZ(1px)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }}
        >
          {names[0]}
        </div>

        {/* Bottom face - Md. Sakib Hosen */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            transform: 'rotateX(180deg) translateZ(1px)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }}
        >
          {names[1]}
        </div>
      </div>
    </div>
  );
};

export default FlippingName;
