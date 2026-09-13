import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

type CartSlot = 'header' | 'dock';

interface CartAnimationContextValue {
  triggerFly: (sourceRect: DOMRect) => void;
  /** Register a cart button. The header and the mobile dock both register; whichever is visible is the target. */
  setCartRef: (el: HTMLElement | null, slot?: CartSlot) => void;
}

const CartAnimationContext = createContext<CartAnimationContextValue | null>(null);

export const CartAnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [animation, setAnimation] = useState<{ source: DOMRect; id: number } | null>(null);
  const [bounceRect, setBounceRect] = useState<DOMRect | null>(null);
  const cartRefs = useRef<Partial<Record<CartSlot, HTMLElement | null>>>({});
  const idRef = useRef(0);

  const getCartRect = useCallback(() => {
    for (const el of Object.values(cartRefs.current) as (HTMLElement | null)[]) {
      const rect = el?.getBoundingClientRect();
      if (rect && rect.width > 0 && rect.height > 0) return rect;
    }
    return undefined;
  }, []);

  const triggerFly = useCallback((sourceRect: DOMRect) => {
    idRef.current += 1;
    setAnimation({ source: sourceRect, id: idRef.current });
    setTimeout(() => {
      setAnimation(null);
      setBounceRect(getCartRect() ?? null);
      setTimeout(() => setBounceRect(null), 400);
    }, 700);
  }, [getCartRect]);

  const setCartRef = useCallback((el: HTMLElement | null, slot: CartSlot = 'header') => {
    cartRefs.current[slot] = el;
  }, []);

  return (
    <CartAnimationContext.Provider value={{ triggerFly, setCartRef }}>
      {children}
      {animation && (
        <CartFlyAnimation key={animation.id} source={animation.source} getCartRect={getCartRect} />
      )}
      {bounceRect && <CartBounce rect={bounceRect} />}
    </CartAnimationContext.Provider>
  );
};

interface CartFlyAnimationProps {
  source: DOMRect;
  getCartRect: () => DOMRect | undefined;
}

const CartFlyAnimation: React.FC<CartFlyAnimationProps> = ({ source, getCartRect }) => {
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    const startTime = performance.now();
    const duration = 700;
    let frame = 0;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const cartRect = getCartRect();
  if (!cartRect) return null;

  const startX = source.left + source.width / 2;
  const startY = source.top + source.height / 2;
  const endX = cartRect.left + cartRect.width / 2;
  const endY = cartRect.top + cartRect.height / 2;
  const controlX = startX;
  const controlY = Math.min(startY, endY) - 80;

  const currentX = (1 - progress) ** 2 * startX + 2 * (1 - progress) * progress * controlX + progress ** 2 * endX;
  const currentY = (1 - progress) ** 2 * startY + 2 * (1 - progress) * progress * controlY + progress ** 2 * endY;
  const scale = 1 - progress * 0.5;
  const opacity = progress < 0.8 ? 1 : (1 - progress) / 0.2;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[80]"
      style={{ transform: `translate(${currentX}px, ${currentY}px) scale(${scale})`, opacity }}
    >
      <div
        className="w-4 h-4 rounded-full shadow-lg ring-2 ring-white"
        style={{ background: 'var(--color-bm-orange)', transform: 'translate(-50%, -50%)' }}
      />
    </div>
  );
};

const CartBounce: React.FC<{ rect: DOMRect }> = ({ rect }) => (
  <div
    className="fixed pointer-events-none z-[80]"
    style={{
      left: rect.left + rect.width / 2 - 8,
      top: rect.top - 12,
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: 'var(--color-bm-orange)',
      animation: 'cartBounce 0.4s ease-out',
    }}
  />
);

export const useCartAnimation = () => {
  const context = useContext(CartAnimationContext);
  if (!context) {
    return { triggerFly: () => {}, setCartRef: () => {} };
  }
  return context;
};
