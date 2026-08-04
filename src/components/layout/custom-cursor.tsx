'use client';

import { useCursor } from '@/hooks/use-cursor';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const { cursorRef, isDesktop } = useCursor();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isDesktop) return null;

  return createPortal(
    <div ref={cursorRef} className="cursor pointer-events-none fixed top-0 left-0 z-[9999]" />,
    document.body
  );
}
