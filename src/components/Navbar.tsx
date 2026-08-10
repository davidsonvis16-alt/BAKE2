import React, { useState } from 'react';
import { ShoppingBag, Heart, Menu, X, Phone, Search } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
  activePage: 'home' | 'menu' | 'category' | 'reservation' | 'admin' | 'gallery' | 'about' | 'faq';
  onNavigateHome: () => void;
  onNavigateMenu: () => void;
  onNavigateCategories: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onNavigateGallery: () => void;
  onNavigateAbout: () => void;
  onNavigateFAQ: () => void;
  onNavigateReservation: () => void;
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
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', onClick: onNavigateHome, active: activePage === 'home' },
    { label: 'Full Menu', onClick: onNavigateMenu, active: activePage === 'menu' },
    { label: 'Categories', onClick: onNavigateCategories, active: activePage === 'category' },
    { label: 'Gallery', onClick: onNavigateGallery, active: activePage === 'gallery' },
    { label: 'About', onClick: onNavigateAbout, active: activePage === 'about' },
    { label: 'FAQ', onClick: onNavigateFAQ, active: activePage === 'faq' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 border-b border-[#e6d3c2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3 md:gap-6">
        {/* Logo */}
        <button onClick={onNavigateHome} className="flex items-center gap-2.5 shrink-0 group">
          <img
            src="/logo.jpeg"
            alt="BakeMart Coffee House"
            className="w-10 h-10 rounded-full border border-[#e6d3c2] object-cover group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-serif font-black text-sm md:text-base lg:text-lg text-[#1a120b] tracking-tight leading-none">
              BakeMart Coffee House
            </span>
            <span className="text-[10px] font-serif italic text-[#5c4b3f] tracking-wide mt-0.5 hidden sm:block">
              Beyond Sweetness — It is fresh and nutritional
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                item.active
                  ? 'bg-[#1a120b] text-[#d4a35a]'
                  : 'text-[#2b1b12] hover:bg-[#f5efe7] hover:text-[#1a120b]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hamburger Menu Button (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-[#f5efe7] text-[#2b1b12] transition-colors"
            title="Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 rounded-full hover:bg-[#f5efe7] text-[#2b1b12] transition-colors hidden sm:flex"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#d4a35a] text-[#1a120b] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-[#1a120b] hover:bg-[#2b1b12] text-white px-4 py-2 rounded-full font-bold text-xs md:text-sm transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-[#d4a35a]" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-[#d4a35a] text-[#1a120b] font-bold text-[10px] px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Reserve a Table (Desktop) */}
          <button
            onClick={onNavigateReservation}
            className="hidden lg:flex items-center gap-2 bg-[#d4a35a] hover:bg-[#e6c98f] text-[#1a120b] px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm"
          >
            Reserve a Table
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#e6d3c2] shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick();
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
                  item.active
                    ? 'bg-[#1a120b] text-[#d4a35a]'
                    : 'text-[#2b1b12] hover:bg-[#f5efe7]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#e6d3c2] space-y-1.5">
              <p className="px-4 text-[10px] uppercase tracking-widest text-[#5c4b3f] font-bold">
                Call / WhatsApp
              </p>
              <a
                href="https://wa.me/254725009708"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-[#2b1b12] hover:bg-[#f5efe7] transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0 text-[#d4a35a]" />
                <span>0725 009 708</span>
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Mobile Search */}
      <div className="px-4 sm:px-6 lg:px-8 pb-2.5 lg:hidden">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c7a6c]" />
          <input
            type="text"
            placeholder="Search for pizza, coffee, burgers, juices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#fdfaf3] border border-[#e6d3c2] focus:border-[#1a120b] text-sm text-[#2b1b12] placeholder-[#8c7a6c] rounded-full pl-10 pr-4 py-2.5 outline-none"
          />
        </div>
      </div>
    </header>
  );
};
