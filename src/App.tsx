import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, ActivePage } from './components/Navbar';
import { HomePage } from './components/home/HomePage';
import { MenuBrowser } from './components/menu/MenuBrowser';
import { ReservationSection } from './components/ReservationSection';
import { SpecialsPage } from './components/SpecialsPage';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { CartAnimationProvider } from './components/CartAnimation';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CartDock } from './components/CartDock';
import { useAuth } from './components/AuthContext';
import { useMenuData } from './hooks/useMenuData';
import { MenuItem, MenuItemOption, CartItem } from './types';
import { CATEGORIES } from './data/menuData';
import { destroySmoothScroll, initSmoothScroll, scrollToY } from './lib/smoothScroll';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, loading, isAdmin } = useAuth();
  const { menuItems } = useMenuData();
  const [searchQuery, setSearchQuery] = useState('');

  const path = location.pathname;
  const isAdminRoute = path === '/admin';
  const activePage = useMemo<ActivePage>(() => {
    if (path === '/menu') return 'menu';
    if (path.startsWith('/category/')) return 'category';
    if (path === '/reservation') return 'reservation';
    if (path === '/admin') return 'admin';
    if (path === '/gallery') return 'gallery';
    if (path === '/about') return 'about';
    if (path === '/faq') return 'faq';
    if (path === '/specials') return 'specials';
    return 'home';
  }, [path]);

  const selectedCategory = useMemo(() => {
    const match = path.match(/^\/category\/(.+)$/);
    return match ? match[1] : 'pizza-pasta';
  }, [path]);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bakemart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bakemart_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('bakemart_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('bakemart_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  // Inertia scrolling on the public site only; the admin dashboard keeps native scroll.
  useEffect(() => {
    if (isAdminRoute) return;
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, [isAdminRoute]);

  // New page → start at the top. Switching between categories glides instead of jumping.
  const prevPathRef = useRef(path);
  useEffect(() => {
    const prev = prevPathRef.current;
    prevPathRef.current = path;
    if (prev === path) return;
    const betweenCategories = prev.startsWith('/category/') && path.startsWith('/category/');
    scrollToY(0, !betweenCategories);
  }, [path]);

  useEffect(() => {
    const canonical = `https://www.bakemart.co.ke${location.pathname}`;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [location.pathname]);

  useEffect(() => {
    const category = activePage === 'category'
      ? CATEGORIES.find((c) => c.id === selectedCategory)
      : null;
    const catName = category?.name || '';

    const pageMeta: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string }> = {
      home: {
        title: 'Coffee House & Restaurant in Nakuru | BakeMart Coffee House',
        description: 'BakeMart Coffee House is a coffee house and restaurant in Nakuru, Kenya. Located on Moi Road, Tropical House. Fresh coffee, pastries, cakes, and meals. Open daily 7AM–8PM. Order via Glovo or WhatsApp.',
        ogTitle: 'Coffee House & Restaurant in Nakuru | BakeMart Coffee House',
        ogDescription: 'BakeMart Coffee House: fresh coffee, pastries, cakes, and meals in Nakuru. Open kitchen on Moi Road, Tropical House.',
      },
      menu: {
        title: 'Food & Coffee Menu in Nakuru | BakeMart Coffee House',
        description: 'Explore BakeMart\'s full menu in Nakuru. Fresh coffee, pastries, cakes, pizzas, burgers, waffles, and more. Order now via WhatsApp or Glovo delivery.',
        ogTitle: 'Food & Coffee Menu in Nakuru | BakeMart Coffee House',
        ogDescription: 'Fresh coffee, pastries, pizzas, burgers, waffles and more at BakeMart Coffee House in Nakuru.',
      },
      category: {
        title: `${catName} in Nakuru | BakeMart Coffee House`,
        description: `Browse ${catName.toLowerCase()} at BakeMart Coffee House in Nakuru. Freshly prepared items from our open kitchen on Moi Road, Tropical House.`,
        ogTitle: `${catName} in Nakuru | BakeMart Coffee House`,
        ogDescription: `${catName} at BakeMart Coffee House Nakuru — fresh, open-kitchen, and locally loved.`,
      },
      gallery: {
        title: 'Cafe & Restaurant Gallery in Nakuru | BakeMart Coffee House',
        description: 'Browse photos of BakeMart Coffee House in Nakuru — our open kitchen, fresh pastries, coffee, and cozy dining space on Moi Road.',
        ogTitle: 'Cafe & Restaurant Gallery in Nakuru | BakeMart Coffee House',
        ogDescription: 'Photos of BakeMart Coffee House in Nakuru — open kitchen, fresh pastries, coffee, and cozy dining.',
      },
      about: {
        title: 'About Us — BakeMart Coffee House Nakuru',
        description: 'Learn about BakeMart Coffee House, Nakuru\'s open-kitchen coffee shop and restaurant on Moi Road. Fresh food, affordable prices, and local flavors.',
        ogTitle: 'About Us — BakeMart Coffee House Nakuru',
        ogDescription: 'BakeMart Coffee House: Nakuru\'s open-kitchen coffee shop and restaurant on Moi Road, Tropical House.',
      },
      faq: {
        title: 'FAQ — BakeMart Coffee House Nakuru',
        description: 'Frequently asked questions about BakeMart Coffee House in Nakuru — location, hours, delivery, menu, and contact details.',
        ogTitle: 'FAQ — BakeMart Coffee House Nakuru',
        ogDescription: 'FAQ for BakeMart Coffee House Nakuru — location, hours, delivery, and contact info.',
      },
      reservation: {
        title: 'Table Reservation — BakeMart Coffee House Nakuru',
        description: 'Book a table at BakeMart Coffee House in Nakuru. Reserve via WhatsApp for coffee dates, family meals, or business lunches on Moi Road.',
        ogTitle: 'Table Reservation — BakeMart Coffee House Nakuru',
        ogDescription: 'Reserve your table at BakeMart Coffee House Nakuru via WhatsApp.',
      },
      specials: {
        title: 'Specials & Combos — BakeMart Coffee House Nakuru',
        description: 'Discover specials, combos, and promotions at BakeMart Coffee House in Nakuru. Barbecue platters, meal deals, and more.',
        ogTitle: 'Specials & Combos — BakeMart Coffee House Nakuru',
        ogDescription: 'Specials and combos at BakeMart Coffee House Nakuru — barbecue platters, meal deals, and more.',
      },
    };

    const meta = pageMeta[activePage] || pageMeta.home;
    if (!meta) return;

    document.title = meta.title;

    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute('content', meta.description);

    const updateMeta = (selector: string, attr: string, content: string) => {
      const tag = document.querySelector(selector);
      if (tag) tag.setAttribute(attr, content);
    };

    updateMeta('meta[property="og:title"]', 'content', meta.ogTitle);
    updateMeta('meta[property="og:description"]', 'content', meta.ogDescription);
    updateMeta('meta[name="twitter:title"]', 'content', meta.ogTitle);
    updateMeta('meta[name="twitter:description"]', 'content', meta.ogDescription);
  }, [activePage, selectedCategory]);

  const handleAddToCart = (item: MenuItem, selectedOption?: MenuItemOption) => {
    const cartItemId = selectedOption ? `${item.id}-${selectedOption.name}` : item.id;

    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.id === cartItemId);
      if (existing) {
        return prev.map((ci) =>
          ci.id === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      } else {
        return [...prev, { id: cartItemId, item, quantity: 1, selectedOption }];
      }
    });
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.id === cartItemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (item: MenuItem) => {
    setWishlistIds((prev) =>
      prev.includes(item.id)
        ? prev.filter((id) => id !== item.id)
        : [...prev, item.id]
    );
  };

  const wishlistItems = menuItems.filter((i) => wishlistIds.includes(i.id));
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (isAdminRoute) {
    if (loading) {
      return (
        <div className="page-transition-overlay">
          <p style={{ color: '#000000' }}>Loading...</p>
        </div>
      );
    }
    if (!session || !isAdmin) {
      return <Login />;
    }
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FAF3E7', display: 'flex', flexDirection: 'column' }}>
        <AdminDashboard onCloseAdmin={() => navigate('/')} />
      </div>
    );
  }

  const menuHandlers = {
    cartItems,
    wishlistIds,
    onAddToCart: handleAddToCart,
    onUpdateQuantity: handleUpdateQuantity,
    onToggleWishlist: handleToggleWishlist,
  };

  let page: React.ReactNode;
  switch (activePage) {
    case 'menu':
    case 'category':
      page = (
        <MenuBrowser
          mode={activePage === 'menu' ? 'all' : 'category'}
          categoryId={activePage === 'category' ? selectedCategory : undefined}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectCategory={(id) => navigate(`/category/${id}`)}
          onNavigateAll={() => navigate('/menu')}
          {...menuHandlers}
        />
      );
      break;
    case 'reservation':
      page = (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
          <ReservationSection headingLevel={1} />
        </div>
      );
      break;
    case 'gallery':
      page = <Gallery />;
      break;
    case 'about':
      page = <About />;
      break;
    case 'faq':
      page = <FAQ />;
      break;
    case 'specials':
      page = <SpecialsPage onNavigate={navigate} onAddToCart={handleAddToCart} />;
      break;
    default:
      page = <HomePage onNavigate={navigate} {...menuHandlers} />;
  }

  return (
    <CartAnimationProvider>
      <div className="flex min-h-screen flex-col overflow-x-clip bg-bm-cream font-sans text-bm-ink selection:bg-bm-orange selection:text-bm-ink">
        <Navbar
          cartCount={totalCartCount}
          wishlistCount={wishlistIds.length}
          activePage={activePage}
          onNavigate={navigate}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
        />
        <main className="flex-1">{page}</main>
        <Footer />
      </div>

      <MobileBottomNav
        activePage={activePage}
        cartCount={totalCartCount}
        onNavigate={navigate}
        onOpenCart={() => setIsCartOpen(true)}
      />
      <CartDock cartItems={cartItems} hidden={isCartOpen || isWishlistOpen} onOpenCart={() => setIsCartOpen(true)} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />
    </CartAnimationProvider>
  );
}
