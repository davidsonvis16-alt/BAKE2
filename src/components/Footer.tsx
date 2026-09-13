import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Clock, Copy, Facebook, Instagram, Mail, MapPin, Music2, Phone, Youtube } from 'lucide-react';
import { CATEGORIES } from '../data/menuData';
import { orderCategories, PHONE_DISPLAY, PHONE_TEL, shortCategoryName, whatsappLink } from '../lib/menuMeta';
import { openCookieSettings } from '../lib/tracking';

const PAYBILL = { business: '247247', account: '0752114450' };
const TILL = '5170287';
const USSD = '*334#';
const EMAIL = 'Salesbakemart.co.ke@gmail.com';

const SOCIALS = [
  { href: 'https://www.instagram.com/bakemartcoffeehouse/', label: 'Instagram', icon: Instagram },
  { href: 'https://www.facebook.com/BakemartCoffeeHouse/', label: 'Facebook', icon: Facebook },
  { href: 'https://www.tiktok.com/@bakemartcoffeehouse', label: 'TikTok', icon: Music2 },
  { href: 'https://www.youtube.com/@bakemartcoffeehouse', label: 'YouTube', icon: Youtube },
];

const EXPLORE = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Full menu' },
  { to: '/specials', label: 'Deals & combos' },
  { to: '/reservation', label: 'Reserve a table' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About us' },
  { to: '/faq', label: 'FAQ' },
];

const MpesaPayment: React.FC = () => {
  const [tab, setTab] = useState<'paybill' | 'till'>('paybill');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (value: string, field: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement('textarea');
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopiedField(field);
    setTimeout(() => setCopiedField((f) => (f === field ? null : f)), 1800);
  };

  const rows =
    tab === 'paybill'
      ? [
          { key: 'business', label: 'Business number', value: PAYBILL.business },
          { key: 'account', label: 'Account number', value: PAYBILL.account },
        ]
      : [{ key: 'till', label: 'Till number', value: TILL }];

  return (
    <div className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-extrabold text-white">
          <img src="/mpesa-logo.png" alt="M-Pesa" className="h-6 w-auto rounded-sm" />
          Pay with M-Pesa
        </span>
        <div className="flex rounded-full bg-white/5 p-0.5">
          {(['paybill', 'till'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`rounded-full px-3 py-1 text-[11px] font-extrabold uppercase ${
                tab === key ? 'bg-[#00A651] text-white' : 'text-white/55 hover:text-white'
              }`}
            >
              {key === 'paybill' ? 'Pay Bill' : 'Buy Goods'}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {rows.map((row) => (
          <button
            key={row.key}
            type="button"
            onClick={() => handleCopy(row.value, row.key)}
            className="flex w-full items-center justify-between gap-3 rounded-xl bg-black/30 px-3 py-2.5 text-left hover:bg-black/50"
          >
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-white/45">{row.label}</span>
              <span className="font-mono text-base font-bold tracking-wide text-white">{row.value}</span>
            </span>
            <span
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase ${
                copiedField === row.key ? 'bg-[#00A651] text-white' : 'bg-white/10 text-white/70'
              }`}
            >
              {copiedField === row.key ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copiedField === row.key ? 'Copied' : 'Copy'}
            </span>
          </button>
        ))}
      </div>
      <a
        href={`tel:${USSD}`}
        className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#00A651] py-2.5 text-xs font-extrabold uppercase tracking-wide text-white hover:bg-[#009245]"
      >
        <Phone className="h-3.5 w-3.5" />
        Dial {USSD} now
      </a>
    </div>
  );
};

export const Footer: React.FC = () => {
  const categories = useMemo(() => orderCategories(CATEGORIES).slice(0, 7), []);

  return (
    <footer className="bg-bm-ink pb-[calc(4rem+env(safe-area-inset-bottom))] text-white lg:pb-0">
      <div className="bg-bm-orange text-bm-ink">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8 lg:py-16">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em]">Nakuru's own open kitchen</p>
            <h2 className="mt-2 font-display text-[3rem] uppercase leading-[0.88] text-bm-ink sm:text-6xl lg:text-7xl">
              Hungry? We're
              <br />
              open till 8.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-bm-ink px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white hover:bg-bm-ember"
            >
              Order on WhatsApp
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://www.glovoapp.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-bm-ink hover:bg-bm-cream"
            >
              Get it on Glovo
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.3fr] lg:gap-12 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="BakeMart Coffee House logo" className="h-14 w-14 rounded-full object-cover" />
            <span className="leading-none">
              <span className="block font-display text-3xl tracking-[0.04em] text-white">BAKEMART</span>
              <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.3em] text-bm-orange">Coffee House</span>
            </span>
          </Link>
          <p className="mt-4 font-script text-3xl text-bm-orange">Beyond sweetness</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">
            The only open-kitchen coffee shop in Nakuru City. On Moi Road at Tropical House, behind Gilanis Supermarket and beside
            Nakuru GPO.
          </p>
          <div className="mt-5 flex gap-2">
            {SOCIALS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.06] text-white hover:bg-bm-orange hover:text-bm-ink"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Explore">
          {EXPLORE.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="text-white/65 hover:text-bm-orange">
                {link.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="On the menu">
          {categories.map((c) => (
            <li key={c.id}>
              <Link to={`/category/${c.id}`} className="text-white/65 hover:text-bm-orange">
                {shortCategoryName(c)}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-[0.22em] text-bm-orange">Visit & pay</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bm-orange" />
              Tropical House, Moi Road, Nakuru
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-bm-orange" />
              Open daily · 7AM – 8PM
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-bm-orange" />
              <a href={PHONE_TEL} className="font-bold text-white hover:text-bm-orange">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-bm-orange" />
              <a href={`mailto:${EMAIL}`} className="break-all hover:text-bm-orange">
                {EMAIL}
              </a>
            </li>
          </ul>
          <div className="mt-5">
            <MpesaPayment />
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-t border-white/10 px-4 pb-[0.2em] pt-8 text-[20vw] sm:pt-12 lg:text-[15rem]" aria-hidden="true">
        <p className="bm-extrude select-none whitespace-nowrap text-center font-display leading-[0.9] tracking-[0.03em] text-white">
          BAKEMART
        </p>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/45 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} BakeMart Coffee House. All rights reserved.</p>
          <button type="button" onClick={openCookieSettings} className="text-white/75 underline underline-offset-2 hover:text-bm-orange">
            Cookie settings
          </button>
          <p>
            Website by{' '}
            <a href="https://portfolio-e-mu.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-white/75 underline underline-offset-2 hover:text-bm-orange">
              Eden
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h3 className="text-xs font-extrabold uppercase tracking-[0.22em] text-bm-orange">{title}</h3>
    <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
  </div>
);
