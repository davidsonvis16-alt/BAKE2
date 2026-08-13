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
import { useAuth } from './components/AuthContext';
import { useMenuData } from './hooks/useMenuData';
import { MenuItem, MenuItemOption, CartItem } from './types';
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
          <div style={{ paddingTop: '2rem', paddingBottom: '2rem', maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1rem', paddingRight: '1rem' }} className="menu-page-container">
            <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #EADECB' }} className="md:flex-row md:items-center md:justify-between">
              <div>
                 <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.1em', color: '#000000' }}>
                   FULL DIGITAL MENU
                 </span>
                 <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 900, fontSize: '1.5rem', color: '#000000', marginTop: '0.25rem' }} className="md:text-3xl">
                   Complete Food & Beverage Selection
                 </h1>
                 <p style={{ fontSize: '0.875rem', color: '#000000', marginTop: '0.25rem' }}>
                   Browse all specialty dishes, beverages, pastries, and house specials in one place.
                 </p>
              </div>

              <button
                onClick={() => navigate('/')}
                style={{ backgroundColor: '#FAF3E7', color: '#000000', fontSize: '0.75rem', fontWeight: 700, padding: '0.5rem 1rem', borderRadius: '9999px', border: '1px solid #D8C7B0', cursor: 'pointer', alignSelf: 'flex-start' }}
                className="md:self-auto hover-bg-eadecb"
              >
                ← Back to Home Page
              </button>
            </div>

            <MenuSection
              searchQuery={searchQuery}
              selectedCategory={selectedCategory === 'pizza-pasta' && activePage === 'menu' ? 'all' : selectedCategory}
              onSelectCategory={handleSelectCategory}
              wishlistIds={wishlistIds}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
            />
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
            <ReservationSection />
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
    </CartAnimationProvider>
  );
}
