import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface SplitImageProps {
  src: string;
  alt: string;
  strips?: number;
  className?: string;
  imgClassName?: string;
  /** `mount` plays immediately (hero slides); `inView` waits until scrolled to. */
  trigger?: 'mount' | 'inView';
  delay?: number;
  priority?: boolean;
}

const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const;
const EASE_SETTLE = [0.22, 1, 0.36, 1] as const;

/**
 * Renders one photo as vertical strips that wipe in alternately from top and bottom,
 * each with a slow zoom-out, so the image appears to slice together.
 */
export const SplitImage: React.FC<SplitImageProps> = ({
  src,
  alt,
  strips = 5,
  className = '',
  imgClassName = '',
  trigger = 'inView',
  delay = 0,
  priority = false,
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const play = trigger === 'mount' || inView;
  // `relative` would override a caller's `absolute inset-0` and collapse the box to zero height.
  const position = /\b(absolute|fixed)\b/.test(className) ? '' : 'relative';

  if (reduce) {
    return (
      <div className={`${position} overflow-hidden ${className}`}>
        <img src={src} alt={alt} className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`} />
      </div>
    );
  }

  return (
    <div ref={ref} className={`${position} overflow-hidden ${className}`} role="img" aria-label={alt}>
      {Array.from({ length: strips }).map((_, i) => {
        const fromTop = i % 2 === 1;
        const stagger = delay + i * 0.075;
        return (
          <motion.div
            key={i}
            className="absolute inset-y-0 overflow-hidden"
            style={{ left: `${(i * 100) / strips}%`, width: `calc(${100 / strips}% + 1px)` }}
            initial={{ clipPath: fromTop ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)' }}
            animate={play ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
            transition={{ duration: 1.05, ease: EASE_CURTAIN, delay: stagger }}
          >
            <motion.img
              src={src}
              alt=""
              aria-hidden="true"
              draggable={false}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className={`absolute inset-y-0 h-full max-w-none object-cover ${imgClassName}`}
              style={{ width: `${strips * 100}%`, left: `${-i * 100}%` }}
              initial={{ scale: 1.28 }}
              animate={play ? { scale: 1 } : undefined}
              transition={{ duration: 1.6, ease: EASE_SETTLE, delay: stagger }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
