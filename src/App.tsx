import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryQuickNav } from './components/CategoryQuickNav';
import { PromoBanner } from './components/PromoBanner';
import { ComboGrid } from './components/ComboGrid';
import { MenuSection } from './components/MenuSection';
import { CategoryUnfoldView } from './components/CategoryUnfoldView';
import { ReservationSection } from './components/ReservationSection';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { FeatureCards } from './components/FeatureCards';
import { useAuth } from './components/AuthContext';
import { CATEGORIES } from './data/menuData';
import { useMenuData } from './hooks/useMenuData';
import { MenuItem, MenuItemOption, CartItem } from './types';
import { ShoppingBag, Send, Search, X } from 'lucide-react';
import { PopularItemsPopup } from './components/PopularItemsPopup';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, loading, isAdmin } = useAuth();
  const { menuItems } = useMenuData();
  const [searchQuery, setSearchQuery] = useState('');

  const path = location.pathname;
  const activePage = useMemo<'home' | 'menu' | 'category' | 'reservation' | 'admin' | 'gallery' | 'about' | 'faq'>(() => {
    if (path === '/menu') return 'menu';
    if (path.startsWith('/category/')) return 'category';
    if (path === '/reservation') return 'reservation';
    if (path === '/admin') return 'admin';
    if (path === '/gallery') return 'gallery';
    if (path === '/about') return 'about';
    if (path === '/faq') return 'faq';
    return 'home';
  }, [path]);

  const selectedCategory = useMemo(() => {
    const match = path.match(/^\/category\/(.+)$/);
    return match ? match[1] : 'pizza-pasta';
  }, [path]);

  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bakemart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
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
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [showPopularPopup, setShowPopularPopup] = useState(false);
  const [cartButtonPosition, setCartButtonPosition] = useState<{ x: number; y: number } | null>(null);
  const handleCartButtonRef = useCallback((rect: DOMRect | null) => {
    setCartButtonPosition(rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : null);
  }, []);

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

  // Page transition loading
  const [prevPath, setPrevPath] = useState(path);
  useEffect(() => {
    if (path !== prevPath) {
      setIsPageLoading(true);
      const timer = setTimeout(() => {
        setIsPageLoading(false);
        setPrevPath(path);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [path, prevPath]);

  // Handle category selection - triggers unfolding category page
  const handleSelectCategory = (catId: string) => {
    navigate(`/category/${catId}`);
  };

  // Add item to cart
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

  // Add item by ID helper
  const handleAddToCartById = (itemId: string) => {
    const item = menuItems.find((i) => i.id === itemId);
    if (item) {
      handleAddToCart(item);
      setIsCartOpen(true);
    }
  };

  // Update quantity in cart
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

  // Remove item from cart
  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Toggle wishlist
  const handleToggleWishlist = (item: MenuItem) => {
    setWishlistIds((prev) =>
      prev.includes(item.id)
        ? prev.filter((id) => id !== item.id)
        : [...prev, item.id]
    );
  };

  // Scroll or navigate to reservation
  const handleOpenReservation = () => {
    navigate('/reservation');
  };

  const wishlistItems = menuItems.filter((i) => wishlistIds.includes(i.id));
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Admin route protection
  if (path === '/admin') {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF3E7]">
          <p className="text-[#000000]">Loading...</p>
        </div>
      );
    }
    if (!session || !isAdmin) {
      return <Login />;
    }
    return (
      <div className="min-h-screen bg-[#FAF3E7] flex flex-col">
        <AdminDashboard onCloseAdmin={() => navigate('/')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF3E7] text-[#000000] flex flex-col font-sans selection:bg-black selection:text-white pb-0 lg:pb-0 overflow-x-hidden">
      
      {/* Page Transition Loading Overlay */}
      {isPageLoading && (
        <div className="fixed inset-0 z-50 bg-[#FAF3E7] flex items-center justify-center page-transition-overlay">
          <img src="/logo.jpeg" alt="BakeMart" className="w-20 h-20 rounded-full border-2 border-[#000000] object-cover logo-img" />
        </div>
      )}

      {/* Navbar */}
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
        onCartButtonRef={handleCartButtonRef}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {activePage === 'category' ? (
          /* DEDICATED CATEGORY UNFOLD VIEW PAGE */
          <CategoryUnfoldView
            categoryId={selectedCategory}
            onSelectCategory={handleSelectCategory}
            onBackToHome={() => navigate('/')}
            wishlistIds={wishlistIds}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
          />
        ) : activePage === 'menu' ? (
          /* DEDICATED FULL MENU PAGE */
          <div className="py-8 max-w-7xl mx-auto px-4">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EADECB] shadow-xs">
              <div>
                 <span className="text-xs uppercase font-extrabold tracking-widest text-[#000000]">
                  FULL DIGITAL MENU
                </span>
                <h1 className="font-serif font-black text-2xl md:text-3xl text-[#000000] mt-1">
                  Complete Food & Beverage Selection
                </h1>
                <p className="text-xs sm:text-sm text-[#000000] mt-1">
                  Browse all specialty dishes, beverages, pastries, and house specials in one place.
                </p>
              </div>

              <button
                onClick={() => navigate('/')}
                className="self-start md:self-auto bg-[#FAF3E7] hover:bg-[#EADECB] text-[#000000] text-xs font-bold px-4 py-2 rounded-full border border-[#D8C7B0] transition-colors"
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
          /* DEDICATED RESERVATION PAGE */
          <div className="py-8 max-w-7xl mx-auto px-4">
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => navigate('/')}
                className="bg-white hover:bg-[#FAF3E7] text-[#000000] text-xs font-bold px-4 py-2 rounded-full border border-[#EADECB] shadow-xs transition-colors"
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
        ) : (
           /* MAIN HOME VIEW HUB PAGE */
           <div>
             {/* Hero Section */}
             <Hero
               onScrollToMenu={() => navigate('/menu')}
             />

             {/* Homepage Search Bar */}
             <section className="max-w-7xl mx-auto px-4 -mt-4 mb-8">
               <div className="bg-white rounded-2xl p-2 border border-[#EADECB] shadow-sm">
                 <div className="relative">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#000000]/50" />
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
                     className="w-full bg-[#FAF3E7] border border-[#E1D4C0] focus:border-[#000000] text-sm text-[#000000] placeholder-[#000000]/60 rounded-xl pl-12 pr-10 py-3.5 outline-none transition-colors"
                   />
                   {searchQuery && (
                     <button
                       onClick={() => setSearchQuery('')}
                       className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#EADECB] hover:bg-[#D8C7B0] text-[#000000] transition-colors"
                     >
                       <X className="w-3.5 h-3.5" />
                     </button>
                   )}
                 </div>
               </div>
             </section>

             {/* Feature Cards */}
             <FeatureCards onNavigateReservation={handleOpenReservation} />

            {/* Category Quick Nav Hub - 1 card per category with representative image */}
            <CategoryQuickNav
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />

            {/* BBQ Promo Banner */}
            <PromoBanner
              onAddToCart={handleAddToCartById}
              onScrollToMenu={() => handleSelectCategory('bbq-platters')}
            />

            {/* Combos Grid */}
            <ComboGrid onAddToCart={handleAddToCartById} />

            {/* Full Menu Page Callout Banner */}
            <section className="max-w-7xl mx-auto px-4 py-8">
              <div className="bg-[#000000] text-[#FAF3E7] p-8 rounded-3xl border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
                <div className="space-y-2 text-center md:text-left">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-orange-400">
                    COMPLETE LISTINGS
                  </span>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl">
                    Prefer to view our full menu on a single page?
                  </h3>
                  <p className="text-xs sm:text-sm text-orange-300/80 max-w-xl">
                    Explore all 12 food categories with live instant search, dietary tags, portion selection, and clean list layouts.
                  </p>
                </div>

                <button
                  onClick={() => navigate('/menu')}
                  className="bg-black hover:bg-neutral-800 text-white font-bold text-sm px-6 py-3 rounded-full transition-colors shrink-0 shadow-sm"
                >
                  Open Full Menu Page →
                </button>
              </div>
            </section>

            {/* Table Reservation Section Teaser */}
            <ReservationSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Popular Items Popup for all visitors */}
      <PopularItemsPopup
        onClose={() => setShowPopularPopup(false)}
        onAddToCart={handleAddToCart}
        cartButtonPosition={cartButtonPosition}
      />

      {/* Sticky Bottom Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EADECB] shadow-lg md:hidden safe-bottom">
        <div className="flex items-center justify-between gap-2 px-4 py-2.5">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1.5 bg-[#000000] text-white px-3 py-2 rounded-full font-bold text-xs shadow-md flex-1 justify-center"
          >
            <ShoppingBag className="w-4 h-4 text-orange-300" />
            <span>View Cart ({totalCartCount})</span>
          </button>
          <button
            onClick={() => navigate('/reservation')}
            className="flex items-center justify-center bg-[#FAF3E7] hover:bg-[#EADECB] text-[#000000] border border-[#D8C7B0] px-3 py-2 rounded-full shadow-xs"
            title="Reserve a Table"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18" />
              <path d="M7 16h4" />
              <path d="M7 11h10" />
              <path d="M17 3v6" />
              <path d="M17 11v6" />
              <path d="M21 16v4" />
            </svg>
          </button>
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
            className={`font-bold text-sm py-2 px-4 rounded-full shadow-md flex items-center gap-2 ${cartItems.length > 0 ? 'bg-[#000000] hover:bg-[#000000] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            <Send className="w-4 h-4" />
            <span>Checkout</span>
          </button>
        </div>
      </div>

      {/* Sticky Bottom Nav for Mobile */}
    </div>
  );
}