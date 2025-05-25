import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';
import Footer from './components/Footer';

import Navbar from './components/Navbar';
import AppRoutes from './AppRoutes';
import GreetingOverlay3D from './components/GreetingOverlay3D';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [showGreeting, setShowGreeting] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  
  const navBarRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleGreetingComplete = () => {
    setShowGreeting(false);
    setTimeout(() => {
      setContentVisible(true);

    // ✅ ScrollTrigger.refresh() — Final fix goes right here
    requestAnimationFrame(() => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100); // short delay ensures layout + refs settle
    });

    }, 300);
  };

  return (
    <Router>
      {showGreeting ? (
        <GreetingOverlay3D onComplete={handleGreetingComplete} />
      ) : (
        <div
          className={clsx(
            "bg-white text-black dark:bg-black dark:text-white",
            "transition-colors duration-300 transition-opacity duration-1000 ease-in-out",
            contentVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} sectionRef={navBarRef} />
          <main className="pt-16">
            <AppRoutes darkMode={darkMode} triggerRef={navBarRef} />
          </main>
           <Footer darkMode={darkMode}/>
        </div>
      )}
    </Router>
  );
}

export default App;
