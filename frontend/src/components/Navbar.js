import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { gsap } from 'gsap';

const Navbar = ({ darkMode, toggleDarkMode, animate }) => {
  const location = useLocation();
  const navRef = useRef();

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
      ref={navRef}
      className="fixed top-0 w-full bg-white dark:bg-black shadow z-50 flex justify-between items-center px-6 py-4 transition-colors duration-300"
    >
      <Link to="/" className="text-xl font-bold dark:text-white">Matt</Link>
      <div className="flex items-center space-x-6">
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
          {darkMode ? (
            <MoonIcon className="h-6 w-6" />
          ) : (
            <SunIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
