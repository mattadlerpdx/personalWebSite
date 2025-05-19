import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ darkMode }) {
  const sectionRef = useRef(null);
  const [showChevron, setShowChevron] = useState(true);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const words = gsap.utils.toArray('.word');
    gsap.set(words, {
      autoAlpha: 0.2,
      color: '#9ca3af',
    });

    const color = darkMode ? '#ffffff' : '#000000';

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top+=64',
        end: 'bottom top',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(words, {
      autoAlpha: 1,
      color,
      stagger: 0.2,
      ease: 'none',
      duration: 1,
    });

    animationRef.current = tl;

    return () => {
      animationRef.current?.scrollTrigger?.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
    "The", "world", "is", "built", "on",
    "code.", "Let's", "write", "it...",
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden transition-colors duration-500 ease-in-out"
    >
      {/* Main hero content */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold flex flex-wrap gap-2 max-w-7xl px-4 text-left transition-colors duration-500 ease-in-out">
        {sentence.map((word, i) => (
          <span
            key={i}
            className="word text-gray-400 opacity-0"
            style={{ visibility: 'hidden' }}
          >
            {word}
          </span>
        ))}
      </h1>

      {/* Chevron */}
      {showChevron && (
        <ChevronDownIcon
          className="absolute bottom-10 h-12 w-12 text-gray-400 dark:text-white animate-bounce z-10 transition-colors duration-500 ease-in-out"
          aria-hidden="true"
        />
      )}
    </section>
  );
}

