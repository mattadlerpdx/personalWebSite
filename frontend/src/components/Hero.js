import React, { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Hero({ darkMode }) {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sentence = [
    'Shaping', 'the', 'future,', 'one', 'line', 'of', 'code', 'at', 'a', 'time.'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 400;
      const currentScroll = window.scrollY;
      const progress = Math.min(1, currentScroll / maxScroll);
      setScrollProgress(progress);
    };

    handleScroll(); // initialize on load

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full z-10 transition-all duration-300
      min-h-screen pt-20 pb-20 sm:pb-28 md:pb-36 flex justify-center items-center px-4 sm:px-8 bg-white dark:bg-black"
    >
      <div className="max-w-screen-xl mx-auto w-full text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold flex flex-wrap gap-2 justify-center">
          {sentence.map((word, i) => {
            const fillSpeed = sentence.length + 4;
            const wordProgress = scrollProgress * fillSpeed - i;
            const opacity = Math.min(1, Math.max(0.3, wordProgress));
            const color = darkMode ? '#ffffff' : '#000000';
            return (
              <span
                key={i}
                className="word inline-block transition-opacity duration-200"
                style={{ opacity, color }}
              >
                {word}
              </span>
            );
          })}
        </h1>
      </div>

      {scrollProgress < 0.6 && (
        <div className="absolute bottom-4 sm:bottom-6 w-full flex justify-center z-50">
          <ChevronDownIcon
            className="w-10 h-10 text-gray-400 dark:text-white animate-bounce transition-opacity duration-300 ease-in-out"
            aria-hidden="true"
          />
        </div>
      )}
    </section>
  );
}


