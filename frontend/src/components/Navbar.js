import React, { forwardRef } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const Navbar = forwardRef(({ darkMode, toggleDarkMode }, ref) => {
  return (
    <nav
      ref={ref}
      className="fixed top-0 w-full bg-white dark:bg-black shadow z-50 flex justify-between items-center px-6 py-4 transition-colors duration-300"
    >
      <span className="text-xl font-bold dark:text-white">Matt</span>
      <div className="flex items-center space-x-6">
        <a href="#about" className="hover:underline dark:text-white">About</a>
        <a href="#projects" className="hover:underline dark:text-white">Projects</a>
        <a href="#contact" className="hover:underline dark:text-white">Contact</a>
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
});

export default Navbar;
