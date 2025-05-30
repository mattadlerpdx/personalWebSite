import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage({ darkMode }) {
  const containerRef = useRef();

  useEffect(() => {
    const sections = gsap.utils.toArray('.story-section');

    sections.forEach((section, index) => {
      // Determine glow color based on dark mode
      // In the GSAP glow animation section:
      const glowColor = darkMode
        ? '0 0 20px rgba(255, 255, 255, 0.4)'  // Soft white glow in dark mode
        : '0 0 20px rgba(173, 216, 230, 0.3)'; // Pastel blue glow in light mode


      // Create glow effect animation
      const glow = gsap.fromTo(
        section,
        { boxShadow: glowColor },
        {
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
          duration: 1.5,
          ease: 'power2.out',
          paused: true,
        }
      );

      // Fade/slide in animation
      gsap.fromTo(
        section,
        {
          autoAlpha: 0,
          x: index % 2 === 0 ? -50 : 50, // Alternate left/right
        },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none', // Play only once
            onEnter: () => glow.play(), // Trigger glow when entering
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [darkMode]); // Depend on darkMode for dynamic color

  return (
    <section
      ref={containerRef}
      className="bg-white dark:bg-black text-black dark:text-white px-4 py-16 space-y-24"
    >
      <div className="story-section max-w-3xl mx-auto text-center md:text-left 
  hover:shadow-[0_0_10px_rgba(255,255,255,0.4)] 
  dark:hover:shadow-[0_0_10px_rgba(255,255,255,0.4)] 
  transition-shadow duration-300">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Beginning</h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed">
          My journey began as an English teacher in Taiwan, where I discovered
          the power of technology to bridge cultures and transform lives. Inspired
          by this impact, I returned to the United States determined to use
          software engineering as a force for creating more meaningful change.
        </p>
      </div>

      <div className="story-section max-w-3xl mx-auto text-center md:text-left 
  hover:shadow-[0_0_10px_rgba(255,255,255,0.4)] 
  dark:hover:shadow-[0_0_10px_rgba(255,255,255,0.4)] 
  transition-shadow duration-300">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Exploration</h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed">
          My journey of exploration led me to earn my master's degree in computer science,
          with a focus on systems and networking. Alongside this, I immersed myself in machine learning,
          taking coursework on neural networks, linear algebra, and clustering.
          This blend of low-level systems knowledge and data-driven approaches broadened my perspective
          and sparked my passion for building smarter, more adaptive software.
        </p>
      </div>

      <div className="story-section max-w-3xl mx-auto text-center md:text-left 
  hover:shadow-[0_0_10px_rgba(255,255,255,0.4)] 
  dark:hover:shadow-[0_0_10px_rgba(255,255,255,0.4)] 
  transition-shadow duration-300">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Integration</h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed">
          My work today blends AI-driven tools, cloud-native services, and
          modern .NET platforms—always striving for practical impact and
          thoughtful engineering.
        </p>
      </div>
    </section>
  );
}
