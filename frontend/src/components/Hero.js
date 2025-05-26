import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ darkMode, triggerRef }) {
  const sectionRef = useRef(triggerRef);
  const [showChevron, setShowChevron] = useState(true);

  useEffect(() => {
    const words = gsap.utils.toArray('.word');
    const color = darkMode ? '#ffffff' : '#000000';

    gsap.set(words, { autoAlpha: 0.2, color: '#9ca3af' });

    const tl = gsap.to(words, {
      autoAlpha: 1,
      color,
      stagger: 0.2,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom+=200', // enough scroll space, not bloated
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setShowChevron(self.progress < 0.6);
        },
      },


    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [darkMode]);


  const sentence = [
    'Turning', 'ideas', 'into', 'reality.', 'One', 'line', 'of', 'code', 'at', 'a', 'time...'
  ];

  return (
<section
  ref={sectionRef}
  className="h-screen md:h-[90vh] flex justify-center items-center px-4 md:px-12 pt-16 md:pt-24 relative overflow-hidden transition-colors duration-500 ease-in-out"
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

      </div>
        <ChevronDownIcon
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 text-gray-400 dark:text-white animate-bounce z-50 transition-opacity duration-300 ease-in-out ${
          showChevron ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />
    </section>
  );
}