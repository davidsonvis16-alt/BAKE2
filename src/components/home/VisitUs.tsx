import React from 'react';
import { Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { Reveal } from '../brand/Reveal';
import { MAPS_LINK, PHONE_DISPLAY, PHONE_TEL, openStatus } from '../../lib/menuMeta';

export const VisitUs: React.FC = () => {
  const status = openStatus();

  return (
    <section className="bg-bm-cream px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
      <Reveal className="mx-auto grid max-w-[1320px] overflow-hidden rounded-[2rem] bg-bm-ink text-white md:grid-cols-2">
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-bm-orange">Visit us</p>
          <h2 className="mt-3 font-display text-[2.75rem] uppercase leading-[0.9] text-white sm:text-6xl lg:text-7xl">
            Find us on <span className="text-bm-orange">Moi Road</span>
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
            Nakuru's open-kitchen coffee house. Pull up a seat, watch your plate come together, and stay a while.
          </p>

          <ul className="mt-7 space-y-4 text-[15px]">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-bm-orange" />
              <span className="text-white/85">Tropical House, Moi Road — behind Gilanis Supermarket, beside Nakuru GPO</span>
            </li>
            <li className="flex flex-wrap items-center gap-3">
              <Clock className="h-5 w-5 shrink-0 text-bm-orange" />
              <span className="text-white/85">Every day, 7AM – 8PM</span>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider ${
                  status.open ? 'bg-emerald-400/15 text-emerald-300' : 'bg-white/10 text-white/60'
                }`}
              >
                {status.open ? 'Open now' : 'Closed now'}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-bm-orange" />
              <a href={PHONE_TEL} className="font-bold text-white hover:text-bm-orange">
                {PHONE_DISPLAY}
              </a>
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-bm-orange px-6 py-3.5 text-sm font-extrabold text-bm-ink hover:bg-bm-orange-hot"
            >
              <Navigation className="h-4 w-4" />
              Get directions
            </a>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-extrabold text-white hover:border-white hover:bg-white/5"
            >
              <Phone className="h-4 w-4" />
              Call us
            </a>
          </div>
        </div>

        <div className="relative min-h-[300px] md:min-h-[480px]">
          <iframe
            title="BakeMart Coffee House location"
            src="https://www.google.com/maps?q=BakeMart+Coffee+House,Tropical+House,Moi+Road,Nakuru&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </Reveal>
    </section>
  );
};
