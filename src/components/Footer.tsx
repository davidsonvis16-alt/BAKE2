import React from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook, Youtube, Music2, ArrowUpRight, Flame } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black text-[#FAF3E7] pt-0 pb-24 md:pb-0">
      <style>{`
        @keyframes bm-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .bm-marquee-track {
          animation: bm-marquee 22s linear infinite;
        }
      `}</style>

      {/* Torn / flame edge divider — signature move, nods to the open-kitchen "fresh, hot" identity */}
      <div className="w-full leading-[0] -mb-px" aria-hidden="true">
        <svg
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          className="w-full h-8 md:h-10"
        >
          <polygon
            fill="#C2410C"
            points="0,40 0,10 40,26 80,4 120,22 160,2 200,24 240,8 280,28 320,6 360,20 400,2 440,26 480,10 520,30 560,4 600,22 640,8 680,26 720,2 760,20 800,10 840,28 880,4 920,24 960,8 1000,26 1040,2 1080,22 1120,6 1160,28 1200,10 1200,40"
          />
        </svg>
      </div>

      {/* CTA Band — the loud, confident chain-style promo strip */}
      <div className="bg-[#C2410C] text-black">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-black/60 mb-1">
              Nakuru's own open kitchen
            </p>
            <h2 className="font-black uppercase text-3xl sm:text-4xl md:text-5xl leading-[0.95] tracking-tight">
              Hungry? We're<br className="hidden sm:block" /> open till 8.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <a
              href="https://wa.me/254725009708?text=Hello%20BakeMart%20Coffee%20House,%20I%20would%20like%20to%20order..."
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-black text-[#FAF3E7] text-sm font-black uppercase tracking-wide px-6 py-3.5 rounded-full hover:bg-neutral-900 transition-colors"
            >
              Order on WhatsApp
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://www.glovoapp.com"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-[#FAF3E7] text-black text-sm font-black uppercase tracking-wide px-6 py-3.5 rounded-full border-2 border-black/10 hover:bg-white transition-colors"
            >
              Get it on Glovo
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main columns */}
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand Info */}
          <div className="space-y-4 lg:pr-6 lg:border-r lg:border-neutral-800">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpeg"
                alt="BakeMart Logo"
                className="w-11 h-11 rounded-full border-2 border-[#C2410C] object-cover"
              />
              <div>
                <h3 className="font-black uppercase text-lg tracking-tight text-white leading-none">
                  BakeMart<br />Coffee House
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#C2410C] font-bold uppercase tracking-wide">
              Beyond sweetness — it's fresh and nutritional
            </p>

            <p className="text-xs text-[#D9C4A8] leading-relaxed">
              The only open-kitchen coffee shop in Nakuru City. On Moi Road at Tropical House, behind Gilanis Supermarket and beside Nakuru GPO. Watch every plate come together in a trendy, relaxed, cozy space.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href="https://www.instagram.com/bakemartcoffeehouse/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-700 text-[#FAF3E7] hover:bg-[#C2410C] hover:border-[#C2410C] hover:text-black transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/BakemartCoffeeHouse/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-700 text-[#FAF3E7] hover:bg-[#C2410C] hover:border-[#C2410C] hover:text-black transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@bakemartcoffeehouse"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-700 text-[#FAF3E7] hover:bg-[#C2410C] hover:border-[#C2410C] hover:text-black transition-colors"
              >
                <Music2 className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@bakemartcoffeehouse"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-700 text-[#FAF3E7] hover:bg-[#C2410C] hover:border-[#C2410C] hover:text-black transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="mailto:Salesbakemart.co.ke@gmail.com"
                className="text-[11px] font-bold uppercase tracking-wide text-[#D9C4A8] underline underline-offset-4 decoration-neutral-700 hover:text-[#C2410C] hover:decoration-[#C2410C] transition-colors ml-1"
              >
                Email us
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-black uppercase text-xs tracking-[0.2em] text-[#C2410C] pb-2 border-b-2 border-[#C2410C] inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D9C4A8]">
              <li><a href="/" className="hover:text-[#C2410C] transition-colors">Home</a></li>
              <li><a href="/menu" className="hover:text-[#C2410C] transition-colors">Menu</a></li>
              <li><a href="/specials" className="hover:text-[#C2410C] transition-colors">Specials</a></li>
              <li><a href="/gallery" className="hover:text-[#C2410C] transition-colors">Gallery</a></li>
              <li><a href="/about" className="hover:text-[#C2410C] transition-colors">About us</a></li>
              <li><a href="/faq" className="hover:text-[#C2410C] transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Visit Us */}
          <div className="space-y-4">
            <h4 className="font-black uppercase text-xs tracking-[0.2em] text-[#C2410C] pb-2 border-b-2 border-[#C2410C] inline-block">
              Visit Us
            </h4>
            <ul className="space-y-3 text-sm text-[#D9C4A8]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
                <span>Moi Road, Tropical House, Nakuru — behind Gilanis Supermarket, beside Nakuru GPO</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C2410C] shrink-0" />
                <span>Open daily · closes 8:00 PM</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C2410C] shrink-0" />
                <a href="tel:+254725009708" className="hover:text-[#C2410C] transition-colors font-semibold">0725 009 708</a>
              </li>
            </ul>
          </div>

          {/* Order & Delivery */}
          <div className="space-y-4 bg-[#171310] p-5 rounded-2xl border border-neutral-800">
            <h4 className="font-black uppercase text-xs tracking-[0.2em] text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#C2410C]" />
              Order & Delivery
            </h4>
            <p className="text-xs text-[#D9C4A8] leading-relaxed">
              Delivery available via Glovo — search "BakeMart Coffee House Nakuru" to order straight to your door.
            </p>
            <a
              href="https://wa.me/254725009708?text=Hello%20BakeMart%20Coffee%20House,%20I%20would%20like%20to%20order..."
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#C2410C] hover:bg-[#EA580C] text-black text-xs font-black uppercase tracking-wide py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
            >
              Chat on WhatsApp
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>

      {/* Marquee ticker */}
      <div className="border-y border-neutral-800 bg-black overflow-hidden">
        <div className="flex whitespace-nowrap py-3 bm-marquee-track w-max">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex items-center shrink-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="mx-4 text-xs font-black uppercase tracking-[0.25em] text-[#C2410C] flex items-center gap-4"
                >
                  Nakuru's own
                  <span className="text-neutral-700">✦</span>
                  Open kitchen
                  <span className="text-neutral-700">✦</span>
                  Fresh daily
                  <span className="text-neutral-700">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-2">
        <p>© {new Date().getFullYear()} BakeMart Coffee House. All rights reserved.</p>
        <p>
          Website by{' '}
          <a
            href="https://portfolio-e-mu.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-300 hover:text-[#C2410C] transition-colors underline underline-offset-2 decoration-neutral-700 hover:decoration-[#C2410C]"
          >
            Eden
          </a>
        </p>
      </div>
    </footer>
  );
};