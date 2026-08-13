import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ShoppingBag, Heart, Phone, Search, Gift, X, Instagram, Facebook, Youtube, Music2 } from 'lucide-react';
import { HamburgerIcon } from './HamburgerIcon';
import { useCartAnimation } from './CartAnimation';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
  activePage: 'home' | 'menu' | 'category' | 'reservation' | 'admin' | 'gallery' | 'about' | 'faq' | 'specials';
  onNavigateHome: () => void;
  onNavigateMenu: () => void;
  onNavigateCategories: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onNavigateGallery: () => void;
  onNavigateAbout: () => void;
  onNavigateFAQ: () => void;
  onNavigateReservation: () => void;
  onNavigateSpecials: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  cartCount,
  wishlistCount,
  activePage,
  onNavigateHome,
  onNavigateMenu,
  onNavigateCategories,
  onOpenCart,
  onOpenWishlist,
  onNavigateGallery,
  onNavigateAbout,
  onNavigateFAQ,
  onNavigateReservation,
  onNavigateSpecials,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setCartRef } = useCartAnimation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const prevCartCount = useRef(cartCount);
  const [cartPulse, setCartPulse] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (cartCount > prevCartCount.current) {
      setCartPulse(true);
      const t = setTimeout(() => setCartPulse(false), 600);
      return () => clearTimeout(t);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  const primaryNav = [
    { label: 'Home', onClick: onNavigateHome, active: activePage === 'home' },
    { label: 'Full Menu', onClick: onNavigateMenu, active: activePage === 'menu' },
    { label: 'Categories', onClick: onNavigateCategories, active: activePage === 'category' },
    { label: 'Specials', icon: Gift, onClick: onNavigateSpecials, active: activePage === 'specials' },
    { label: 'Gallery', onClick: onNavigateGallery, active: activePage === 'gallery' },
  ];

  const mobileMenuItems = [
    { label: 'Home', onClick: onNavigateHome, active: activePage === 'home' },
    { label: 'Full Menu', onClick: onNavigateMenu, active: activePage === 'menu' },
    { label: 'Categories', onClick: onNavigateCategories, active: activePage === 'category' },
    { label: 'Specials', onClick: onNavigateSpecials, active: activePage === 'specials' },
    { label: 'Gallery', onClick: onNavigateGallery, active: activePage === 'gallery' },
    { label: 'About', onClick: onNavigateAbout, active: activePage === 'about' },
    { label: 'FAQ', onClick: onNavigateFAQ, active: activePage === 'faq' },
    { label: 'Reserve', onClick: onNavigateReservation, active: activePage === 'reservation' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-ivory)]/90 backdrop-blur-xl shadow-[0_8px_24px_rgba(26,18,11,0.06)] border-b border-[var(--color-warm-border-light)]'
          : 'bg-[var(--color-ivory)] border-b border-transparent'
      }`}
    >
      {/* ---- top utility strip ---- */}
      <div
        className={`hidden lg:block overflow-hidden transition-all duration-300 ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-9 opacity-100'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 xl:px-8 h-9 flex items-center justify-between text-[11px] font-semibold text-[var(--color-warm-stone)]">
          <span className="tracking-wide">Beyond Sweetness — It is fresh and nutritional</span>
          <div className="flex items-center gap-3">
            <a href="tel:+254725009708" className="flex items-center gap-1.5 text-[var(--color-espresso)] hover:text-[var(--color-orange-muted)] transition-colors">
              <Phone className="w-3 h-3" />
              <span>0725 009 708</span>
            </a>
            <a href="https://www.instagram.com/bakemartcoffeehouse/" target="_blank" rel="noreferrer" className="hover:text-[var(--color-orange-muted)] transition-colors">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="https://www.facebook.com/BakemartCoffeeHouse/" target="_blank" rel="noreferrer" className="hover:text-[var(--color-orange-muted)] transition-colors">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="https://www.tiktok.com/@bakemartcoffeehouse" target="_blank" rel="noreferrer" className="hover:text-[var(--color-orange-muted)] transition-colors">
              <Music2 className="w-3.5 h-3.5" />
            </a>
            <a href="https://www.youtube.com/@bakemartcoffeehouse" target="_blank" rel="noreferrer" className="hover:text-[var(--color-orange-muted)] transition-colors">
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ---- main row ---- */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8">
        <div className="h-16 lg:h-[68px] flex items-center justify-between gap-4">
          {/* logo */}
          <button onClick={onNavigateHome} className="flex items-center gap-3 shrink-0 group">
            <img
              src="/logo.jpeg"
              alt="BakeMart Coffee House"
              className="w-10 h-10 lg:w-11 lg:h-11 rounded-full object-cover ring-2 ring-[var(--color-warm-border)] group-hover:ring-[var(--color-gold)] transition-all"
            />
             <div className="text-left leading-tight">
               <div className="font-serif font-black text-[15px] lg:text-[17px] text-[var(--color-espresso)]">
                 BakeMart Coffee House
               </div>
               <div className="text-[10px] font-semibold tracking-wide text-[var(--color-warm-stone)] uppercase">
                 Nakuru City
               </div>
             </div>
          </button>

          {/* center pill nav — desktop only */}
          <nav className="hidden lg:flex items-center gap-1 bg-[var(--color-warm-bg-alt)] border border-[var(--color-warm-border-light)] rounded-full p-1">
            {primaryNav.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold smooth-nav ${
                  item.active
                    ? 'text-white'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-espresso)]'
                }`}
              >
                {item.active && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[var(--color-espresso)]"
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  {item.icon ? <item.icon className="w-3.5 h-3.5" /> : null}
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          {/* actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* expandable search — desktop */}
            <div className="hidden md:flex items-center">
              <AnimatePresence initial={false}>
                {isSearchOpen && (
                  <motion.input
                    ref={searchInputRef}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    type="text"
                    placeholder="Search coffee, pastries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => !searchQuery && setIsSearchOpen(false)}
                    className="smooth-input bg-[var(--color-warm-bg-alt)] border border-[var(--color-warm-border)] rounded-full px-4 py-2 text-sm text-[var(--color-espresso)] outline-none focus:border-[var(--color-gold)]"
                  />
                )}
              </AnimatePresence>
              <button
                onClick={() => setIsSearchOpen((v) => !v)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--color-warm-bg-alt)] smooth-nav text-[var(--color-espresso)]"
                title="Search"
              >
                {isSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              </button>
            </div>

            {/* wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--color-warm-bg-alt)] smooth-nav text-[var(--color-espresso)]"
              title="Wishlist"
            >
              <Heart className="w-[18px] h-[18px]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[var(--color-orange-muted)] text-white text-[9px] font-black">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* cart */}
            <motion.button
              ref={setCartRef}
              onClick={onOpenCart}
              animate={cartPulse ? { scale: [1, 1.18, 1] } : { scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative flex items-center gap-1.5 pl-3 pr-3.5 sm:pr-4 h-9 rounded-full bg-[var(--color-espresso)] text-white smooth-nav hover:bg-[var(--color-ink)]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-[13px] font-bold">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-[var(--color-gold)] text-[var(--color-espresso)] text-[10px] font-black ring-2 ring-[var(--color-ivory)]">
                  {cartCount}
                </span>
              )}
            </motion.button>

            {/* reserve — desktop only */}
            <button
              onClick={onNavigateReservation}
              className="hidden lg:inline-flex items-center h-9 px-4 rounded-full border border-[var(--color-warm-border)] text-[13px] font-bold text-[var(--color-espresso)] smooth-nav hover:border-[var(--color-espresso)]"
            >
              Reserve a Table
            </button>

            {/* hamburger — mobile only */}
            <div className="lg:hidden">
              <HamburgerIcon
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---- mobile tagline ---- */}
      <div className="md:hidden px-4 pt-2 pb-1">
        <span className="text-[10px] font-semibold tracking-wide text-[var(--color-warm-stone)] uppercase">
          Beyond Sweetness — It is fresh and nutritional
        </span>
      </div>

      {/* ---- mobile search — always visible under the main row on small screens ---- */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center gap-2 bg-[var(--color-warm-bg-alt)] border border-[var(--color-warm-border-light)] rounded-full px-4 py-2.5">
          <Search className="w-4 h-4 text-[var(--color-warm-stone)] shrink-0" />
          <input
            type="text"
            placeholder="Search for pizza, coffee, burgers, juices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-[var(--color-espresso)] placeholder:text-[var(--color-warm-stone)]"
          />
        </div>
      </div>

      {/* ---- mobile menu drawer ---- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-[var(--color-warm-black)]/40 z-40 lg:hidden"
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="fixed top-0 right-0 bottom-0 w-[82%] max-w-xs bg-[var(--color-ivory)] z-50 lg:hidden shadow-[0_0_40px_rgba(26,18,11,0.2)] flex flex-col"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-[var(--color-warm-border-light)]">
                <span className="font-serif font-black text-[var(--color-espresso)]">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-warm-bg-alt)]"
                >
                  <X className="w-4 h-4 text-[var(--color-espresso)]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-4 flex flex-col gap-1">
                {mobileMenuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.onClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left px-4 py-3 rounded-2xl text-[15px] font-bold smooth-nav ${
                      item.active
                        ? 'bg-[var(--color-espresso)] text-white'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-warm-bg-alt)]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="p-4 border-t border-[var(--color-warm-border-light)] safe-bottom">
                <p className="eyebrow mb-2 px-1">Call / WhatsApp</p>
                <a
                  href="https://wa.me/254725009708"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[var(--color-warm-bg-alt)] font-bold text-[var(--color-espresso)]"
                >
                  <Phone className="w-4 h-4 shrink-0 text-[var(--color-orange-muted)]" />
                  0725 009 708
                </a>
                <button
                  onClick={() => {
                    onNavigateReservation();
                    setIsMobileMenuOpen(false);
                  }}
                  className="btn-primary w-full mt-3 py-3 text-sm"
                >
                  Reserve a Table
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};