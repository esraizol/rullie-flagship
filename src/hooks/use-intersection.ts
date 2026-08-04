'use client';
import { useState, useEffect, useRef, type RefObject } from 'react';

export function useIntersection<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; rootMargin?: string; triggerOnce?: boolean } = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.12, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (triggerOnce) observer.unobserve(el);
      } else if (!triggerOnce) setIsIntersecting(false);
    }, { threshold, rootMargin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isIntersecting];
}
