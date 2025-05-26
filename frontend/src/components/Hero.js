import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ darkMode }) {
  const sectionRef = useRef(null);
  const [showChevron, setShowChevron] = useState(true);

  useEffect(() => {
    const words = gsap.utils.toArray('.word');
    const color = darkMode ? '#ffffff' : '#000000';

    gsap.set(words, { autoAlpha: 0.2, color: '#9ca3af' });

    const animation = gsap.to(words, {
      autoAlpha: 1,
      color,
      stagger: 0.2,
      ease: 'none',
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setShowChevron(self.progress < 0.8);
        },
      }
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [darkMode]);

  const sentence = [
    'Turning', 'ideas', 'into', 'reality.', 'One', 'line', 'of', 'code', 'at', 'a', 'time...'
  ];

  return (
    <section
      ref={sectionRef}
      className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 ease-in-out px-4"
    >
      <div className="max-w-screen-xl mx-auto w-full text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold flex flex-wrap gap-2 justify-center">
          {sentence.map((word, i) => (
            <span
              key={i}
              className="word inline-block"
              style={{ opacity: 0 }}
            >
              {word}
            </span>
          ))}
        </h1>

        <ChevronDownIcon
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 w-10 h-10 text-gray-400 dark:text-white animate-bounce z-50 transition-opacity duration-300 ease-in-out ${
            showChevron ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
