'use client';
import { useEffect, useRef, useCallback } from 'react';
import { useIsDesktop } from './use-media-query';

type CursorVariant = 'default' | 'hover' | 'product' | 'video' | 'link';

export function useCursor() {
  const isDesktop = useIsDesktop();
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);
  const visible = useRef(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const setCursorVariant = useCallback((variant: CursorVariant) => {
    const c = cursorRef.current;
    if (!c) return;
    c.classList.remove('cursor--hover', 'cursor--product', 'cursor--video', 'cursor--link');
    if (variant !== 'default') c.classList.add(`cursor--${variant}`);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const c = cursorRef.current;
    if (!c) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) { c.classList.add('visible'); visible.current = true; pos.current = { ...target.current }; }
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('.product-card,[data-cursor="product"]')) setCursorVariant('product');
      else if (t.closest('[data-cursor="video"]')) setCursorVariant('video');
      else if (t.closest('a,button,[data-cursor="link"]')) setCursorVariant('hover');
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a,button,.product-card,[data-cursor]')) setCursorVariant('default');
    };
    const onLeave = () => { c.classList.remove('visible'); visible.current = false; };
    const render = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.15);
      c.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      rafId.current = requestAnimationFrame(render);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    rafId.current = requestAnimationFrame(render);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [isDesktop, setCursorVariant]);

  return { cursorRef, setCursorVariant, isDesktop };
}
