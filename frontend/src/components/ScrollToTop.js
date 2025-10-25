// src/components/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Don't force scroll to top for homepage - Hero ScrollTrigger handles its own scroll behavior
    if (pathname === '/') {
      return;
    }
    // Smooth scroll to top for other pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;