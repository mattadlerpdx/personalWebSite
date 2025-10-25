/**
 * Centralized animation configuration for GSAP
 * All durations, easings, and common animation patterns live here
 */

export const DURATIONS = {
  FAST: 0.3,
  MEDIUM: 0.8,
  MEDIUM_SLOW: 1.2,
  SLOW: 1.5,
  VERY_SLOW: 2.0,
};

export const EASINGS = {
  SMOOTH: 'power2.out',
  SMOOTH_IN_OUT: 'power2.inOut',
  BOUNCE: 'elastic.out(1, 0.5)',
  SHARP: 'power2.inOut',
  LINEAR: 'none',
  SINE: 'sine.inOut',
};

export const SCROLL_TRIGGER_DEFAULTS = {
  start: 'top 80%',
  toggleActions: 'play none none none',
};

// Common animation patterns
export const FADE_IN = {
  from: { autoAlpha: 0 },
  to: { autoAlpha: 1, duration: DURATIONS.MEDIUM, ease: EASINGS.SMOOTH },
};

export const FADE_OUT = {
  from: { autoAlpha: 1 },
  to: { autoAlpha: 0, duration: DURATIONS.SLOW, ease: EASINGS.SHARP },
};

export const SLIDE_UP = {
  from: { y: 50, autoAlpha: 0 },
  to: { y: 0, autoAlpha: 1, duration: DURATIONS.MEDIUM, ease: EASINGS.SMOOTH },
};

export const SLIDE_DOWN = {
  from: { y: -50, autoAlpha: 0 },
  to: { y: 0, autoAlpha: 1, duration: DURATIONS.MEDIUM, ease: EASINGS.SMOOTH },
};

export const SLIDE_LEFT = {
  from: { x: 50, autoAlpha: 0 },
  to: { x: 0, autoAlpha: 1, duration: DURATIONS.MEDIUM, ease: EASINGS.SMOOTH },
};

export const SLIDE_RIGHT = {
  from: { x: -50, autoAlpha: 0 },
  to: { x: 0, autoAlpha: 1, duration: DURATIONS.MEDIUM, ease: EASINGS.SMOOTH },
};

// Glow colors for tech stack
export const GLOW_COLORS = [
  'rgba(0, 153, 255, 0.3)',    // Blue
  'rgba(145, 71, 255, 0.3)',   // Purple
  'rgba(0, 200, 0, 0.3)',      // Green
  'rgba(0, 190, 255, 0.3)',    // Cyan
  'rgba(255, 175, 0, 0.3)',    // Orange
  'rgba(255, 0, 128, 0.3)',    // Pink
  'rgba(0, 200, 80, 0.3)',     // Teal
];

// Dark mode glow colors (more intense)
export const GLOW_COLORS_DARK = GLOW_COLORS.map(color =>
  color.replace('0.3', '0.6')
);

// Story section glow colors
export const STORY_GLOW_LIGHT = '0 10px 20px rgba(173, 216, 230, 0.7)'; // Pastel blue
export const STORY_GLOW_DARK = '0 10px 20px rgba(255, 255, 255, 0.7)';  // White
