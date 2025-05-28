// HomePage.js
import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import KaleidoscopeTechStack from '../components/KaleidoscopeTechStack';
import Projects from '../components/Projects';

const PageSection = ({ children, className = '' }) => (
  <section
    className={`w-full bg-white dark:bg-black px-4 sm:px-6 lg:px-8 py-16 md:py-24 transition-all duration-500 ease-in-out ${className}`}
  >
    <div className="max-w-screen-xl mx-auto w-full">
      {children}
    </div>
  </section>
);

export default function HomePage({ darkMode }) {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white">
      <Hero darkMode={darkMode} />

      {/* About fades in based on scroll position */}
      <PageSection>
        <About />
      </PageSection>

      <PageSection>
        <KaleidoscopeTechStack darkMode={darkMode} />
      </PageSection>

      <PageSection>
        <Projects darkMode={darkMode} />
      </PageSection>
    </div>
  );
}