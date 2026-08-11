import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

interface CartAnimationContextValue {
  triggerFly: (sourceRect: DOMRect) => void;
  setCartRef: (el: HTMLButtonElement | null) => void;
}

const CartAnimationContext = createContext<CartAnimationContextValue | null>(null);

export const CartAnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [animation, setAnimation] = useState<{ source: DOMRect; id: number } | null>(null);
  const [bounce, setBounce] = useState(false);
  const cartRef = useRef<HTMLButtonElement | null>(null);
  const idRef = useRef(0);

  const triggerFly = useCallback((sourceRect: DOMRect) => {
    idRef.current += 1;
    setAnimation({ source: sourceRect, id: idRef.current });
    setTimeout(() => {
      setAnimation(null);
      setBounce(true);
      setTimeout(() => setBounce(false), 300);
    }, 700);
  }, []);

  const setCartRef = useCallback((el: HTMLButtonElement | null) => {
    cartRef.current = el;
  }, []);

  return (
    <CartAnimationContext.Provider value={{ triggerFly, setCartRef }}>
      {children}
      {animation && (
        <CartFlyAnimation key={animation.id} source={animation.source} getCartRect={() => cartRef.current?.getBoundingClientRect()} />
      )}
      {bounce && cartRef.current && (
        <CartBounce cartRef={cartRef.current} />
      )}
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

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
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
      className="fixed inset-0 pointer-events-none z-[60]"
      style={{ transform: `translate(${currentX}px, ${currentY}px) scale(${scale})`, opacity }}
    >
      <div
        className="w-3 h-3 rounded-full shadow-lg"
        style={{ background: '#d97a4c', transform: 'translate(-50%, -50%)' }}
      />
    </div>
  );
};

interface CartBounceProps {
  cartRef: HTMLButtonElement;
}

const CartBounce: React.FC<CartBounceProps> = ({ cartRef }) => {
  const rect = cartRef.getBoundingClientRect();
  return (
    <div
      className="fixed pointer-events-none z-[60]"
      style={{
        left: rect.left + rect.width / 2 - 8,
        top: rect.top - 12,
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: '#d97a4c',
        animation: 'cartBounce 0.4s ease-out',
      }}
    />
  );
};

export const useCartAnimation = () => {
  const context = useContext(CartAnimationContext);
  if (!context) {
    return { triggerFly: () => {}, setCartRef: () => {} };
  }
  return context;
};
