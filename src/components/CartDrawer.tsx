import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bike, Check, ChevronDown, Copy, MapPin, Minus, Phone, Plus, Send, ShoppingBag, Trash2, UtensilsCrossed, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { OrderTicket } from './OrderTicket';
import { generateSecureOrderId } from '../utils/ids';
import { supabase } from '../lib/supabase';
import { useScrollLock } from '../hooks/useScrollLock';
import { categoryIcon, formatKsh } from '../lib/menuMeta';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

const ORDER_TYPES = [
  { id: 'dine-in', label: 'Dine-in', icon: UtensilsCrossed },
  { id: 'takeaway', label: 'Takeaway', icon: ShoppingBag },
  { id: 'delivery', label: 'Delivery', icon: Bike },
] as const;

const fieldClass =
  'h-12 w-full rounded-xl border border-bm-line bg-white px-4 text-base text-bm-ink outline-none placeholder:text-bm-muted/70 focus:border-bm-ink';

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'delivery'>('dine-in');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [showTicket, setShowTicket] = useState(false);
  const [sentStatus, setSentStatus] = useState<'idle' | 'sent'>('idle');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  useScrollLock(isOpen);

  const handleCopy = async (value: string, field: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement('textarea');
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopiedField(field);
    setTimeout(() => setCopiedField((f) => (f === field ? null : f)), 1800);
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.selectedOption ? item.selectedOption.price : item.item.price;
    return acc + price * item.quantity;
  }, 0);

  const deliveryFee = orderType === 'delivery' ? 150 : 0;
  const grandTotal = subtotal + deliveryFee;
  const itemCount = cartItems.reduce((a, b) => a + b.quantity, 0);

  const handleCheckoutWhatsApp = () => {
    if (cartItems.length === 0) return;
    setSentStatus('idle');
    setShowTicket(true);
  };

  const confirmAndSendWhatsApp = async () => {
    setSentStatus('sent');
    setShowTicket(false);

    const orderId = generateSecureOrderId();

    try {
      const newOrder = {
        id: orderId,
        date: 'Just Now',
        status: 'In Kitchen',
        orderType: orderType,
        deliveryAddress: deliveryAddress || undefined,
        tableNumber: tableNumber ? `Table #${tableNumber}` : undefined,
        totalAmount: grandTotal,
        items: cartItems.map((ci) => ({
          itemId: ci.item.id,
          name: ci.item.name,
          price: ci.selectedOption ? ci.selectedOption.price : ci.item.price,
          quantity: ci.quantity,
          selectedOptionName: ci.selectedOption?.name,
          category: ci.item.category,
        })),
      };

      const existingStr = localStorage.getItem('bakemart_recent_orders');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      const updated = [newOrder, ...existing];
      localStorage.setItem('bakemart_recent_orders', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save recent order:', err);
    }

    // Save the order to Supabase so it shows up in the admin Orders tab and stats.
    // This runs alongside the WhatsApp message, not instead of it — if this fails,
    // the WhatsApp order still goes through below.
    if (supabase) {
      try {
        const { error } = await supabase.from('orders').insert([
          {
            id: orderId,
            date: new Date().toISOString(),
            status: 'pending',
            order_type: orderType,
            items: cartItems.map((ci) => ({
              name: ci.item.name,
              price: ci.selectedOption ? ci.selectedOption.price : ci.item.price,
              quantity: ci.quantity,
              selectedOptionName: ci.selectedOption?.name,
            })),
            total_amount: grandTotal,
            delivery_address: orderType === 'delivery' ? deliveryAddress || null : null,
            table_number: orderType === 'dine-in' ? tableNumber || null : null,
          },
        ]);

        if (error) {
          console.error('Failed to save order to Supabase:', error);
        }
      } catch (err) {
        console.error('Supabase order insert exception:', err);
      }
    }

    let orderDetails = `*NEW ORDER - BAKEMART COFFEE HOUSE*\n`;
    orderDetails += `----------------------------------\n`;
    orderDetails += `*Order Type:* ${orderType.toUpperCase()}\n`;
    if (customerName) orderDetails += `*Customer Name:* ${customerName}\n`;
    if (customerPhone) orderDetails += `*Phone Number:* ${customerPhone}\n`;

    if (orderType === 'dine-in' && tableNumber) {
      orderDetails += `*Table Number:* Table ${tableNumber}\n`;
    } else if (orderType === 'delivery' && deliveryAddress) {
      orderDetails += `*Delivery Address:* ${deliveryAddress} (Nakuru)\n`;
    }

    orderDetails += `----------------------------------\n`;
    orderDetails += `*ORDER ITEMS:*\n`;

    cartItems.forEach((ci, idx) => {
      const price = ci.selectedOption ? ci.selectedOption.price : ci.item.price;
      const optStr = ci.selectedOption ? ` (${ci.selectedOption.name})` : '';
      orderDetails += `${idx + 1}. *${ci.item.name}*${optStr} x${ci.quantity} - KSh ${(price * ci.quantity).toLocaleString()}\n`;
    });

    orderDetails += `----------------------------------\n`;
    orderDetails += `*Subtotal:* KSh ${subtotal.toLocaleString()}\n`;
    if (orderType === 'delivery') {
      orderDetails += `*Delivery Fee:* KSh ${deliveryFee}\n`;
    }
    orderDetails += `*GRAND TOTAL:* KSh ${grandTotal.toLocaleString()}\n`;

    if (orderNotes) {
      orderDetails += `*Special Notes:* ${orderNotes}\n`;
    }

    orderDetails += `\n*Location:* BakeMart Coffee House, Tropical House, Watalii Rd, Nakuru City`;

    const encoded = encodeURIComponent(orderDetails);
    window.open(`https://wa.me/254725009708?text=${encoded}`, '_blank');
  };

  const payRows = [
    { key: 'paybill', label: 'Paybill', value: '247247' },
    { key: 'account', label: 'Account', value: '0752114450' },
    { key: 'till', label: 'Till', value: '5170287' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[65]" role="dialog" aria-modal="true" aria-label="Your order">
          <motion.div
            className="absolute inset-0 bg-bm-ink/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-bm-cream text-bm-ink shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 36 }}
          >
            <div className="flex h-16 shrink-0 items-center justify-between bg-bm-ink px-5 text-white">
              <h2 className="flex items-baseline gap-2 font-display text-2xl uppercase text-white">
                Your order
                <span className="font-sans text-sm font-bold text-white/55">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </span>
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4 sm:p-5" data-lenis-prevent>
              {cartItems.length === 0 ? (
                <div className="px-4 py-16 text-center">
                  <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-bm-ink text-bm-orange">
                    <ShoppingBag className="h-9 w-9" />
                  </span>
                  <h3 className="mt-5 font-display text-3xl uppercase text-bm-ink">Your cart is empty</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm text-bm-muted">
                    Add coffee, pizzas, platters and more from the open-kitchen menu.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate('/menu');
                    }}
                    className="mt-6 rounded-full bg-bm-orange px-7 py-3.5 text-sm font-extrabold text-bm-ink hover:bg-bm-orange-hot"
                  >
                    Explore the menu
                  </button>
                </div>
              ) : (
                <>
                  <ul className="space-y-2.5">
                    {cartItems.map((ci) => {
                      const price = ci.selectedOption ? ci.selectedOption.price : ci.item.price;
                      const Icon = categoryIcon(ci.item.category);
                      return (
                        <li key={ci.id} className="flex items-center gap-3 rounded-2xl bg-white p-2.5 ring-1 ring-bm-line/70">
                          <span className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-bm-coal text-bm-orange">
                            <Icon className="h-6 w-6" />
                            {ci.item.image && (
                              <img
                                src={ci.item.image}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover"
                                onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                              />
                            )}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-extrabold">{ci.item.name}</p>
                            {ci.selectedOption && <p className="text-xs font-semibold text-bm-muted">{ci.selectedOption.name}</p>}
                            <p className="mt-0.5 font-display text-lg leading-none">{formatKsh(price * ci.quantity)}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1.5">
                            <div className="flex items-center rounded-full bg-bm-sand p-0.5">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(ci.id, -1)}
                                className="grid h-8 w-8 place-items-center rounded-full hover:bg-white"
                                aria-label={`Remove one ${ci.item.name}`}
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-6 text-center text-sm font-extrabold tabular-nums">{ci.quantity}</span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(ci.id, 1)}
                                className="grid h-8 w-8 place-items-center rounded-full bg-bm-ink text-white"
                                aria-label={`Add one ${ci.item.name}`}
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(ci.id)}
                              className="flex items-center gap-1 text-[11px] font-bold text-bm-muted hover:text-red-600"
                            >
                              <Trash2 className="h-3 w-3" />
                              Remove
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div>
                    <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.18em]">How are you eating?</p>
                    <div className="grid grid-cols-3 gap-2">
                      {ORDER_TYPES.map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setOrderType(id)}
                          aria-pressed={orderType === id}
                          className={`flex flex-col items-center gap-1 rounded-2xl border-2 py-3 text-xs font-extrabold ${
                            orderType === id ? 'border-bm-ink bg-bm-ink text-white' : 'border-bm-line bg-white hover:border-bm-ink'
                          }`}
                        >
                          <Icon className={`h-5 w-5 ${orderType === id ? 'text-bm-orange' : ''}`} />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="grid grid-cols-2 gap-2.5">
                      <input type="text" placeholder="Your name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className={fieldClass} />
                      <input type="tel" placeholder="Phone number" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className={fieldClass} />
                    </div>
                    {orderType === 'dine-in' && (
                      <input type="text" placeholder="Table number (optional)" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} className={fieldClass} />
                    )}
                    {orderType === 'delivery' && (
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-bm-muted" />
                        <input
                          type="text"
                          placeholder="Nakuru delivery address"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className={`${fieldClass} pl-10`}
                        />
                      </div>
                    )}
                    <input
                      type="text"
                      placeholder="Special instructions / allergies"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className={fieldClass}
                    />
                  </div>

                  <details className="group rounded-2xl bg-white ring-1 ring-bm-line/70">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-2 p-4 [&::-webkit-details-marker]:hidden">
                      <span className="flex items-center gap-2 text-sm font-extrabold">
                        <img src="/mpesa-logo.png" alt="M-Pesa" className="h-5 w-auto" />
                        Pay with M-Pesa
                      </span>
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="space-y-2 px-4 pb-4">
                      {payRows.map((row) => (
                        <div key={row.key} className="flex items-center justify-between gap-2 rounded-xl bg-bm-cream px-3 py-2.5">
                          <span>
                            <span className="block text-[10px] font-bold uppercase tracking-wider text-bm-muted">{row.label}</span>
                            <span className="font-mono text-base font-bold">{row.value}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(row.value, row.key)}
                            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase ${
                              copiedField === row.key ? 'bg-[#00A651] text-white' : 'bg-white ring-1 ring-bm-line hover:ring-bm-ink'
                            }`}
                          >
                            {copiedField === row.key ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            {copiedField === row.key ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      ))}
                      <p className="pt-1 text-xs text-bm-muted">
                        M-Pesa › Lipa na M-Pesa › <strong>Pay Bill</strong> or <strong>Buy Goods & Services</strong>
                      </p>
                      <a
                        href="tel:*334#"
                        className="flex items-center justify-center gap-2 rounded-full bg-[#00A651] py-3 text-xs font-extrabold uppercase tracking-wide text-white hover:bg-[#009245]"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        Dial *334# now
                      </a>
                    </div>
                  </details>
                </>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="shrink-0 space-y-3 border-t border-bm-line bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-5">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-bm-muted">
                    <span>Subtotal</span>
                    <span className="font-bold text-bm-ink">{formatKsh(subtotal)}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between text-bm-muted">
                      <span>Delivery (Nakuru town)</span>
                      <span className="font-bold text-bm-ink">{formatKsh(deliveryFee)}</span>
                    </div>
                  )}
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="font-extrabold">Total</span>
                    <span className="font-display text-3xl leading-none">{formatKsh(grandTotal)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCheckoutWhatsApp}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-bm-orange py-4 text-[15px] font-extrabold text-bm-ink transition-[background-color,transform] hover:bg-bm-orange-hot active:scale-[0.98]"
                >
                  <Send className="h-4 w-4" />
                  Review ticket & order
                </button>
              </div>
            )}
          </motion.aside>

          <OrderTicket
            isOpen={showTicket}
            onClose={() => {
              setShowTicket(false);
              setSentStatus('idle');
            }}
            cartItems={cartItems}
            orderType={orderType === 'dine-in' ? 'pickup' : 'delivery'}
            deliveryFee={deliveryFee}
            orderNotes={orderNotes}
            customerName={customerName}
            customerPhone={customerPhone}
            onConfirmSend={confirmAndSendWhatsApp}
            onCancelOrder={() => {
              setShowTicket(false);
              setSentStatus('idle');
              onClearCart();
            }}
            sentStatus={sentStatus}
          />
        </div>
      )}
    </AnimatePresence>
  );
};
