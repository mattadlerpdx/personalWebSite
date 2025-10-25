import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Projects from '../components/Projects';
import { useTheme } from '../contexts/ThemeContext';
import usePageTransition from '../hooks/usePageTransition';

// GitHub icon glow color (neon green)
const GITHUB_GLOW_COLOR = 'rgba(0, 255, 100, 0.6)';
const GLOW_DURATION = 1.8; // seconds - faster pulse feels more energetic

export default function ProjectsPage() {
  const { darkMode } = useTheme();
  const githubIconRef = useRef();
  const containerRef = usePageTransition();

  useEffect(() => {
    if (!githubIconRef.current) return;

    const baseGlow = `0 0 0px 0 ${GITHUB_GLOW_COLOR}`;
    const fullGlow = `0 0 16px 8px ${GITHUB_GLOW_COLOR}`;

    const glowAnim = gsap.fromTo(
      githubIconRef.current,
      { boxShadow: baseGlow },
      {
        boxShadow: fullGlow,
        duration: GLOW_DURATION,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      }
    );

    return () => glowAnim.kill();
  }, [darkMode]);

  return (
    <div
      ref={containerRef}
      className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'
        }`}
    >
      {/* Glowing GitHub Icon */}
      <div className="flex justify-center items-center pt-12">
        <a
          ref={githubIconRef}
          href="https://github.com/mattadlerpdx"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-12 h-12 rounded-full flex items-center justify-center bg-white dark:bg-neutral-900 shadow-md"
        >
          <img
            src={darkMode ? '/images/github-light.png' : '/images/github-dark.png'}
            alt="GitHub"
            className="w-6 h-6 object-contain"
          />
        </a>
      </div>
      <p className="text-center mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4">
        Below are some recent projects — for the full portfolio, visit my GitHub above.
      </p>


      {/* Projects Section */}
      <Projects darkMode={darkMode} />
    </div>
  );
}
