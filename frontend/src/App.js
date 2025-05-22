import React, { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import AppRoutes from './AppRoutes';
import GreetingOverlay3D from './components/GreetingOverlay3D';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [showGreeting, setShowGreeting] = useState(true);
  const [contentVisible, setContentVisible] = useState(false); // NEW

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleGreetingComplete = () => {
    setShowGreeting(false);
    // Wait a brief moment before animating in content
    setTimeout(() => setContentVisible(true), 300); // slight delay
  };

  return (
    <Router>
      {showGreeting ? (
        <GreetingOverlay3D onComplete={handleGreetingComplete} />
      ) : (
        <div
          className={`min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300 ${
            contentVisible ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-1000 ease-in-out`}
        >
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <div className="pt-16">
            <AppRoutes />
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;