import React from 'react';
import { Home, UtensilsCrossed, ShoppingBag, Heart, Calendar, Gift } from 'lucide-react';
import { useCartAnimation } from './CartAnimation';

interface MobileBottomNavProps {
  activePage: 'home' | 'menu' | 'category' | 'reservation' | 'admin' | 'gallery' | 'about' | 'faq' | 'specials';
  onNavigateHome: () => void;
  onNavigateMenu: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onNavigateReservation: () => void;
  onNavigateSpecials: () => void;
  cartCount: number;
  wishlistCount: number;
}

interface TabItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  active: boolean;
  badge?: number;
  ref?: (el: HTMLButtonElement | null) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activePage,
  onNavigateHome,
  onNavigateMenu,
  onOpenCart,
  onOpenWishlist,
  onNavigateReservation,
  onNavigateSpecials,
  cartCount,
  wishlistCount,
}) => {
  const { setCartRef } = useCartAnimation();
  const tabs: TabItem[] = [
    {
      label: 'Home',
      icon: Home,
      onClick: onNavigateHome,
      active: activePage === 'home' || activePage === 'category',
      badge: undefined,
    },
    {
      label: 'Menu',
      icon: UtensilsCrossed,
      onClick: onNavigateMenu,
      active: activePage === 'menu',
      badge: undefined,
    },
    {
      label: 'Reserve',
      icon: Calendar,
      onClick: onNavigateReservation,
      active: activePage === 'reservation',
      badge: undefined,
    },
    {
      label: 'Specials',
      icon: Gift,
      onClick: onNavigateSpecials,
      active: activePage === 'specials',
      badge: undefined,
    },
    {
      label: 'Wishlist',
      icon: Heart,
      onClick: onOpenWishlist,
      active: false,
      badge: wishlistCount > 0 ? wishlistCount : undefined,
    },
    {
      label: 'Cart',
      icon: ShoppingBag,
      onClick: onOpenCart,
      active: false,
      badge: cartCount > 0 ? cartCount : undefined,
      ref: setCartRef,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#e6d3c2] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:hidden safe-bottom">
      <div className="flex items-center justify-around gap-1 px-2 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.active;
          return (
            <button
              key={tab.label}
              onClick={tab.onClick}
              ref={tab.ref}
              className={`relative flex flex-col items-center justify-center gap-0.5 rounded-2xl px-3 py-1.5 min-w-[64px] transition-all ${
                isActive
                  ? 'text-[#000000]'
                  : 'text-[#8c7a6c] hover:text-[#000000]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-[#d97a4c] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-semibold ${isActive ? 'text-[#000000]' : 'text-[#8c7a6c]'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#d97a4c]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
