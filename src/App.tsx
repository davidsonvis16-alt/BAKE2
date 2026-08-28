import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { CategoryUnfoldView } from './components/CategoryUnfoldView';
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
import { FeatureCards } from './components/FeatureCards';
import { StatsSection } from './components/StatsSection';
import { CartAnimationProvider } from './components/CartAnimation';
import { CartPill } from './components/CartPill';
import { FloatingContactButtons } from './components/FloatingContactButtons';
import { useAuth } from './components/AuthContext';
import { useMenuData } from './hooks/useMenuData';
import { MenuItem, MenuItemOption, CartItem } from './types';
import { CATEGORIES } from './data/menuData';
import { ShoppingBag, Send, Search, X } from 'lucide-react';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, loading, isAdmin } = useAuth();
  const { menuItems } = useMenuData();
  const [searchQuery, setSearchQuery] = useState('');

  const path = location.pathname;
  const activePage = useMemo<'home' | 'menu' | 'category' | 'reservation' | 'admin' | 'gallery' | 'about' | 'faq' | 'specials'>(() => {
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

  const handleReorderBatch = (orderItems: { item: MenuItem; quantity: number; optionName?: string }[]) => {
    setCartItems((prevCart) => {
      let updatedCart = [...prevCart];

      orderItems.forEach(({ item, quantity, optionName }) => {
        let opt: MenuItemOption | undefined = undefined;
        if (optionName && item.options) {
          opt = item.options.find((o) => o.name === optionName);
        } else if (item.options && item.options.length > 0) {
          opt = item.options[0];
        }

        const cartItemId = opt ? `${item.id}-${opt.name}` : item.id;
        const existingIdx = updatedCart.findIndex((c) => c.id === cartItemId);

        if (existingIdx > -1) {
          updatedCart[existingIdx] = {
            ...updatedCart[existingIdx],
            quantity: updatedCart[existingIdx].quantity + quantity,
          };
        } else {
          updatedCart.push({
            id: cartItemId,
            item,
            quantity,
            selectedOption: opt,
          });
        }
      });

      return updatedCart;
    });

    setIsCartOpen(true);
  };

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
        title: 'Coffee House & Bakery in Nakuru | BakeMart Coffee House',
        description: 'BakeMart Coffee House is a coffee house and bakery in Nakuru, Kenya. Located on Moi Road, Tropical House. Fresh coffee, pastries, cakes, and meals. Open daily 7AM–8PM. Order via Glovo or WhatsApp.',
        ogTitle: 'Coffee House & Bakery in Nakuru | BakeMart Coffee House',
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
        title: 'Cafe & Bakery Gallery in Nakuru | BakeMart Coffee House',
        description: 'Browse photos of BakeMart Coffee House in Nakuru — our open kitchen, fresh pastries, coffee, and cozy dining space on Moi Road.',
        ogTitle: 'Cafe & Bakery Gallery in Nakuru | BakeMart Coffee House',
        ogDescription: 'Photos of BakeMart Coffee House in Nakuru — open kitchen, fresh pastries, coffee, and cozy dining.',
      },
      about: {
        title: 'About Us — BakeMart Coffee House Nakuru',
        description: 'Learn about BakeMart Coffee House, Nakuru\'s open-kitchen coffee shop and bakery on Moi Road. Fresh food, affordable prices, and local flavors.',
        ogTitle: 'About Us — BakeMart Coffee House Nakuru',
        ogDescription: 'BakeMart Coffee House: Nakuru\'s open-kitchen coffee shop and bakery on Moi Road, Tropical House.',
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

  const [prevPath, setPrevPath] = useState(path);

  const handleSelectCategory = (catId: string) => {
    navigate(`/category/${catId}`);
  };

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

  const handleAddToCartById = (itemId: string) => {
    const item = menuItems.find((i) => i.id === itemId);
    if (item) {
      handleAddToCart(item);
      setIsCartOpen(true);
    }
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

  const handleOpenReservation = () => {
    navigate('/reservation');
  };

  const wishlistItems = menuItems.filter((i) => wishlistIds.includes(i.id));
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (path === '/admin') {
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

  return (
    <CartAnimationProvider>
      <div style={{ minHeight: '100vh', backgroundColor: '#FAF3E7', color: '#000000', display: 'flex', flexDirection: 'column', fontFamily: 'Plus Jakarta Sans, sans-serif', paddingBottom: '4rem' }} className="selection-bg-black selection-text-white overflow-x-hidden">
      
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={(query) => {
          setSearchQuery(query);
          if (query && activePage !== 'menu') {
            navigate('/menu');
          }
        }}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        activePage={activePage}
        onNavigateHome={() => navigate('/')}
        onNavigateMenu={() => navigate('/menu')}
        onNavigateCategories={() => {
          handleSelectCategory('bakery-desserts');
        }}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onNavigateGallery={() => navigate('/gallery')}
        onNavigateAbout={() => navigate('/about')}
        onNavigateFAQ={() => navigate('/faq')}
        onNavigateReservation={handleOpenReservation}
        onNavigateSpecials={() => navigate('/specials')}
        />

      <main style={{ flex: 1 }}>
        {activePage === 'category' ? (
          <CategoryUnfoldView
            categoryId={selectedCategory}
            onSelectCategory={handleSelectCategory}
            onBackToHome={() => navigate('/')}
            wishlistIds={wishlistIds}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
          />
         ) : activePage === 'menu' ? (
           <div className="menu-page-container">
             <div className="menu-page-header">
               <div className="menu-page-header-inner">
                 <div className="menu-page-header-content">
                    <span className="menu-page-eyebrow">BAKEMART MENU</span>
                    <h1 className="menu-page-title">
                      COFFEE, PASTRIES &amp;
                      <br />
                      <span className="text-[#d97a4c]">FRESH FOOD IN NAKURU</span>
                    </h1>
                    <p className="menu-page-description">
                      Freshly prepared food, coffee, pastries and everyday favourites from our open kitchen in Nakuru. — <button onClick={() => navigate('/specials')} className="menu-page-link">See specials</button> and <button onClick={() => navigate('/gallery')} className="menu-page-link">gallery</button>.
                    </p>
                    <div className="menu-page-actions">
                      <button
                        onClick={() => {
                          document.getElementById('full-menu')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="menu-page-btn-primary"
                      >
                        View Menu
                      </button>
                      <button
                        onClick={() => setIsCartOpen(true)}
                        className="menu-page-btn-secondary"
                      >
                        Order Now
                      </button>
                    </div>
                 </div>
                    <div className="relative mx-auto max-w-[85%] sm:max-w-sm lg:max-w-none">
                      <div className="relative w-full mx-auto">
                        <img
                          src="/gallery-16.jpg"
                          alt="Signature dish from BakeMart Coffee House open kitchen in Nakuru"
                          className="w-full h-auto"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/gallery-16.jpg';
                          }}
                        />
                      </div>
                    </div>
               </div>
             </div>

              <MenuSection
               searchQuery={searchQuery}
               selectedCategory={selectedCategory === 'pizza-pasta' && activePage === 'menu' ? 'all' : selectedCategory}
               onSelectCategory={handleSelectCategory}
               wishlistIds={wishlistIds}
               onAddToCart={handleAddToCart}
               onToggleWishlist={handleToggleWishlist}
             />

             <div className="menu-map-section">
               <div className="menu-map-inner">
                 <span className="menu-map-eyebrow">VISIT US</span>
                 <h2 className="menu-map-title">Find Us in Nakuru</h2>
                 <p className="menu-map-description">
                   Tropical House, Moi Road — behind Gilanis Supermarket, beside Nakuru GPO.
                 </p>
                 <div className="menu-map-embed">
                   <iframe
                     title="BakeMart Coffee House location"
                     src="https://www.google.com/maps?q=BakeMart+Coffee+House,Tropical+House,Moi+Road,Nakuru&output=embed"
                     allowFullScreen
                     loading="lazy"
                     referrerPolicy="no-referrer"
                     className="w-full h-full border-0"
                   />
                 </div>
               </div>
             </div>
           </div>
         ) : activePage === 'reservation' ? (
           <div style={{ paddingTop: '2rem', paddingBottom: '2rem', maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
             <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               <button
                 onClick={() => navigate('/')}
                 style={{ backgroundColor: 'white', color: '#000000', fontSize: '0.75rem', fontWeight: 700, padding: '0.5rem 1rem', borderRadius: '9999px', border: '1px solid #EADECB', cursor: 'pointer' }}
               >
                 ← Back to Home
               </button>
             </div>
             <ReservationSection headingLevel={1} />
           </div>
        ) : activePage === 'gallery' ? (
          <Gallery />
        ) : activePage === 'about' ? (
          <About />
        ) : activePage === 'faq' ? (
          <FAQ />
        ) : activePage === 'specials' ? (
          <SpecialsPage onNavigateMenu={() => navigate('/menu')} onAddToCart={handleAddToCartById} onSelectCategory={handleSelectCategory} />
         ) : (
           <div>
              <Hero
                onScrollToMenu={() => navigate('/menu')}
              />

              <section className="search-bar">
                <div className="search-bar-inner">
                  <div className="search-bar-input-wrap">
                    <Search className="search-bar-icon" />
                    <input
                      type="text"
                      placeholder="Search for pizza, coffee, burgers, juices..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchQuery.trim()) {
                          navigate('/menu');
                        }
                      }}
                      className="search-bar-input"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="search-bar-clear"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </section>

              <FeatureCards onNavigateMenu={() => navigate('/menu')} />

              <StatsSection />
            </div>
        )}
      </main>

      <CartPill cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />

      <Footer />

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

      <div className="sticky-bottom-bar">
        <div className="sticky-bottom-bar-inner">
          <button
            onClick={() => setIsCartOpen(true)}
            className="sticky-cart-btn"
          >
            <ShoppingBag className="w-4 h-4" style={{ color: '#d97a4c' }} />
            <span>View Cart ({totalCartCount})</span>
          </button>

          <span style={{ display: 'none', fontSize: '0.75rem', fontWeight: 600, color: '#5c4b3f', letterSpacing: '0.05em' }} className="xl:block">
            Fast &amp; Secure Checkout
          </span>

          <button
            onClick={() => {
              if (cartItems.length === 0) return;
              const total = cartItems.reduce((acc, ci) => {
                const price = ci.selectedOption ? ci.selectedOption.price : ci.item.price;
                return acc + price * ci.quantity;
              }, 0);
              const message = `*NEW ORDER - BAKEMART COFFEE HOUSE*\n----------------------------------\n*ORDER ITEMS:*\n${cartItems.map((ci, idx) => {
                const price = ci.selectedOption ? ci.selectedOption.price : ci.item.price;
                return `${idx + 1}. *${ci.item.name}* x${ci.quantity} - KSh ${(price * ci.quantity).toLocaleString()}`;
              }).join('\n')}\n----------------------------------\n*GRAND TOTAL:* KSh ${total.toLocaleString()}\n\n*Location:* BakeMart Coffee House, Tropical House, Watalii Rd, Nakuru City`;
              window.open(`https://wa.me/254725009708?text=${encodeURIComponent(message)}`, '_blank');
            }}
            className={`sticky-checkout-btn ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Send className="w-4 h-4" />
            <span>Checkout →</span>
          </button>
        </div>
      </div>
    </div>
    <FloatingContactButtons />
  </CartAnimationProvider>
);
}
