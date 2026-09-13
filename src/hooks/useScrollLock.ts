import { useEffect } from 'react';
import { lockScroll } from '../lib/smoothScroll';

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [active]);
}
