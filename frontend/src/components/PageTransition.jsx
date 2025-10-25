import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DURATIONS, EASINGS } from '../utils/animationConstants';

gsap.registerPlugin(ScrollTrigger);

export default function PageTransition({ children }) {
  const location = useLocation();
  const containerRef = useRef();

  useEffect(() => {
    // Skip fade animation for HomePage (path "/") to avoid breaking Hero ScrollTrigger
    if (location.pathname === '/' || location.pathname === '') {
      // No animation for homepage - Hero handles its own initialization
      return;
    }

    // Fade in animation for other pages
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: DURATIONS.MEDIUM,
        ease: EASINGS.SMOOTH,
      }
    );
  }, [location.pathname]);

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  );
}
