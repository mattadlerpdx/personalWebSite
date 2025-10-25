import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MoonIcon, SunIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { gsap } from 'gsap';
import { getResumeUrl } from '../api';
import { useTheme } from '../contexts/ThemeContext';
import { DURATIONS, EASINGS } from '../utils/animationConstants';

const Navbar = ({ animate, sectionRef }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (animate) {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: DURATIONS.MEDIUM, ease: EASINGS.SMOOTH, delay: 0.01 }
      );
    }
  }, [animate]);

  // Home button click handler
  const handleHomeClick = () => {
    if (location.pathname === '/' || location.hash === '#/' || location.pathname === '/#') {
      window.scrollTo(0, 0);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      ref={sectionRef || navRef}
      className="fixed top-0 w-full bg-white dark:bg-black shadow z-50 flex justify-between items-center px-6 py-4 transition-colors duration-300"
    >
      {/* Logo/Home Button */}
      <Link
        to="/"
        onClick={handleHomeClick}
        className="flex items-center gap-2"
        aria-label="Home"
      >
        <img
          src="/centeredSvg.svg"
          alt="Matt Adler Logo"
          title="Matt Adler"
          className="w-7 h-7 rounded-sm hover:scale-105 transition-transform"
        />
      </Link>

      {/* Hamburger Icon for mobile */}
      <div className="flex-col items-end sm:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-black dark:text-white"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center space-x-2">
        <Link
          to="/about"
          className={`px-3 py-1.5 rounded-md transition-all duration-200 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-105 active:scale-95 ${location.pathname === '/about' ? 'bg-gray-100 dark:bg-white/10' : ''}`}
        >
          About
        </Link>
        <a
          href={getResumeUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-md transition-all duration-200 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-105 active:scale-95"
        >
          Resume
        </a>
        <Link
          to="/projects"
          className={`px-3 py-1.5 rounded-md transition-all duration-200 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-105 active:scale-95 ${location.pathname === '/projects' ? 'bg-gray-100 dark:bg-white/10' : ''}`}
        >
          Projects
        </Link>
        <Link
          to="/contact"
          className={`group px-3 py-1.5 rounded-md transition-all duration-200 hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-105 active:scale-95 active:bg-gray-200 dark:active:bg-white/20 ${location.pathname === '/contact' ? 'bg-gray-100 dark:bg-white/10' : ''}`}
        >
          <span className="pb-1 transition-all duration-300 group-hover:bg-gradient-miami group-hover:bg-200 group-hover:animate-shimmer group-hover:bg-clip-text group-hover:text-transparent">Contact</span>
        </Link>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md transition-all duration-200 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-105 active:scale-95"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute top-full left-0 right-0 bg-white dark:bg-black shadow-md sm:hidden flex flex-col items-end space-y-2 py-4 w-full transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <Link
          to="/about"
          onClick={() => setIsMenuOpen(false)}
          className={`px-4 py-2 w-full text-right transition-all duration-150 dark:text-white active:bg-gray-200 dark:active:bg-white/20 ${location.pathname === '/about' ? 'bg-gray-100 dark:bg-white/10' : ''}`}
        >
          About
        </Link>
        <a
          href={getResumeUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsMenuOpen(false)}
          className="px-4 py-2 w-full text-right transition-all duration-150 dark:text-white active:bg-gray-200 dark:active:bg-white/20"
        >
          Resume
        </a>
        <Link
          to="/projects"
          onClick={() => setIsMenuOpen(false)}
          className={`px-4 py-2 w-full text-right transition-all duration-150 dark:text-white active:bg-gray-200 dark:active:bg-white/20 ${location.pathname === '/projects' ? 'bg-gray-100 dark:bg-white/10' : ''}`}
        >
          Projects
        </Link>
        <Link
          to="/contact"
          onClick={() => setIsMenuOpen(false)}
          className={`group px-4 py-2 w-full text-right transition-all duration-150 active:bg-gray-200 dark:active:bg-white/20 ${location.pathname === '/contact' ? 'bg-gray-100 dark:bg-white/10' : ''}`}
        >
          <span className="dark:text-white">Contact</span>
        </Link>
        <button
          onClick={() => {
            toggleDarkMode();
            setIsMenuOpen(false);
          }}
          className="p-2 rounded-md transition-all duration-150 text-black dark:text-white active:bg-gray-200 dark:active:bg-white/20 mt-2 mr-4"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
