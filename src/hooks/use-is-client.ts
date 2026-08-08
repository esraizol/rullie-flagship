'use client';
import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * Returns true only after the component has mounted on the client.
 * Use this instead of `useEffect(() => setState(true), [])` for SSR/CSR
 * mismatch cases (e.g. portals that need `document`) — this avoids
 * calling setState synchronously inside an effect.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
