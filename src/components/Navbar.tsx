import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Calendar, Menu, X, Phone, LogIn, Ticket } from 'lucide-react';

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
  onOpenReservation: () => void;
  onNavigateGallery: () => void;
  onNavigateAbout: () => void;
  onNavigateFAQ: () => void;
  onOpenLogin: () => void;
  onOpenTicketTracking: () => void;
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
  onOpenReservation,
  onNavigateGallery,
  onNavigateAbout,
  onNavigateFAQ,
  onOpenLogin,
  onOpenTicketTracking,
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

  const phoneNumbers = [
    { label: '0725 009 708', href: 'https://wa.me/254725009708' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EADECB] shadow-xs">
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3 md:gap-6">
        {/* Logo */}
        <button onClick={onNavigateHome} className="flex items-center gap-2.5 shrink-0 group text-left">
          <img
            src="/logo.jpeg"
            alt="BakeMart Logo"
            className="w-10 h-10 md:w-10 md:h-10 rounded-full border-2 border-[#000000] object-cover logo-img"
          />
          <div className="flex flex-col">
            <span className="font-serif font-black text-lg md:text-xl text-[#000000] tracking-tight leading-none">
              BakeMart Coffee House
            </span>
            <span className="text-[11px] font-serif italic text-[#000000] tracking-wide font-medium mt-0.5">
              Beyond Sweetness — It's fresh and nutritional
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#FAF3E7] p-1 rounded-full border border-[#EADECB]">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                item.active
                  ? 'bg-[#000000] text-orange-300 shadow-xs'
                  : 'text-[#000000] hover:text-[#000000]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Center Search Input */}
        <div className="flex-1 max-w-xs xl:max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#000000]" />
            <input
              type="text"
              placeholder="Search coffee, pizza, BBQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF3E7] border border-[#E1D4C0] focus:border-[#000000] focus:bg-white text-xs md:text-sm text-[#000000] placeholder-[#000000] rounded-full pl-9 pr-4 py-2 transition-all outline-none"
            />
             {searchQuery && (
               <button
                 onClick={() => setSearchQuery('')}
                 className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#000000] hover:text-[#000000] font-bold bg-[#EADECB] rounded-full w-4 h-4 flex items-center justify-center"
               >
                 <X className="w-3 h-3" />
               </button>
             )}
          </div>
        </div>

         {/* Right Actions */}
         <div className="flex items-center gap-2 sm:gap-3">
          {/* Ticket Tracking Button */}
          <button
            onClick={onOpenTicketTracking}
            className="hidden sm:flex p-2.5 rounded-full hover:bg-[#FAF3E7] text-[#000000] smooth-btn"
            title="Track Ticket"
          >
            <Ticket className="w-5 h-5" />
          </button>

          {/* Hamburger Menu Button (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full hover:bg-[#FAF3E7] text-[#000000] smooth-btn"
            title="Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Reservation CTA */}
          <button
            onClick={onOpenReservation}
            className="hidden sm:flex items-center gap-1.5 bg-[#FAF3E7] hover:bg-[#EADECB] text-[#000000] border border-[#D8C7B0] font-bold text-xs md:text-sm px-3.5 py-2 rounded-full smooth-btn shadow-xs"
          >
            <Calendar className="w-4 h-4 text-[#000000]" />
            <span>Book Table</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2.5 rounded-full hover:bg-[#FAF3E7] text-[#000000] smooth-btn"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#000000] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center smooth-badge shadow-md">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-[#000000] hover:bg-[#000000] text-white px-3.5 py-2 rounded-full font-bold text-xs md:text-sm smooth-btn shadow-md"
          >
            <ShoppingBag className="w-4 h-4 text-orange-300" />
            <span className="hidden xs:inline">Order</span>
            {cartCount > 0 && (
              <span className="bg-[#000000] text-white font-bold text-xs px-2 py-0.5 rounded-full smooth-badge">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EADECB] shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick();
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
                  item.active
                    ? 'bg-[#000000] text-orange-300'
                    : 'text-[#000000] hover:bg-[#FAF3E7]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#EADECB] space-y-1.5">
              <p className="px-4 text-[10px] uppercase tracking-widest text-[#000000]/60 font-bold">Call / WhatsApp</p>
              {phoneNumbers.map((phone) => (
                <a
                  key={phone.label}
                  href={phone.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-[#000000] hover:bg-[#FAF3E7] transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  {phone.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* Mobile Search Input */}
      <div className="px-4 pb-2.5 md:hidden">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#000000]" />
          <input
            type="text"
            placeholder="Search pizza, coffee, BBQ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAF3E7] border border-[#E1D4C0] focus:border-[#000000] text-sm text-[#000000] placeholder-[#000000] rounded-full pl-10 pr-4 py-2 outline-none"
          />
        </div>
      </div>
    </header>
  );
};