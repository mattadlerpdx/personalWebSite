import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import KaleidoscopeTechStack from '../components/KaleidoscopeTechStack';
import Projects from '../components/Projects';
import Footer from '../components/Footer';
const PageSection = ({ children, className = '' }) => (
  <section
    className={`w-full bg-white dark:bg-black px-4 sm:px-6 lg:px-8 py-16 md:py-24 transition-colors duration-300 ${className}`}
  >
    <div className="max-w-screen-xl mx-auto w-full bg-white dark:bg-black transition-colors duration-300">
      {children}
    </div>
  </section>
);


export default function HomePage({ darkMode, triggerRef }) {
  return (

    <div className="bg-white dark:bg-black text-black dark:text-white">

      {/* Hero section (handles its own scroll/pin) */}
      <Hero darkMode={darkMode} triggerRef={triggerRef} />

      {/* ABOUT Section */}
      <PageSection >
        <About />
      </PageSection>

      {/* TECH STACK Section */}
      <PageSection >
        <KaleidoscopeTechStack darkMode={darkMode} />
      </PageSection>

      {/* PROJECTS Section */}
      <PageSection>
        <Projects darkMode={darkMode} />
      </PageSection>



    </div>
  );
}
