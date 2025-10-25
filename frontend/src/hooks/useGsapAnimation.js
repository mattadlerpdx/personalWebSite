import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Simple GSAP fromTo animation hook
 * @param {Object} fromVars - GSAP from properties
 * @param {Object} toVars - GSAP to properties
 * @param {Array} deps - Dependencies array
 * @returns {React.RefObject} - Ref to attach to target element
 */
export function useGsapFromTo(fromVars, toVars, deps = []) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const tween = gsap.fromTo(ref.current, fromVars, toVars);

    return () => tween.kill();
  }, deps);

  return ref;
}

/**
 * GSAP timeline animation hook
 * @param {Function} timelineFactory - Function that receives the ref and returns a timeline
 * @param {Array} deps - Dependencies array
 * @returns {React.RefObject} - Ref to attach to target element
 */
export function useGsapTimeline(timelineFactory, deps = []) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const tl = timelineFactory(ref.current);

    return () => tl.kill();
  }, deps);

  return ref;
}

/**
 * Floating animation hook using GSAP (replaces Web Animations API)
 * Creates a smooth floating effect with random direction
 * @param {number} range - Float distance in pixels (default: 15)
 * @param {number} duration - Animation duration in seconds (default: 6)
 * @param {Array} deps - Dependencies array
 * @returns {React.RefObject} - Ref to attach to target element
 */
export function useGsapFloat(range = 15, duration = 6, deps = []) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    // Random angle for float direction
    const angle = Math.random() * Math.PI * 2;
    const dx = range * Math.cos(angle);
    const dy = range * Math.sin(angle);

    const tween = gsap.to(ref.current, {
      x: dx,
      y: dy,
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => tween.kill();
  }, deps);

  return ref;
}

/**
 * Glow pulse animation hook using GSAP
 * Creates a pulsing box-shadow effect
 * @param {string} glowColor - CSS box-shadow value for the glow
 * @param {number} duration - Animation duration in seconds (default: 3)
 * @param {Array} deps - Dependencies array
 * @returns {React.RefObject} - Ref to attach to target element
 */
export function useGsapGlow(glowColor, duration = 3, deps = []) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    // Extract color from the glow string if it's a full box-shadow
    const baseGlow = '0 0 0px 0 ' + (glowColor.includes('rgba') ? glowColor : 'rgba(0,0,0,0)');
    const fullGlow = '0 0 16px 8px ' + (glowColor.includes('rgba') ? glowColor : 'rgba(0,0,0,0)');

    const tween = gsap.fromTo(
      ref.current,
      { boxShadow: baseGlow },
      {
        boxShadow: fullGlow,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      }
    );

    return () => tween.kill();
  }, deps);

  return ref;
}

/**
 * Combined float + glow animation
 * Perfect for the kaleidoscope tech stack icons
 * @param {Object} options - Animation options
 * @param {number} options.floatRange - Float distance in pixels
 * @param {number} options.floatDuration - Float animation duration
 * @param {string} options.glowColor - Glow color (rgba string)
 * @param {number} options.glowDuration - Glow animation duration
 * @param {number} options.delay - Animation delay
 * @param {Array} deps - Dependencies array
 * @returns {React.RefObject} - Ref to attach to target element
 */
export function useGsapFloatGlow(
  { floatRange = 15, floatDuration = 6, glowColor, glowDuration = 3, delay = 0 },
  deps = []
) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const angle = Math.random() * Math.PI * 2;
    const dx = floatRange * Math.cos(angle);
    const dy = floatRange * Math.sin(angle);

    // Float animation
    const floatTween = gsap.to(ref.current, {
      x: dx,
      y: dy,
      duration: floatDuration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: delay,
    });

    // Glow animation
    const baseGlow = `0 0 0px 0 ${glowColor}`;
    const fullGlow = `0 0 16px 8px ${glowColor}`;

    const glowTween = gsap.fromTo(
      ref.current,
      { boxShadow: baseGlow },
      {
        boxShadow: fullGlow,
        duration: glowDuration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay,
      }
    );

    return () => {
      floatTween.kill();
      glowTween.kill();
    };
  }, deps);

  return ref;
}
