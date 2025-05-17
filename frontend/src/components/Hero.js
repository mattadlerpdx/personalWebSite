import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ darkMode }) {
  const sectionRef = useRef(null);
  const [showChevron, setShowChevron] = useState(true);
  const [showGreeting, setShowGreeting] = useState(true);


  // Scroll-triggered word animation
  useEffect(() => {
    const words = gsap.utils.toArray('.word');
    gsap.set(words, {
      opacity: 0.2,
      color: '#9ca3af',
    });

    const color = darkMode ? '#ffffff' : '#000000';

    const animation = gsap.to(words, {
      opacity: 1,
      color: color,
      stagger: 0.2,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: true,
      },
    });

    ScrollTrigger.refresh();

    return () => {
      animation.scrollTrigger?.kill();
    };
  }, [darkMode]);

  // Show/hide chevron based on scroll
  useEffect(() => {
    const onScroll = () => {
      setShowChevron(window.scrollY <= 10);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const sentence = [
    'Building', 'the', 'future,', 'one',
    'line', 'of', 'code', 'at', 'a', 'time.'
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden"
    >
      {/* Main hero content (underneath greeting) */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold flex flex-wrap gap-2 max-w-7xl px-4 text-left">
          {sentence.map((word, i) => (
            <span key={i} className="word">{word}</span>
          ))}
        </h1>

      {/* Chevron */}
      {showChevron && (
        <ChevronDownIcon
          className="absolute bottom-10 h-12 w-12 text-gray-400 dark:text-white animate-bounce z-10"
          aria-hidden="true"
        />
      )}
    </section>
  );
}
