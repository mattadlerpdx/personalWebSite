import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MoonIcon, SunIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { gsap } from 'gsap';

const Navbar = ({ darkMode, toggleDarkMode, animate, sectionRef }) => {
  const location = useLocation();
  const navRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (animate) {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.1 }
      );
    }
  }, [animate]);

  return (
    <nav
      ref={sectionRef || navRef}
      className="fixed top-0 w-full bg-white dark:bg-black shadow z-50 flex justify-between items-center px-6 py-4 transition-colors duration-300"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2" aria-label="Home">
        <img
          src="/centeredSvg.svg"
          alt="Matt Adler Logo"
          title="Matt Adler"
          className="w-7 h-7 rounded-sm hover:scale-105 transition-transform"
        />
      </Link>

      {/* Hamburger Icon for mobile */}
      <div className="flex items-center sm:hidden">
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
      <div className="hidden sm:flex items-center space-x-6">
        <Link
          to="/about"
          className={`hover:underline dark:text-white ${location.pathname === '/about' ? 'underline' : ''}`}
        >
          About
        </Link>
        <Link
          to="/projects"
          className={`hover:underline dark:text-white ${location.pathname === '/projects' ? 'underline' : ''}`}
        >
          Projects
        </Link>
        <Link
          to="/contact"
          className={`hover:underline dark:text-white ${location.pathname === '/contact' ? 'underline' : ''}`}
        >
          Contact
        </Link>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded transition-colors duration-200 text-black dark:text-white"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white dark:bg-black shadow-md sm:hidden flex flex-col items-center space-y-4 py-4 transition-all duration-300 ease-in-out ${isMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
      >
        <Link
          to="/about"
          onClick={() => setIsMenuOpen(false)}
          className="hover:underline dark:text-white"
        >
          About
        </Link>
        <Link
          to="/projects"
          onClick={() => setIsMenuOpen(false)}
          className="hover:underline dark:text-white"
        >
          Projects
        </Link>
        <Link
          to="/contact"
          onClick={() => setIsMenuOpen(false)}
          className="hover:underline dark:text-white"
        >
          Contact
        </Link>
        <button
          onClick={() => {
            toggleDarkMode();
            setIsMenuOpen(false);
          }}
          className="p-2 rounded transition-colors duration-200 text-black dark:text-white"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
        </button>
      </div>

    </nav>
  );
};

export default Navbar;
