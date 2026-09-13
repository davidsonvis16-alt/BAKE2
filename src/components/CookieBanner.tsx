import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, Cookie } from 'lucide-react';
import { applyConsent, getConsent, onOpenCookieSettings, saveConsent } from '../lib/tracking';

const GROUPS = [
  {
    key: 'essential',
    title: 'Essential',
    body: 'Keeps your cart, favourites and this choice saved on your device. Always on.',
  },
  {
    key: 'analytics',
    title: 'Analytics',
    body: 'Google Analytics shows us which dishes and pages people visit, so we can improve the menu.',
  },
  {
    key: 'marketing',
    title: 'Marketing',
    body: 'Meta (Facebook & Instagram) cookies let us measure our ads and show you BakeMart deals.',
  },
] as const;

export const CookieBanner: React.FC = () => {
  const [open, setOpen] = useState(() => getConsent() === null);
  const [customising, setCustomising] = useState(false);
  const [choice, setChoice] = useState(() => {
    const saved = getConsent();
    return { analytics: saved?.analytics ?? true, marketing: saved?.marketing ?? true };
  });

  useEffect(() => {
    applyConsent();
    return onOpenCookieSettings(() => {
      const saved = getConsent();
      setChoice({ analytics: saved?.analytics ?? true, marketing: saved?.marketing ?? true });
      setCustomising(true);
      setOpen(true);
    });
  }, []);

  const decide = (next: { analytics: boolean; marketing: boolean }) => {
    saveConsent(next);
    setOpen(false);
    setCustomising(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          role="region"
          aria-label="Cookie preferences"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-[55] mx-auto max-w-md rounded-3xl bg-bm-coal p-5 text-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] ring-1 ring-white/10 sm:p-6 lg:inset-x-auto lg:bottom-6 lg:left-6 lg:mx-0 lg:w-[400px]"
        >
          <div className="flex items-start gap-3">
            {customising ? (
              <button
                type="button"
                onClick={() => setCustomising(false)}
                aria-label="Back"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/[0.06] hover:bg-white/10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            ) : (
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-bm-orange text-bm-ink">
                <Cookie className="h-5 w-5" />
              </span>
            )}
            <div>
              <h2 className="font-display text-2xl uppercase leading-none tracking-[0.02em] text-white">
                {customising ? 'Cookie settings' : 'Fresh cookies?'}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                {customising
                  ? 'Choose what BakeMart may use. You can change this any time from the footer.'
                  : 'We use cookies to keep your order saved, see what people love on the menu and show you our deals.'}
              </p>
            </div>
          </div>

          {customising && (
            <ul className="mt-4 space-y-2">
              {GROUPS.map((group) => {
                const locked = group.key === 'essential';
                const checked = locked ? true : choice[group.key];
                return (
                  <li key={group.key} className="flex items-start justify-between gap-4 rounded-2xl bg-white/[0.04] p-3.5 ring-1 ring-white/[0.06]">
                    <span>
                      <span className="block text-sm font-extrabold">{group.title}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-white/55">{group.body}</span>
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={checked}
                      aria-label={group.title}
                      disabled={locked}
                      onClick={() => !locked && setChoice((c) => ({ ...c, [group.key]: !c[group.key] }))}
                      className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${
                        checked ? 'bg-bm-orange' : 'bg-white/15'
                      } ${locked ? 'cursor-not-allowed opacity-60' : ''}`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-[left] duration-200 ${checked ? 'left-[22px]' : 'left-0.5'}`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            {customising ? (
              <>
                <button
                  type="button"
                  onClick={() => decide(choice)}
                  className="flex-1 rounded-full bg-bm-orange px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-bm-ink hover:bg-bm-gold"
                >
                  Save choices
                </button>
                <button
                  type="button"
                  onClick={() => decide({ analytics: true, marketing: true })}
                  className="flex-1 rounded-full bg-white/[0.06] px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-white ring-1 ring-white/15 hover:bg-white/10"
                >
                  Accept all
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => decide({ analytics: true, marketing: true })}
                  className="flex-1 rounded-full bg-bm-orange px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-bm-ink hover:bg-bm-gold"
                >
                  Accept all
                </button>
                <button
                  type="button"
                  onClick={() => decide({ analytics: false, marketing: false })}
                  className="flex-1 rounded-full bg-white/[0.06] px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-white ring-1 ring-white/15 hover:bg-white/10"
                >
                  Essential only
                </button>
              </>
            )}
          </div>
          {!customising && (
            <button
              type="button"
              onClick={() => setCustomising(true)}
              className="mt-3 w-full text-center text-xs font-bold text-white/55 underline underline-offset-4 hover:text-bm-orange"
            >
              Customise
            </button>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
};
