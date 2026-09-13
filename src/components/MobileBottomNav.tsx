import React from 'react';
import { CalendarCheck, Home, ShoppingBag, Tag, UtensilsCrossed } from 'lucide-react';
import { useCartAnimation } from './CartAnimation';
import type { ActivePage } from './Navbar';

interface MobileBottomNavProps {
  activePage: ActivePage;
  cartCount: number;
  onNavigate: (path: string) => void;
  onOpenCart: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activePage, cartCount, onNavigate, onOpenCart }) => {
  const { setCartRef } = useCartAnimation();

  const tabs = [
    { label: 'Home', icon: Home, onClick: () => onNavigate('/'), active: activePage === 'home' },
    { label: 'Menu', icon: UtensilsCrossed, onClick: () => onNavigate('/menu'), active: activePage === 'menu' || activePage === 'category' },
    { label: 'Deals', icon: Tag, onClick: () => onNavigate('/specials'), active: activePage === 'specials' },
    { label: 'Reserve', icon: CalendarCheck, onClick: () => onNavigate('/reservation'), active: activePage === 'reservation' },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-bm-ink pb-[env(safe-area-inset-bottom)] text-white lg:hidden"
      aria-label="Quick navigation"
    >
      <div className="mx-auto grid h-16 max-w-xl grid-cols-5">
        {tabs.map(({ label, icon: Icon, onClick, active }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            aria-current={active ? 'page' : undefined}
            className={`relative flex flex-col items-center justify-center gap-1 text-[11px] font-bold ${active ? 'text-bm-orange' : 'text-white/60'}`}
          >
            {active && <span className="absolute top-0 h-[3px] w-8 rounded-b-full bg-bm-orange" />}
            <Icon className="h-[22px] w-[22px]" strokeWidth={active ? 2.4 : 2} />
            {label}
          </button>
        ))}
        <button
          ref={(el) => setCartRef(el, 'dock')}
          type="button"
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center gap-1 text-[11px] font-bold text-white"
          aria-label={`Cart, ${cartCount} items`}
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-bm-orange text-bm-ink">
            <ShoppingBag className="h-[18px] w-[18px]" />
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-white px-1 text-[10px] font-extrabold text-bm-ink">
                {cartCount}
              </span>
            )}
          </span>
        </button>
      </div>
    </nav>
  );
};
