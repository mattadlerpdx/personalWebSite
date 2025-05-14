import React from 'react';

export default function KaleidoscopeTechStack() {
  const ICON_SIZE = 60;
  const CONTAINER_SIZE = 400;
  const CENTER = CONTAINER_SIZE / 2;
  const RADIUS = 140;

  const techIcons = [
    { src: '/images/csharp.png', alt: 'C#' },
    { src: '/images/net.png', alt: '.NET' },
    { src: '/images/go.png', alt: 'Go' },
    { src: '/images/docker.png', alt: 'Docker' },
    { src: '/images/gcloud.png', alt: 'Google Cloud' },
    { src: '/images/git.png', alt: 'Git' },
  ];

  return (
    <div
      className="relative mx-auto"
      style={{ width: `${CONTAINER_SIZE}px`, height: `${CONTAINER_SIZE}px` }}
    >
      {/* Center icon */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
  bg-white rounded-full shadow-md p-3 z-10 animate-glow-pulse">        
  <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000"
          strokeWidth="2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>

      {/* Floating icons in a circle */}
{techIcons.map((icon, i) => {
  const angle = (2 * Math.PI * i) / techIcons.length;
  const x = CENTER + RADIUS * Math.cos(angle);
  const y = CENTER + RADIUS * Math.sin(angle);

  const glowColors = [
    'rgba(0, 153, 255, 0.3)',   // C#
    'rgba(145, 71, 255, 0.3)',  // .NET
    'rgba(0, 200, 0, 0.3)',     // Go
    'rgba(0, 190, 255, 0.3)',   // Docker
    'rgba(255, 175, 0, 0.3)',   // GCloud
    'rgba(255, 0, 128, 0.3)',   // Git
  ];

  return (
    <div
      key={i}
      className="absolute w-[60px] h-[60px] bg-white rounded-full shadow-md flex items-center justify-center animate-float-organic"
      style={{
        top: `${y}px`,
        left: `${x}px`,
        transform: 'translate(-50%, -50%)',
        animationDelay: `${Math.random() * 2}s`,
        animation: 'floatOrganic 4s ease-in-out infinite, glowPulse 3.5s ease-in-out infinite',
        boxShadow: `0 0 0 0 ${glowColors[i % glowColors.length]}`,
      }}
    >
      <img src={icon.src} alt={icon.alt} className="w-9 h-9 object-contain" />
    </div>
  );
})}

    </div>
  );
}
