import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Custom hook for smooth page transition animations
 * @param {Object} options - Animation options
 * @param {number} options.duration - Animation duration in seconds (default: 0.6)
 * @param {string} options.ease - GSAP ease function (default: 'power2.out')
 * @param {number} options.y - Initial Y offset (default: 20)
 * @param {boolean} options.disabled - Skip animation entirely (default: false)
 * @returns {Object} - Ref to attach to page container
 */
export default function usePageTransition(options = {}) {
  const {
    duration = 0.6,
    ease = 'power2.out',
    y = 20,
    disabled = false,
  } = options;

  const containerRef = useRef();

  useEffect(() => {
    if (disabled || !containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        ease,
      }
    );
  }, [duration, ease, y, disabled]);

  return containerRef;
}
