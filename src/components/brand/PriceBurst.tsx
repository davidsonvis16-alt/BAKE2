import React, { useId } from 'react';

interface PriceBurstProps {
  price: number;
  label?: string;
  /** Tag height-ish scale in px; the tag is wider than it is tall. */
  size?: number;
  tone?: 'orange' | 'gold' | 'ink';
  className?: string;
}

const TONES = {
  orange: { fill: 'var(--color-bm-orange)', text: 'text-bm-ink', sub: 'text-bm-ink/70' },
  gold: { fill: 'var(--color-bm-gold)', text: 'text-bm-ink', sub: 'text-bm-ink/70' },
  ink: { fill: 'var(--color-bm-ink)', text: 'text-white', sub: 'text-bm-orange' },
};

/** Still price tag — notched end with an eyelet, tilted slightly. "FROM · KSh 1,800". */
export const PriceBurst: React.FC<PriceBurstProps> = ({ price, label = 'From', size = 112, tone = 'orange', className = '' }) => {
  const maskId = useId();
  const palette = TONES[tone];
  const width = Math.round(size * 1.45);
  const height = Math.round(size * 0.68);
  // `relative` would override a caller's `absolute` placement and drop the tag into normal flow.
  const position = /\b(absolute|fixed)\b/.test(className) ? '' : 'relative';

  return (
    <div
      className={`${position} grid select-none place-items-center ${className}`}
      style={{ width, height }}
      aria-label={`${label} KSh ${price.toLocaleString()}`}
      role="img"
    >
      <div className="absolute inset-0 -rotate-6">
        <svg viewBox="0 0 145 68" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <mask id={maskId}>
              <rect width="145" height="68" fill="white" />
              {/* eyelet punched through the tag */}
              <circle cx="22" cy="34" r="5" fill="black" />
            </mask>
          </defs>
          <path d="M26 0H137a8 8 0 0 1 8 8V60a8 8 0 0 1-8 8H26L0 34Z" fill={palette.fill} mask={`url(#${maskId})`} />
        </svg>
        <div className={`absolute inset-y-0 left-[24%] right-[6%] flex flex-col justify-center leading-none ${palette.text}`} aria-hidden="true">
          <span className={`font-sans font-extrabold uppercase tracking-[0.16em] ${palette.sub}`} style={{ fontSize: size * 0.09 }}>
            {label}
          </span>
          <span className="mt-[0.12em] whitespace-nowrap font-display" style={{ fontSize: size * (price >= 10000 ? 0.2 : 0.24) }}>
            KSh {price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
