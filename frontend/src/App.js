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
  const heroSectionRef = useRef(null);
  const navbarRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  // Enable/disable Tailwind dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const words = gsap.utils.toArray('.word');
    const navbarHeight = navbarRef.current?.offsetHeight || 0;

    gsap.set(words, {
      opacity: 0.2,
      color: '#9ca3af', // faded gray for both modes
    });

    const color = darkMode ? '#ffffff' : '#000000';

    const animation = gsap.to(words, {
      opacity: 1,
      color: color,
      stagger: 0.2,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: `top+=${navbarHeight} top`,
        end: '+=1000',
        scrub: true,
        pin: true,
      },
    });

    const handlePageShow = () => ScrollTrigger.refresh();
    window.addEventListener('pageshow', handlePageShow);
    ScrollTrigger.refresh();

    return () => {
      animation.scrollTrigger?.kill(); // kill old one on re-run
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [darkMode]); // 👈 re-run when darkMode changes

  return (
    <div className="font-sans bg-white text-black dark:bg-black dark:text-white min-h-screen transition-colors duration-300">
      <Navbar ref={navbarRef} darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <section ref={heroSectionRef}>
        <Hero />
      </section>
      <About />
      <KaleidoscopeTechStack />
      <Projects />
    </div>
  );
}

export default App;
