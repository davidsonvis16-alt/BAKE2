import Lenis from 'lenis';

let lenis: Lenis | null = null;
let lockCount = 0;

/** Inertia scrolling for wheel/trackpad. Touch devices keep native scrolling. */
export function initSmoothScroll() {
  if (lenis || typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.11,
    smoothWheel: true,
    // Drawers, modals and overlays are `position: fixed` — let them scroll natively.
    prevent: (node) => node.classList?.contains('fixed') || node.hasAttribute?.('data-lenis-prevent'),
  });
}

export function destroySmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

export function scrollToY(y: number, immediate = false) {
  if (lenis) {
    lenis.scrollTo(y, { immediate, force: true, duration: 1.1 });
  } else {
    window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' });
  }
}

export function scrollToElement(el: HTMLElement, offset = 0, immediate = false) {
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  scrollToY(Math.max(0, y), immediate);
}

/** Reference-counted so a modal opened over a drawer doesn't unlock early. */
export function lockScroll(locked: boolean) {
  lockCount = Math.max(0, lockCount + (locked ? 1 : -1));
  const shouldLock = lockCount > 0;
  if (lenis) {
    if (shouldLock) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = shouldLock ? 'hidden' : '';
}
