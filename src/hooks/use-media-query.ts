'use client';
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);
  return matches;
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}

export function useBreakpoint(bp: 'sm' | 'md' | 'lg' | 'xl' | '2xl'): boolean {
  const sizes = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1440px' };
  return useMediaQuery(`(min-width: ${sizes[bp]})`);
}
