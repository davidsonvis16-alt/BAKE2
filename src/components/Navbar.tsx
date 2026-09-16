import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Facebook, Heart, Instagram, Menu, MessageCircle, Music2, Phone, Search, ShoppingBag, X, Youtube } from 'lucide-react';
import { useCartAnimation } from './CartAnimation';
import { CATEGORIES } from '../data/menuData';
import { useMenuData } from '../hooks/useMenuData';
import { useScrollLock } from '../hooks/useScrollLock';
import { formatKsh, orderCategories, PHONE_DISPLAY, PHONE_TEL, shortCategoryName, startingPrice, whatsappLink } from '../lib/menuMeta';
import { requestSearchFocus } from '../lib/searchFocus';

export type ActivePage = 'home' | 'menu' | 'category' | 'reservation' | 'admin' | 'gallery' | 'about' | 'faq' | 'specials';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  activePage: ActivePage;
  onNavigate: (path: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
}

const SOCIALS = [
  { href: 'https://www.instagram.com/bakemartcoffeehouse/', label: 'Instagram', icon: Instagram },
  { href: 'https://www.facebook.com/BakemartCoffeeHouse/', label: 'Facebook', icon: Facebook },
  { href: 'https://www.tiktok.com/@bakemartcoffeehouse', label: 'TikTok', icon: Music2 },
  { href: 'https://www.youtube.com/@bakemartcoffeehouse', label: 'YouTube', icon: Youtube },
];

export const Navbar: React.FC<NavbarProps> = ({ cartCount, wishlistCount, activePage, onNavigate, onOpenCart, onOpenWishlist }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { setCartRef } = useCartAnimation();
  const { menuItems } = useMenuData();
  const categories = useMemo(() => orderCategories(CATEGORIES), []);
  useScrollLock(mobileOpen);

  const links: { label: string; path: string; active: boolean }[] = [
    { label: 'Home', path: '/', active: activePage === 'home' },
    { label: 'Menu', path: '/menu', active: activePage === 'menu' || activePage === 'category' },
    { label: 'Deals', path: '/specials', active: activePage === 'specials' },
    { label: 'Gallery', path: '/gallery', active: activePage === 'gallery' },
    { label: 'About', path: '/about', active: activePage === 'about' },
    { label: 'FAQ', path: '/faq', active: activePage === 'faq' },
  ];

  const go = (path: string) => {
    setMegaOpen(false);
    setMobileOpen(false);
    onNavigate(path);
  };

  const openSearch = () => {
    setMobileOpen(false);
    onNavigate('/menu');
    requestSearchFocus();
  };

  return (
    <>
      {/* Signboard: matte black band, Anton signage type, ruled off in brand orange. */}
      <header data-site-header className="sticky top-0 z-50 border-b-2 border-bm-orange bg-bm-ink text-white">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center gap-3 px-4 sm:px-6 lg:h-[72px] lg:px-8">
          <button type="button" onClick={() => go('/')} className="flex shrink-0 items-center gap-3" aria-label="BakeMart Coffee House home">
            <img src="/logo.jpeg" alt="" className="h-10 w-10 rounded-[10px] object-cover ring-1 ring-white/15 lg:h-11 lg:w-11" />
            <span className="text-left">
              <span className="block font-display text-[1.3rem] leading-[0.85] tracking-[0.02em] text-white lg:text-[1.45rem]">BAKEMART</span>
              <span className="mt-[5px] block font-mono text-[9px] font-semibold uppercase leading-none tracking-[0.26em] text-white/45 lg:text-[10px]">
                Coffee House
              </span>
            </span>
          </button>

          <nav className="hidden flex-1 items-center justify-center lg:flex" aria-label="Main">
            {links.map((link) =>
              link.label === 'Menu' ? (
                <div
                  key={link.label}
                  className="static"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <NavLink
                    link={link}
                    onClick={() => go(link.path)}
                    trailing={<ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`} />}
                  />
                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.16 }}
                        className="pointer-events-none absolute inset-x-0 top-full pt-[2px]"
                      >
                        <div className="mx-auto max-w-[1320px] px-8">
                          <div className="pointer-events-auto mx-auto w-[840px] overflow-hidden rounded-b-[14px] border-x border-b border-white/10 bg-bm-coal shadow-[0_34px_70px_-24px_rgba(0,0,0,0.9)]">
                            <div className="grid grid-cols-3 gap-px bg-white/[0.06]">
                              {categories.map((c) => {
                                const from = startingPrice(menuItems.filter((i) => i.category === c.id));
                                return (
                                  <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => go(`/category/${c.id}`)}
                                    className="group flex items-center gap-3 bg-bm-coal p-3 text-left transition-colors hover:bg-bm-ember"
                                  >
                                    <img src={c.image} alt="" className="h-11 w-11 shrink-0 rounded-[8px] object-cover" loading="lazy" />
                                    <span className="min-w-0">
                                      <span className="block truncate font-display text-[0.95rem] uppercase tracking-[0.03em] text-white group-hover:text-bm-orange">
                                        {shortCategoryName(c)}
                                      </span>
                                      {from !== null && (
                                        <span className="mt-1 block font-mono text-[11px] font-semibold text-white/45">from {formatKsh(from)}</span>
                                      )}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                            <button
                              type="button"
                              onClick={() => go('/menu')}
                              className="flex w-full items-center justify-between bg-bm-orange px-5 py-4 font-display text-[1.05rem] uppercase tracking-[0.05em] text-bm-ink transition-colors hover:bg-white"
                            >
                              View the full menu
                              <span className="font-mono text-[11px] font-bold tracking-wider">{menuItems.length} ITEMS →</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink key={link.label} link={link} onClick={() => go(link.path)} />
              )
            )}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1 lg:ml-0 lg:gap-1.5">
            <a
              href={PHONE_TEL}
              className="hidden items-center gap-2 pr-2 font-mono text-[12px] font-semibold tracking-[0.02em] text-white/65 hover:text-bm-orange xl:flex"
            >
              <Phone className="h-3.5 w-3.5 text-bm-orange" />
              {PHONE_DISPLAY}
            </a>
            <span className="mr-1 hidden h-6 w-px bg-white/15 xl:block" aria-hidden="true" />

            <IconButton label="Search the menu" onClick={openSearch}>
              <Search className="h-5 w-5" />
            </IconButton>
            <IconButton label="Favourites" onClick={onOpenWishlist} badge={wishlistCount}>
              <Heart className="h-5 w-5" />
            </IconButton>
            <button
              type="button"
              onClick={() => go('/reservation')}
              className={`ml-1 hidden h-10 items-center rounded-[10px] border px-4 font-display text-[0.9rem] uppercase tracking-[0.06em] transition-colors xl:inline-flex ${
                activePage === 'reservation'
                  ? 'border-bm-orange text-bm-orange'
                  : 'border-white/20 text-white hover:border-bm-orange hover:text-bm-orange'
              }`}
            >
              Reserve
            </button>
            <button
              ref={(el) => setCartRef(el, 'header')}
              type="button"
              onClick={onOpenCart}
              aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
              className="relative ml-1 hidden h-10 items-center gap-3 rounded-[10px] bg-bm-orange pl-4 pr-3.5 font-display text-[0.9rem] uppercase tracking-[0.06em] text-bm-ink transition-colors hover:bg-white lg:inline-flex"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Cart
              </span>
              <span className="h-4 w-px bg-bm-ink/25" aria-hidden="true" />
              <span className="font-mono text-[12px] font-bold tabular-nums">{String(cartCount).padStart(2, '0')}</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-[10px] bg-white/10 text-white hover:bg-bm-orange hover:text-bm-ink lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-bm-ink text-white lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b-2 border-bm-orange px-4 sm:px-6">
              <span className="flex items-center gap-3">
                <img src="/logo.jpeg" alt="" className="h-10 w-10 rounded-[10px] object-cover ring-1 ring-white/15" />
                <span className="text-left">
                  <span className="block font-display text-[1.3rem] leading-[0.85] tracking-[0.02em]">BAKEMART</span>
                  <span className="mt-[5px] block font-mono text-[9px] font-semibold uppercase leading-none tracking-[0.26em] text-white/45">
                    Coffee House
                  </span>
                </span>
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-[10px] bg-white/10 hover:bg-bm-orange hover:text-bm-ink"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-6 sm:px-6" data-lenis-prevent>
              <nav aria-label="Mobile">
                {[...links, { label: 'Reserve', path: '/reservation', active: activePage === 'reservation' }].map((link, i) => (
                  <motion.button
                    key={link.label}
                    type="button"
                    onClick={() => go(link.path)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex w-full items-center justify-between border-b border-white/10 py-3 text-left font-display text-[2.6rem] uppercase leading-none ${
                      link.active ? 'text-bm-orange' : 'text-white'
                    }`}
                  >
                    {link.label}
                    <span className="font-mono text-xs font-bold text-white/30">0{i + 1}</span>
                  </motion.button>
                ))}
              </nav>

              <p className="mt-8 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-bm-orange">Jump to</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {categories.slice(0, 8).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => go(`/category/${c.id}`)}
                    className="flex items-center gap-2.5 rounded-[10px] bg-white/5 p-2 text-left hover:bg-white/10"
                  >
                    <img src={c.image} alt="" className="h-9 w-9 shrink-0 rounded-[8px] object-cover" loading="lazy" />
                    <span className="truncate font-display text-[0.85rem] uppercase tracking-[0.02em]">{shortCategoryName(c)}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-2">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-[10px] bg-bm-orange py-3.5 font-display text-[0.95rem] uppercase tracking-[0.06em] text-bm-ink"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={PHONE_TEL}
                  className="flex items-center justify-center gap-2 rounded-[10px] border border-white/20 py-3.5 font-display text-[0.95rem] uppercase tracking-[0.06em]"
                >
                  <Phone className="h-4 w-4" />
                  Call us
                </a>
              </div>
              <p className="mt-6 text-center font-mono text-[11px] text-white/45">Tropical House, Moi Road · Open daily 7AM–8PM</p>
              <div className="mt-4 flex justify-center gap-5 text-white/60">
                {SOCIALS.map(({ href, label, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="hover:text-bm-orange">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/**
 * Signage nav item. The label rolls up and an orange copy rolls in behind it — the same
 * kinetic-type idea the marquee and the footer wordmark use — so there is no travelling
 * pill or underline to fight the orange rule under the header.
 */
const NavLink: React.FC<{
  link: { label: string; active: boolean };
  onClick: () => void;
  trailing?: React.ReactNode;
}> = ({ link, onClick, trailing }) => (
  <button
    type="button"
    onClick={onClick}
    aria-current={link.active ? 'page' : undefined}
    className={`group flex h-[72px] items-center gap-1.5 px-4 font-display text-[0.95rem] uppercase tracking-[0.07em] ${
      link.active ? 'text-bm-orange' : 'text-white/75'
    }`}
  >
    <span className="relative block overflow-hidden py-[2px]">
      <span
        className={`block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          link.active ? '-translate-y-full' : 'group-hover:-translate-y-full'
        }`}
      >
        {link.label}
      </span>
      <span
        aria-hidden="true"
        className={`absolute inset-0 block py-[2px] text-bm-orange transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          link.active ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'
        }`}
      >
        {link.label}
      </span>
    </span>
    {trailing}
  </button>
);

const IconButton: React.FC<{ label: string; onClick: () => void; badge?: number; children: React.ReactNode }> = ({
  label,
  onClick,
  badge = 0,
  children,
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="relative grid h-10 w-10 place-items-center rounded-[10px] text-white transition-colors hover:bg-white/10 hover:text-bm-orange"
  >
    {children}
    {badge > 0 && (
      <span className="absolute right-0 top-0 grid h-[18px] min-w-[18px] place-items-center rounded-[6px] bg-bm-orange px-1 font-mono text-[10px] font-bold text-bm-ink">
        {badge}
      </span>
    )}
  </button>
);
