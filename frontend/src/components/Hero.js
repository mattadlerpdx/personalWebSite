import React, { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  const [showChevron, setShowChevron] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setShowChevron(false);
      } else {
        setShowChevron(true);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const sentence = [
    'Building', 'the', 'future,', 'one',
    'line', 'of', 'code', 'at', 'a', 'time.'
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center relative">
<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold flex flex-wrap gap-2 max-w-7xl px-4 text-left">
{sentence.map((word, i) => (
          <span key={i} className="word">{word}</span>
        ))}
      </h1>
      {showChevron && (
        <ChevronDownIcon
          className="absolute bottom-10 h-12 w-12 text-gray-00 animate-bounce"
          aria-hidden="true"
        />

      )}

    </section>
  );
}
