import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../contexts/ThemeContext';
import usePageTransition from '../hooks/usePageTransition';
import {
  DURATIONS,
  EASINGS,
  SCROLL_TRIGGER_DEFAULTS,
  STORY_GLOW_LIGHT,
  STORY_GLOW_DARK,
} from '../utils/animationConstants';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const { darkMode } = useTheme();
  const containerRef = usePageTransition({ duration: DURATIONS.MEDIUM, ease: EASINGS.SMOOTH });
  const sectionRefs = useRef([]);

  useEffect(() => {
    const sections = sectionRefs.current.filter(Boolean); // Filter out null refs

    sections.forEach((section, index) => {
      // Determine glow color for bottom glow only
      const glowColor = darkMode ? STORY_GLOW_DARK : STORY_GLOW_LIGHT;

      // Create bottom glow effect animation
      const glow = gsap.fromTo(
        section,
        { boxShadow: glowColor },
        {
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
          duration: DURATIONS.SLOW,
          ease: EASINGS.SMOOTH,
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
          duration: DURATIONS.MEDIUM_SLOW,
          ease: EASINGS.SMOOTH,
          scrollTrigger: {
            trigger: section,
            start: SCROLL_TRIGGER_DEFAULTS.start,
            toggleActions: SCROLL_TRIGGER_DEFAULTS.toggleActions,
            onEnter: () => glow.play(),
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [darkMode]);

  return (
    <section
      ref={containerRef}
      className="bg-white dark:bg-black text-black dark:text-white px-4 py-16 space-y-24"
    >
      <div
        ref={(el) => (sectionRefs.current[0] = el)}
        className="story-section max-w-3xl mx-auto text-center md:text-left p-8 md:p-12 border rounded-lg shadow-sm bg-white dark:bg-white/5 text-black dark:text-white border-gray-200 dark:border-white/10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Beginning</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-800 dark:text-gray-300 leading-relaxed">
          My journey began as an English teacher in Taiwan, where I discovered
          the power of technology to bridge cultures and transform lives. Inspired
          by this impact, I returned to the United States determined to use
          software engineering as a force for creating more meaningful change.
        </p>
      </div>

      <div
        ref={(el) => (sectionRefs.current[1] = el)}
        className="story-section max-w-3xl mx-auto text-center md:text-left p-8 md:p-12 border rounded-lg shadow-sm bg-white dark:bg-white/5 text-black dark:text-white border-gray-200 dark:border-white/10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Exploration</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-800 dark:text-gray-300 leading-relaxed">
          My journey of exploration led me to earn my master's degree in computer science,
          with a focus on systems and networking. Alongside this, I immersed myself in machine learning,
          taking coursework on neural networks, linear algebra, and clustering.
          This blend of low-level systems knowledge and data-driven approaches broadened my perspective
          and sparked my passion for building smarter, more adaptive software.
        </p>
      </div>

      <div
        ref={(el) => (sectionRefs.current[2] = el)}
        className="story-section max-w-3xl mx-auto text-center md:text-left p-8 md:p-12 border rounded-lg shadow-sm bg-white dark:bg-white/5 text-black dark:text-white border-gray-200 dark:border-white/10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Integration</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-800 dark:text-gray-300 leading-relaxed">
          My work today blends AI-driven tools, cloud-native services, and
          modern .NET platforms— always striving for practical impact and
          thoughtful engineering.
        </p>
      </div>
    </section>
  );
}
