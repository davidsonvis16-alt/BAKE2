import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Bike, CalendarCheck, MessageCircle } from 'lucide-react';
import { useMenuData } from '../../hooks/useMenuData';
import { Reveal } from '../brand/Reveal';
import { SectionHeading } from '../brand/SectionHeading';
import { whatsappLink } from '../../lib/menuMeta';

const CountUp: React.FC<{ to: number; decimals?: number; suffix?: string }> = ({ to, decimals = 0, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setValue(to);
      return;
    }
    const controls = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: setValue });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const StatsBand: React.FC = () => {
  const { menuItems } = useMenuData();
  const stats = [
    { value: <CountUp to={4} />, label: 'Years of craft' },
    { value: <CountUp to={menuItems.length} suffix="+" />, label: 'Menu favourites' },
    { value: <CountUp to={5} decimals={1} />, label: 'Google rating' },
    { value: <span>7–8</span>, label: 'Open daily, AM–PM' },
  ];

  return (
    <section className="bg-bm-orange text-bm-ink">
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-2 py-9 text-center sm:py-12 ${i % 2 === 0 ? 'border-r border-bm-ink/15' : ''} ${
              i < 2 ? 'border-b border-bm-ink/15 md:border-b-0' : ''
            } ${i === 1 ? 'md:border-r' : ''}`}
          >
            <div className="font-display text-5xl leading-none sm:text-6xl lg:text-7xl">{stat.value}</div>
            <div className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.2em] sm:text-xs">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

interface OrderWaysProps {
  onNavigateReservation: () => void;
}

export const OrderWays: React.FC<OrderWaysProps> = ({ onNavigateReservation }) => {
  const ways = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      body: 'Build your order here, then send it to the kitchen on WhatsApp in one tap.',
      label: 'Chat to order',
      href: whatsappLink(),
    },
    {
      icon: Bike,
      title: 'Glovo delivery',
      body: 'Search “BakeMart Coffee House Nakuru” on Glovo and we will bring it to your door.',
      label: 'Open Glovo',
      href: 'https://www.glovoapp.com',
    },
    {
      icon: CalendarCheck,
      title: 'Dine in',
      body: 'Book a booth for coffee dates, family meals or the office lunch.',
      label: 'Reserve a table',
      onClick: onNavigateReservation,
    },
  ];

  return (
    <section className="bg-bm-cream py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Your way"
          title={
            <>
              Three ways to <span className="text-bm-flame">eat</span>
            </>
          }
        />
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {ways.map((way, i) => {
            const Icon = way.icon;
            const className =
              'group flex h-full flex-col rounded-[1.75rem] bg-white p-6 text-left ring-1 ring-bm-line transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-bm-ink sm:p-8';
            const content = (
              <>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-bm-ink text-bm-orange transition-colors group-hover:bg-bm-orange group-hover:text-bm-ink">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="mt-6 font-display text-3xl uppercase leading-none text-bm-ink transition-colors group-hover:text-white sm:text-4xl">
                  {way.title}
                </span>
                <span className="mt-3 text-[15px] leading-relaxed text-bm-muted transition-colors group-hover:text-white/65">{way.body}</span>
                <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-extrabold uppercase tracking-wider text-bm-ink transition-colors group-hover:text-bm-orange">
                  {way.label}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </>
            );
            return (
              <Reveal key={way.title} delay={i * 0.08} className="h-full">
                {way.href ? (
                  <a href={way.href} target="_blank" rel="noreferrer" className={className}>
                    {content}
                  </a>
                ) : (
                  <button type="button" onClick={way.onClick} className={className}>
                    {content}
                  </button>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
