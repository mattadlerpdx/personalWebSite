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
        end: '+=800',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          setShowChevron(self.progress < 0.2);
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
  className="relative z-0 min-h-[50vh] bg-white dark:bg-black"
>
  <div className="sticky h-screen flex items-start justify-center pt-20 px-4 sm:px-8">
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center text-center">
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

      {showChevron && (
        <div className="mt-40"> {/* margin-top to create small gap */}
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
