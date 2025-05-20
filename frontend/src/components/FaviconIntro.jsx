import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function FaviconIntro({ onComplete }) {
  const iconRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: onComplete
        });
      }
    });

    tl.fromTo(
      iconRef.current,
      { x: '-100vw', rotation: -720 },
      { x: 0, rotation: 0, duration: 1.4, ease: 'power4.out' }
    )
      .to(iconRef.current, {
        y: -20,
        duration: 0.3,
        ease: 'power2.out',
        repeat: 2,
        yoyo: true
      })
      .to(iconRef.current, {
        x: '100vw',
        rotation: 360,
        duration: 1.2,
        ease: 'power2.in'
      }, '+=0.2');

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500"
    >
      <img
        ref={iconRef}
        src="public/images/facIcon.png"
        alt="favicon"
        className="w-20 h-20"
      />
    </div>
  );
}
