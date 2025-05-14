import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '../components/Hero';
import About from '../components/About';
import KaleidoscopeTechStack from '../components/KaleidoscopeTechStack';
import Projects from '../components/Projects';

function HomePage() {
  const heroSectionRef = useRef(null);

  useEffect(() => {
    const words = gsap.utils.toArray('.word');
    
    gsap.set(words, {
      opacity: 0.2,
      color: '#9ca3af', // faded gray for both modes
    });

    const animation = gsap.to(words, {
      opacity: 1,
      color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
      stagger: 0.2,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: 'top top',
        end: '+=1000',
        scrub: true,
        pin: true,
      },
    });

    const handlePageShow = () => ScrollTrigger.refresh();
    window.addEventListener('pageshow', handlePageShow);
    ScrollTrigger.refresh();

    return () => {
      animation.scrollTrigger?.kill();
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <section ref={heroSectionRef}>
        <Hero />
      </section>
      <About />
      <KaleidoscopeTechStack />
      <Projects />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/projects"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              View All Projects
            </Link>
            <Link
              to="/resume"
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Download Resume
            </Link>
            <Link
              to="/contact"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage; 