import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { DURATIONS, EASINGS } from '../utils/animationConstants';

export default function FaviconGridIntro({ onComplete }) {
  const containerRef = useRef();
  const boxARef = useRef();
  const boxBRef = useRef();

  useEffect(() => {
    const screenWidth = window.innerWidth - 80; // box size offset

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: DURATIONS.MEDIUM,
          ease: EASINGS.SMOOTH_IN_OUT,
          onComplete: onComplete
        });
      }
    });

    tl.to(boxARef.current, { x: screenWidth, duration: DURATIONS.VERY_SLOW, ease: EASINGS.SMOOTH_IN_OUT })
      .to(boxBRef.current, { x: screenWidth, duration: DURATIONS.MEDIUM, ease: EASINGS.SMOOTH_IN_OUT }, "-=1");

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-around transition-opacity duration-500"
    >
      <div ref={boxARef} className="w-20 h-20 bg-blue-500" />
      <div ref={boxBRef} className="w-20 h-20 bg-pink-500" />
    </div>
  );
}
