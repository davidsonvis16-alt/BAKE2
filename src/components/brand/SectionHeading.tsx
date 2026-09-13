import React from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  action?: React.ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title, description, action, tone = 'light', className = '' }) => {
  const dark = tone === 'dark';
  return (
    <Reveal className={`mb-8 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-2xl">
        <p className={`text-xs font-extrabold uppercase tracking-[0.22em] ${dark ? 'text-bm-orange' : 'text-bm-flame'}`}>{eyebrow}</p>
        <h2
          className={`mt-2 font-display text-[2.6rem] uppercase leading-[0.9] sm:text-6xl lg:text-7xl ${dark ? 'text-white' : 'text-bm-ink'}`}
        >
          {title}
        </h2>
        {description && (
          <p className={`mt-3 max-w-xl text-[15px] leading-relaxed ${dark ? 'text-white/65' : 'text-bm-muted'}`}>{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
};
