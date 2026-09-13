import React, { useMemo } from 'react';

interface PriceBurstProps {
  price: number;
  label?: string;
  size?: number;
  tone?: 'orange' | 'gold' | 'ink';
  className?: string;
}

const TONES = {
  orange: { fill: 'var(--color-bm-orange)', text: 'text-bm-ink' },
  gold: { fill: 'var(--color-bm-gold)', text: 'text-bm-ink' },
  ink: { fill: 'var(--color-bm-ink)', text: 'text-bm-orange' },
};

/** Starburst price stamp — "FROM KSh 1,500". The star spins slowly; the text stays put. */
export const PriceBurst: React.FC<PriceBurstProps> = ({ price, label = 'From', size = 112, tone = 'orange', className = '' }) => {
  const points = useMemo(() => {
    const spikes = 20;
    const pts: string[] = [];
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? 50 : 44;
      const a = (Math.PI * i) / spikes - Math.PI / 2;
      pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
    }
    return pts.join(' ');
  }, []);
  const palette = TONES[tone];
  // `relative` would override a caller's `absolute` placement and drop the stamp into normal flow.
  const position = /\b(absolute|fixed)\b/.test(className) ? '' : 'relative';

  return (
    <div
      className={`${position} grid place-items-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-label={`${label} KSh ${price.toLocaleString()}`}
      role="img"
    >
      <svg viewBox="0 0 100 100" className="bm-spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
        <polygon points={points} fill={palette.fill} />
      </svg>
      <div className={`relative -rotate-[8deg] text-center leading-[0.9] ${palette.text}`} aria-hidden="true">
        <span className="block font-sans font-extrabold uppercase tracking-[0.2em]" style={{ fontSize: size * 0.095 }}>
          {label}
        </span>
        <span className="block font-display" style={{ fontSize: size * 0.13 }}>
          KSh
        </span>
        <span className="block font-display" style={{ fontSize: size * (price >= 10000 ? 0.2 : 0.25) }}>
          {price.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
