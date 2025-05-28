import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';

import Navbar from './components/Navbar';
import AppRoutes from './AppRoutes';
import GreetingOverlay3D from './components/GreetingOverlay3D';
import Footer from './components/Footer';

import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored !== null ? stored === 'true' : true; // Default to dark
  });

  const [showGreeting, setShowGreeting] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const navBarRef = useRef(null);

  // Set up dark mode on load
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Handle greeting completion
  const handleGreetingComplete = () => {
    setShowGreeting(false);

    setTimeout(() => {
      setContentVisible(true);

      requestAnimationFrame(() => {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100); // allow layout to settle
      });
    }, 300);
  };

  // Refresh ScrollTrigger on resize
  useEffect(() => {
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      {showGreeting ? (
        <GreetingOverlay3D onComplete={handleGreetingComplete} />
      ) : (
        <div
          className={clsx(
            'min-h-screen w-full overflow-x-hidden',
            'bg-white text-black dark:bg-black dark:text-white',
            'transition-colors duration-300 transition-opacity duration-1000 ease-in-out',
            contentVisible ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} sectionRef={navBarRef} />
          <main className="flex-grow flex flex-col w-full">
            <AppRoutes darkMode={darkMode} triggerRef={navBarRef} />
          </main>

          <Footer darkMode={darkMode} />
        </div>
      )}
    </Router>
  );
}

export default App;