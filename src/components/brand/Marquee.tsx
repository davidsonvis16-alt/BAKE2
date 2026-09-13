import React from 'react';

interface MarqueeProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  duration?: number;
  reverse?: boolean;
}

const Star = () => (
  <svg viewBox="0 0 24 24" className="h-[0.6em] w-[0.6em] shrink-0" aria-hidden="true">
    <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor" />
  </svg>
);

export const Marquee: React.FC<MarqueeProps> = ({ items, className = '', itemClassName = '', duration = 32, reverse = false }) => (
  <div className={`overflow-hidden ${className}`}>
    <div
      className="bm-marquee flex w-max"
      style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
    >
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
          {items.map((text, i) => (
            <span key={i} className={`flex items-center gap-5 whitespace-nowrap px-5 font-display uppercase ${itemClassName}`}>
              {text}
              <Star />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
