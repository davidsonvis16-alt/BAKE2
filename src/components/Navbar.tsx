import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Facebook, Heart, Instagram, Menu, MessageCircle, Music2, Phone, Search, ShoppingBag, X, Youtube } from 'lucide-react';
import { useCartAnimation } from './CartAnimation';
import { CATEGORIES } from '../data/menuData';
import { useMenuData } from '../hooks/useMenuData';
import { useScrollLock } from '../hooks/useScrollLock';
import { formatKsh, openStatus, orderCategories, PHONE_DISPLAY, PHONE_TEL, shortCategoryName, startingPrice, whatsappLink } from '../lib/menuMeta';
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
  const status = useMemo(() => openStatus(), []);
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
      {/* Utility strip */}
      <div className="bg-bm-coal text-[12px] font-semibold text-white/75">
        <div className="mx-auto flex h-9 max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <span className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${status.open ? 'bg-emerald-400' : 'bg-white/40'}`} />
            {status.label}
          </span>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="hidden items-center gap-1.5 hover:text-bm-orange sm:flex">
            <MessageCircle className="h-3.5 w-3.5 text-bm-orange" />
            Order on WhatsApp · {PHONE_DISPLAY}
          </a>
          <div className="flex items-center gap-3">
            <a href={PHONE_TEL} className="flex items-center gap-1.5 hover:text-bm-orange sm:hidden">
              <Phone className="h-3.5 w-3.5 text-bm-orange" />
              {PHONE_DISPLAY}
            </a>
            {SOCIALS.map(({ href, label, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="hidden hover:text-bm-orange lg:block">
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <header data-site-header className="sticky top-0 z-50 border-b border-white/10 bg-bm-ink text-white">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
          <button type="button" onClick={() => go('/')} className="flex shrink-0 items-center gap-2.5" aria-label="BakeMart Coffee House home">
            <img src="/logo.jpeg" alt="" className="h-10 w-10 rounded-full object-cover lg:h-11 lg:w-11" />
            <span className="text-left leading-none">
              <span className="block font-display text-[1.35rem] tracking-[0.04em] text-white lg:text-[1.5rem]">BAKEMART</span>
              <span className="mt-0.5 block text-[9px] font-extrabold uppercase tracking-[0.3em] text-bm-orange lg:text-[10px]">
                Coffee House
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {links.map((link) =>
              link.label === 'Menu' ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <NavLink link={link} onClick={() => go(link.path)} trailing={<ChevronDown className={`h-3.5 w-3.5 transition-transform ${megaOpen ? 'rotate-180' : ''}`} />} />
                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full w-[760px] -translate-x-1/2 pt-3"
                      >
                        <div className="rounded-[1.5rem] bg-white p-4 text-bm-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]">
                          <div className="grid grid-cols-3 gap-1">
                            {categories.map((c) => {
                              const from = startingPrice(menuItems.filter((i) => i.category === c.id));
                              return (
                                <button
                                  key={c.id}
                                  type="button"
                                  onClick={() => go(`/category/${c.id}`)}
                                  className="flex items-center gap-3 rounded-2xl p-2 text-left hover:bg-bm-cream"
                                >
                                  <img src={c.image} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" loading="lazy" />
                                  <span className="min-w-0">
                                    <span className="block truncate text-sm font-extrabold">{shortCategoryName(c)}</span>
                                    {from !== null && <span className="block text-xs font-semibold text-bm-muted">From {formatKsh(from)}</span>}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                          <button
                            type="button"
                            onClick={() => go('/menu')}
                            className="mt-3 flex w-full items-center justify-between rounded-2xl bg-bm-ink px-5 py-3.5 text-sm font-extrabold text-white hover:bg-bm-ember"
                          >
                            View the full menu
                            <span className="text-bm-orange">{menuItems.length} items →</span>
                          </button>
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

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <IconButton label="Search the menu" onClick={openSearch}>
              <Search className="h-5 w-5" />
            </IconButton>
            <IconButton label="Favourites" onClick={onOpenWishlist} badge={wishlistCount}>
              <Heart className="h-5 w-5" />
            </IconButton>
            <button
              type="button"
              onClick={() => go('/reservation')}
              className={`hidden h-10 items-center rounded-full border px-5 text-sm font-extrabold xl:inline-flex ${
                activePage === 'reservation' ? 'border-bm-orange text-bm-orange' : 'border-white/25 text-white hover:border-white'
              }`}
            >
              Reserve a table
            </button>
            <button
              ref={(el) => setCartRef(el, 'header')}
              type="button"
              onClick={onOpenCart}
              className="relative hidden h-10 items-center gap-2 rounded-full bg-bm-orange pl-4 pr-5 text-sm font-extrabold text-bm-ink hover:bg-bm-orange-hot lg:inline-flex"
            >
              <ShoppingBag className="h-4 w-4" />
              Cart
              <span className="grid h-6 min-w-6 place-items-center rounded-full bg-bm-ink px-1.5 text-[11px] text-white tabular-nums">{cartCount}</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 lg:hidden"
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
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4 sm:px-6">
              <span className="flex items-center gap-2.5">
                <img src="/logo.jpeg" alt="" className="h-10 w-10 rounded-full object-cover" />
                <span className="font-display text-[1.35rem] tracking-[0.04em]">BAKEMART</span>
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"
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
                    <span className="font-sans text-sm font-bold text-white/30">0{i + 1}</span>
                  </motion.button>
                ))}
              </nav>

              <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.22em] text-white/45">Jump to</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {categories.slice(0, 8).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => go(`/category/${c.id}`)}
                    className="flex items-center gap-2.5 rounded-2xl bg-white/5 p-2 text-left text-sm font-bold hover:bg-white/10"
                  >
                    <img src={c.image} alt="" className="h-9 w-9 shrink-0 rounded-xl object-cover" loading="lazy" />
                    <span className="truncate">{shortCategoryName(c)}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-2">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-bm-orange py-3.5 text-sm font-extrabold text-bm-ink"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a href={PHONE_TEL} className="flex items-center justify-center gap-2 rounded-full border border-white/25 py-3.5 text-sm font-extrabold">
                  <Phone className="h-4 w-4" />
                  Call us
                </a>
              </div>
              <div className="mt-6 flex justify-center gap-5 text-white/60">
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

const NavLink: React.FC<{
  link: { label: string; active: boolean };
  onClick: () => void;
  trailing?: React.ReactNode;
}> = ({ link, onClick, trailing }) => (
  <button
    type="button"
    onClick={onClick}
    aria-current={link.active ? 'page' : undefined}
    className={`relative flex h-10 items-center gap-1 px-3.5 text-sm font-bold ${link.active ? 'text-white' : 'text-white/65 hover:text-white'}`}
  >
    {link.label}
    {trailing}
    {link.active && (
      <motion.span
        layoutId="nav-underline"
        className="absolute inset-x-3.5 -bottom-[15px] h-[3px] rounded-full bg-bm-orange"
        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
      />
    )}
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
    className="relative grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10"
  >
    {children}
    {badge > 0 && (
      <span className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-bm-orange px-1 text-[10px] font-extrabold text-bm-ink">
        {badge}
      </span>
    )}
  </button>
);
