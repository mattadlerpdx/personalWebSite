import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function FaviconGridIntro({ onComplete }) {
  const containerRef = useRef();

  useEffect(() => {
    const screenWidth = window.innerWidth - 80; // box size offset

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.9,
          ease: 'power2.inOut',
          onComplete: onComplete
        });
      }
    });

    tl.to("#box-a", { x: screenWidth, duration: 2, ease: "power2.inOut" })
      .to("#box-b", { x: screenWidth, duration: 1, ease: "power2.inOut" }, "-=1");

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-around transition-opacity duration-500"
    >
      <div id="box-a" className="w-20 h-20 bg-blue-500" />
      <div id="box-b" className="w-20 h-20 bg-pink-500" />
    </div>
  );
}
