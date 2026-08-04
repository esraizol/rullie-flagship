'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

type ScrollDirection = 'up' | 'down' | null;

export function useScrollDirection(options: { threshold?: number; topOffset?: number } = {}) {
  const { threshold = 5, topOffset = 100 } = options;
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const update = useCallback(() => {
    const current = window.scrollY;
    setScrollY(current);
    if (Math.abs(current - lastScrollY.current) >= threshold) {
      setScrollDirection(current > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = current;
    }
    ticking.current = false;
  }, [threshold]);

  useEffect(() => {
    const onScroll = () => { if (!ticking.current) { requestAnimationFrame(update); ticking.current = true; } };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [update]);

  return { scrollDirection, scrollY, isAtTop: scrollY < topOffset, isScrolled: scrollY > 0 };
}
