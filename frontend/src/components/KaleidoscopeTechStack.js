import React, { useEffect } from 'react';

export default function KaleidoscopeTechStack({ darkMode }) {
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
    {
      src: '/images/gitlab.png',
      alt: 'GitLab',
      link: 'https://gitlab.com/mattadlerpdx',
    },
    {
      srcLight: '/images/github-light.png',
      srcDark: '/images/github-dark.png',
      alt: 'GitHub',
      link: 'https://github.com/mattadlerpdx',
    },
  ];

  const glowColors = [
    'rgba(0, 153, 255, 0.3)',   // C#
    'rgba(145, 71, 255, 0.3)',  // .NET
    'rgba(0, 200, 0, 0.3)',     // Go
    'rgba(0, 190, 255, 0.3)',   // Docker
    'rgba(255, 175, 0, 0.3)',   // GCloud
    'rgba(255, 0, 128, 0.3)',   // GitLab
    'rgba(255, 255, 255, 0.3)', // GitHub
  ];

  useEffect(() => {
    techIcons.forEach((_, i) => {
      const el = document.getElementById(`tech-icon-${i}`);
      if (el) {
        const baseColor = glowColors[i % glowColors.length];
        const adjustedGlow = darkMode
          ? baseColor.replace(/0\.3\)$/, '0.6)')
          : baseColor;

        el.animate(
          [
            { boxShadow: `0 0 0px 0 ${adjustedGlow}` },
            { boxShadow: `0 0 16px 10px ${adjustedGlow}` },
            { boxShadow: `0 0 0px 0 ${adjustedGlow}` },
          ],
          {
            duration: 3500,
            iterations: Infinity,
            easing: 'ease-in-out',
          }
        );
      }
    });
  }, [darkMode]);

  return (
    <div
      className="relative mx-auto transition-colors duration-500 ease-in-out"
      style={{ width: `${CONTAINER_SIZE}px`, height: `${CONTAINER_SIZE}px` }}
    >
      {/* Center icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-neutral-900 rounded-full shadow-md p-3 z-10 transition-colors duration-500 ease-in-out">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke={darkMode ? "#fff" : "#000"}
          strokeWidth="2"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-colors duration-500 ease-in-out"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>

      {/* Floating icons */}
      {techIcons.map((icon, i) => {
        const angle = (2 * Math.PI * i) / techIcons.length;
        const x = CENTER + RADIUS * Math.cos(angle);
        const y = CENTER + RADIUS * Math.sin(angle);

        const imgSrc = icon.srcDark && icon.srcLight
          ? (darkMode ? icon.srcDark : icon.srcLight)
          : icon.src;

        return (
          <div
            key={i}
            id={`tech-icon-${i}`}
            className="absolute w-[60px] h-[60px] bg-white dark:bg-neutral-800 rounded-full shadow-md flex items-center justify-center animate-float-organic transition-colors duration-500 ease-in-out"
            style={{
              top: `${y}px`,
              left: `${x}px`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            {icon.link ? (
              <a href={icon.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={imgSrc}
                  alt={icon.alt}
                  className="w-9 h-9 object-contain transition duration-500 ease-in-out"
                />
              </a>
            ) : (
              <img
                src={imgSrc}
                alt={icon.alt}
                className="w-9 h-9 object-contain transition duration-500 ease-in-out"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
