import React, { useState, useEffect } from 'react';

const RotatingCube = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [currentFace, setCurrentFace] = useState(0);

  const faces = [
    { href: 'https://github.com/chatok-jnr', svg: 'https://cdn.simpleicons.org/github/FFFFFF', label: 'GitHub', color: '#10b981', rotation: { x: 0, y: 0 } },
    { href: 'https://www.linkedin.com/in/chatok-junior/', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg', label: 'LinkedIn', color: '#0077b5', rotation: { x: 0, y: 90 } },
    { href: 'https://discord.com/users/741680363453022279', svg: 'https://cdn.simpleicons.org/discord/5865F2', label: 'Discord', color: '#5865f2', rotation: { x: 0, y: 180 } },
    { href: 'mailto:md.sakib.hos3n@gmail.com', svg: 'https://cdn.simpleicons.org/gmail/EA4335', label: 'Email', color: '#ea4335', rotation: { x: 0, y: 270 } },
    { href: 'https://codeforces.com/profile/chatok.jr', svg: 'https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/codeforces.svg', label: 'Codeforces', color: '#1f8acb', rotation: { x: 90, y: 0 } },
    { href: 'https://www.codechef.com/users/chatok_junior', svg: 'https://avatars.githubusercontent.com/u/11960354?s=200&v=4', label: 'CodeChef', color: '#5b4638', rotation: { x: -90, y: 0 } }
  ];

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setCurrentFace((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, [autoRotate]);

  useEffect(() => {
    const rotations = [
      { x: 0, y: 0 },
      { x: 0, y: -90 },
      { x: 0, y: -180 },
      { x: 0, y: -270 },
      { x: -90, y: 0 },
      { x: 90, y: 0 },
    ];
    setRotation(rotations[currentFace]);
  }, [currentFace]);

  const handleFaceClick = (index) => {
    setAutoRotate(false);
    setCurrentFace(index);
    setTimeout(() => setAutoRotate(true), 5000);
  };

  const faceStyle = (transform) => ({
    position: 'absolute',
    width: '110px',
    height: '110px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(3px)',
    borderRadius: '0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    transform,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    isolation: 'isolate',
  });

  const renderIcon = (face) => {
    if (face.label === 'GitHub') {
      return (
        <div
          style={{
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
          }}
        >
          <img src={face.svg} alt={face.label} className="w-12 h-12 object-contain opacity-100" />
        </div>
      );
    }
    return <img src={face.svg} alt={face.label} className="w-16 h-16 object-contain opacity-100" />;
  };

  return (
    <div
      className="relative w-[110px] flex items-center justify-center"
      style={{ paddingBottom: '60px' }}
      onMouseEnter={() => setAutoRotate(false)}
      onMouseLeave={() => setAutoRotate(true)}
    >
      <div className="perspective-container" style={{ perspective: '1000px' }}>
        <div
          className="cube-3d"
          style={{
            width: '110px',
            height: '110px',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: 'transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
            WebkitTransformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          <a
            href={faces[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="cube-face cube-face-front"
            onClick={(e) => {
              e.preventDefault();
              if (currentFace === 0) window.open(faces[0].href, '_blank');
              else handleFaceClick(0);
            }}
            style={faceStyle('translateZ(55px)')}
          >
            {renderIcon(faces[0])}
            <span className="text-sm font-semibold text-white opacity-80">{faces[0].label}</span>
          </a>

          <a
            href={faces[1].href}
            target="_blank"
            rel="noopener noreferrer"
            className="cube-face cube-face-right"
            onClick={(e) => {
              e.preventDefault();
              if (currentFace === 1) window.open(faces[1].href, '_blank');
              else handleFaceClick(1);
            }}
            style={faceStyle('rotateY(90deg) translateZ(55px)')}
          >
            {renderIcon(faces[1])}
            <span className="text-sm font-semibold text-white opacity-80">{faces[1].label}</span>
          </a>

          <a
            href={faces[2].href}
            target="_blank"
            rel="noopener noreferrer"
            className="cube-face cube-face-back"
            onClick={(e) => {
              e.preventDefault();
              if (currentFace === 2) window.open(faces[2].href, '_blank');
              else handleFaceClick(2);
            }}
            style={faceStyle('rotateY(180deg) translateZ(55px)')}
          >
            {renderIcon(faces[2])}
            <span className="text-sm font-semibold text-white opacity-80">{faces[2].label}</span>
          </a>

          <a
            href={faces[3].href}
            target={faces[3].href.startsWith('mailto') ? undefined : '_blank'}
            rel={faces[3].href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            className="cube-face cube-face-left"
            onClick={(e) => {
              e.preventDefault();
              if (currentFace === 3) {
                if (faces[3].href.startsWith('mailto')) {
                  window.location.href = faces[3].href;
                } else {
                  window.open(faces[3].href, '_blank');
                }
              } else {
                handleFaceClick(3);
              }
            }}
            style={faceStyle('rotateY(-90deg) translateZ(55px)')}
          >
            {renderIcon(faces[3])}
            <span className="text-sm font-semibold text-white opacity-80">{faces[3].label}</span>
          </a>

          <a
            href={faces[4].href}
            target="_blank"
            rel="noopener noreferrer"
            className="cube-face cube-face-top"
            onClick={(e) => {
              e.preventDefault();
              if (currentFace === 4) window.open(faces[4].href, '_blank');
              else handleFaceClick(4);
            }}
            style={faceStyle('rotateX(90deg) translateZ(55px)')}
          >
            {renderIcon(faces[4])}
            <span className="text-sm font-semibold text-white opacity-80">{faces[4].label}</span>
          </a>

          <a
            href={faces[5].href}
            target="_blank"
            rel="noopener noreferrer"
            className="cube-face cube-face-bottom"
            onClick={(e) => {
              e.preventDefault();
              if (currentFace === 5) window.open(faces[5].href, '_blank');
              else handleFaceClick(5);
            }}
            style={faceStyle('rotateX(-90deg) translateZ(55px)')}
          >
            {renderIcon(faces[5])}
            <span className="text-sm font-semibold text-white opacity-80">{faces[5].label}</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="relative group">
            <button
              onClick={() => handleFaceClick(index)}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: currentFace === index ? '#10b981' : 'rgba(255, 255, 255, 0.3)',
                transform: currentFace === index ? 'scale(1.2)' : 'scale(1)',
                boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.6)',
              }}
              aria-label={`View ${faces[index].label}`}
            />
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {faces[index].label}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RotatingCube;
