// hooks/useScrollTop.js
import { useState, useEffect } from 'react';

export default function useScrollTop(threshold = 10) {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY <= threshold);
    };

    handleScroll(); // initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return atTop;
}
