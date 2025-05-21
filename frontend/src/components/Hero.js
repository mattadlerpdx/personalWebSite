import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import useScrollTop from '../hooks/useScrollTop'; // ⬅️ import hook

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ darkMode }) {
  const sectionRef = useRef(null);
  const animationRef = useRef(null);
  const atTop = useScrollTop(); // ⬅️ use hook

  useEffect(() => {
    const words = gsap.utils.toArray('.word');
    gsap.set(words, { autoAlpha: 0.2, color: '#9ca3af' });

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

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  const sentence = [
    'Turning', 'ideas', 'into', 'reality.', 'One', 'line', 'of', 'code', 'at', 'a', 'time...'
  ];

  return (
    <section
      ref={sectionRef}
      className="opacity-0 min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden transition-colors duration-500 ease-in-out px-4"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold flex flex-wrap gap-2 max-w-7xl text-left">
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

      {atTop && (
        <ChevronDownIcon
          className="absolute bottom-10 h-12 w-12 text-gray-400 dark:text-white animate-bounce z-10 transition-colors duration-500 ease-in-out"
          aria-hidden="true"
        />
      )}
    </section>
  );
}
