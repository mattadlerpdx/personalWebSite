import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../contexts/ThemeContext';
import { GLOW_COLORS, GLOW_COLORS_DARK } from '../utils/animationConstants';

export default function KaleidoscopeTechStack({ className = '' }) {
  const { darkMode } = useTheme();
  const containerRef = useRef(null);
  const iconRefs = useRef([]);
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

  // Handle container resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(updateSize, 10);
    window.addEventListener('resize', updateSize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  // GSAP animations for floating and glowing
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const animations = [];

    iconRefs.current.forEach((iconEl, i) => {
      if (!iconEl) return;

      // Get glow color for this icon
      const glowColors = darkMode ? GLOW_COLORS_DARK : GLOW_COLORS;
      const glowColor = glowColors[i % glowColors.length];

      // Random float parameters
      const floatRange = 10 + Math.random() * 10;
      const angle = Math.random() * Math.PI * 2;
      const dx = floatRange * Math.cos(angle);
      const dy = floatRange * Math.sin(angle);
      const floatDuration = 6 + Math.random() * 2;

      // Float animation
      const floatAnim = gsap.to(iconEl, {
        x: dx,
        y: dy,
        duration: floatDuration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Glow animation
      const baseGlow = `0 0 0px 0 ${glowColor}`;
      const fullGlow = `0 0 16px 8px ${glowColor}`;

      const glowAnim = gsap.fromTo(
        iconEl,
        { boxShadow: baseGlow },
        {
          boxShadow: fullGlow,
          duration: 3, // Fixed duration for glow pulse
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 3,
        }
      );

      animations.push(floatAnim, glowAnim);
    });

    // Cleanup function
    return () => {
      animations.forEach((anim) => anim.kill());
    };
  }, [darkMode, dimensions]);

  const CENTER_X = dimensions.width / 2;
  const CENTER_Y = dimensions.height / 2;
  const RADIUS = Math.min(dimensions.width, dimensions.height) / 2.2;

  // Only render icons if we have dimensions
  const hasValidDimensions = dimensions.width > 0 && dimensions.height > 0;

  return (
    <section className={`mt-24 sm:mt-32 ${className}`}>
      <div
        ref={containerRef}
        className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] transition-colors duration-500 ease-in-out"
      >
        {/* Center icon (user) */}
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

        {/* Tech icons in circle */}
        {hasValidDimensions && techIcons.map((icon, i) => {
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
              ref={(el) => (iconRefs.current[i] = el)}
              className="absolute w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center transition-colors duration-500 ease-in-out"
              style={{
                top: `${y}px`,
                left: `${x}px`,
                transform: 'translate(-50%, -50%)',
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
