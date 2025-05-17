import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import KaleidoscopeTechStack from './components/KaleidoscopeTechStack';
import Projects from './components/Projects';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const navbarRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  // Apply Tailwind dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="font-sans bg-white text-black dark:bg-black dark:text-white min-h-screen transition-colors duration-300">
      <Navbar
        ref={navbarRef}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
      <Hero darkMode={darkMode} />
      <About />
      <KaleidoscopeTechStack />
      <Projects />
    </div>
  );
}

export default App;
