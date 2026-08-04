'use client';
import { useEffect } from 'react';

export function useLockBody(locked: boolean = true): void {
  useEffect(() => {
    if (!locked) return;
    const origOverflow = document.body.style.overflow;
    const origPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => { document.body.style.overflow = origOverflow; document.body.style.paddingRight = origPadding; };
  }, [locked]);
}
