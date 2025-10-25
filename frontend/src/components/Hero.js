import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { darkMode } = useTheme();
  const sectionRef = useRef(null);
  const [showChevron, setShowChevron] = useState(true);

  useEffect(() => {
    // Scope word selection to this component only
    const words = sectionRef.current?.querySelectorAll('.word');
    if (!words || words.length === 0) return;

    const color = darkMode ? '#ffffff' : '#000000';

    // Set initial state
    gsap.set(words, { autoAlpha: 0.2, color: '#9ca3af' });

    // Create animation with ScrollTrigger
    const tl = gsap.to(words, {
      autoAlpha: 1,
      color,
      stagger: 0.2,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=800',
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        preventOverlaps: true,
        onUpdate: (self) => {
          setShowChevron(self.progress < 0.2);
        },
      },
    });

    // Cleanup on unmount or darkMode change
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [darkMode]);

  const sentence = [
    'Turning', 'ideas', 'into', 'reality.', 'One', 'line', 'of', 'code', 'at', 'a', 'time...'
  ];

  return (
    <section
      ref={sectionRef}
      className="relative z-0 bg-white dark:bg-black"
    >
      <div className="h-screen flex items-start justify-center pt-20 px-4 sm:px-8">
        <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold flex flex-wrap gap-2 sm:gap-3 justify-center leading-relaxed">
            {sentence.map((word, i) => (
              <span
                key={i}
                className="word inline-block whitespace-nowrap opacity-20"
                style={{ color: '#9ca3af' }}
              >
                {word}
              </span>
            ))}
          </h1>

          {showChevron && (
            <div className="mt-40">
              <ChevronDownIcon
                className="w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-gray-400 dark:text-white animate-bounce transition-opacity duration-300 ease-in-out"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
