export const NAV_HEIGHT = 72;

export const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1440 } as const;

export const ANIMATION = {
  micro: 200, fast: 300, smooth: 600, slow: 800, cinematic: 1200, pageTransition: 500,
} as const;

export const SPRINGS = {
  smooth: { type: 'spring' as const, stiffness: 100, damping: 20 },
  snappy: { type: 'spring' as const, stiffness: 300, damping: 25 },
  gentle: { type: 'spring' as const, stiffness: 50, damping: 15 },
} as const;

export const EASINGS = {
  outExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  outQuad: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  inOutCubic: [0.42, 0, 0.58, 1] as [number, number, number, number],
} as const;

export const OBSERVER = {
  reveal: { threshold: 0.12, rootMargin: '0px' },
  lazyLoad: { threshold: 0, rootMargin: '300px' },
} as const;

export const IMAGE_QUALITY = 85;
