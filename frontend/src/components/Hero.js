import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import useScrollTop from '../hooks/useScrollTop';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ darkMode }) {
  const sectionRef = useRef(null);
  const atTop = useScrollTop();

  useEffect(() => {
    const words = gsap.utils.toArray('.word');
    gsap.set(words, { autoAlpha: 0.2, color: '#9ca3af' });

    const color = darkMode ? '#ffffff' : '#000000';

    if (window.innerHeight === document.body.scrollHeight) {
      gsap.to(words, {
        autoAlpha: 1,
        color,
        stagger: 0.2,
        ease: 'none',
        duration: 1,
        delay: 0.4,
      });
    } else {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(words, {
        autoAlpha: 1,
        color,
        stagger: 0.2,
        ease: 'none',
        duration: 1,
      });
      ScrollTrigger.refresh();


      return () => {
        tl.scrollTrigger?.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [darkMode]);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );
    }
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
              className="word text-gray-400"
              style={{ visibility: 'hidden' }}
            >
              {word}
            </span>
          ))}
        </h1>

        {atTop && (
          <ChevronDownIcon
            className="fixed bottom-10 left-1/2 -translate-x-1/2 w-10 h-10 text-gray-400 dark:text-white animate-bounce z-50 transition-colors ease-in-out"
            aria-hidden="true"
          />
        )}
      </div>
    </section>
  );
}