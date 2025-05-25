import React, { useEffect, useRef, useState } from 'react';

export default function KaleidoscopeTechStack({ darkMode, className = '' }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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
      srcDark: '/images/github-light.png',
      srcLight: '/images/github-dark.png',
      alt: 'GitHub',
      link: 'https://github.com/mattadlerpdx',
    },
  ];

  const glowColors = [
    'rgba(0, 153, 255, 0.3)',
    'rgba(145, 71, 255, 0.3)',
    'rgba(0, 200, 0, 0.3)',
    'rgba(0, 190, 255, 0.3)',
    'rgba(255, 175, 0, 0.3)',
    'rgba(255, 0, 128, 0.3)',
    'rgba(0, 200, 80, 0.3)',
  ];

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const styleSheet = document.styleSheets[0];

    techIcons.forEach((_, i) => {
      const glowColor = darkMode
        ? glowColors[i % glowColors.length].replace('0.3', '0.6')
        : glowColors[i % glowColors.length];

      const ruleName = `@keyframes glowPulse-${i} {
        0%, 100% { box-shadow: 0 0 0px 0 ${glowColor}; }
        50% { box-shadow: 0 0 16px 8px ${glowColor}; }
      }`;

      const exists = Array.from(styleSheet.cssRules).some(
        (rule) => rule.name === `glowPulse-${i}`
      );
      if (!exists) {
        styleSheet.insertRule(ruleName, styleSheet.cssRules.length);
      }

      const el = document.getElementById(`tech-icon-${i}`);
      if (el) {
        const floatRange = 10 + Math.random() * 10;
        const angle = Math.random() * Math.PI * 2;
        const dx = floatRange * Math.cos(angle);
        const dy = floatRange * Math.sin(angle);

        el.animate(
          [
            { transform: `translate(-50%, -50%) translate(0px, 0px)` },
            { transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px)` },
            { transform: `translate(-50%, -50%) translate(0px, 0px)` },
          ],
          {
            duration: 6000 + Math.random() * 2000,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out',
          }
        );
      }
    });
  }, [darkMode, dimensions]);

  const CENTER_X = dimensions.width / 2;
  const CENTER_Y = dimensions.height / 2;
  const RADIUS = Math.min(dimensions.width, dimensions.height) / 2.2;

  return (
    <section className={`mt-24 sm:mt-32 ${className}`}>
      <div
        ref={containerRef}
        className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] transition-colors duration-500 ease-in-out"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-neutral-900 rounded-full shadow-md p-3 z-10 w-10 h-10 flex items-center justify-center transition-colors duration-500 ease-in-out">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={darkMode ? '#fff' : '#000'}
            strokeWidth="2"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 transition-colors duration-500 ease-in-out"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="5" />
          </svg>
        </div>

        {techIcons.map((icon, i) => {
          const angle = (2 * Math.PI * i) / techIcons.length;
          const x = CENTER_X + RADIUS * Math.cos(angle);
          const y = CENTER_Y + RADIUS * Math.sin(angle);

          const imgSrc =
            icon.alt === 'GitHub'
              ? darkMode
                ? icon.srcDark
                : icon.srcLight
              : icon.src;

          return (
            <div
              key={i}
              id={`tech-icon-${i}`}
              className="absolute w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center transition-colors duration-500 ease-in-out"
              style={{
                top: `${y}px`,
                left: `${x}px`,
                transform: 'translate(-50%, -50%)',
                animation: `glowPulse-${i} 3s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              {icon.link ? (
                <a href={icon.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={imgSrc}
                    alt={icon.alt}
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain transition duration-500 ease-in-out"
                  />
                </a>
              ) : (
                <img
                  src={imgSrc}
                  alt={icon.alt}
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain transition duration-500 ease-in-out"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
