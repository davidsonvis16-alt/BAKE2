import React, { useState } from 'react';
import { X, Trash2, Plus, ShoppingBag, MapPin, Send, Minus } from 'lucide-react';
import { CartItem } from '../types';
import { OrderTicket } from './OrderTicket';
import { generateSecureOrderId } from '../utils/ids';
import { supabase } from '../lib/supabase';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'delivery'>('dine-in');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [showTicket, setShowTicket] = useState(false);
  const [sentStatus, setSentStatus] = useState<'idle' | 'sent'>('idle');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.selectedOption ? item.selectedOption.price : item.item.price;
    return acc + price * item.quantity;
  }, 0);

  const deliveryFee = orderType === 'delivery' ? 150 : 0;
  const grandTotal = subtotal + deliveryFee;

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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 transition-opacity drawer-overlay"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-full max-w-md h-full bg-[#fdfaf3] text-[#000000] shadow-2xl flex flex-col border-l border-[#e6d3c2] drawer-content">

          {/* Header */}
          <div className="p-4 bg-white border-b border-[#e6d3c2] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#d97a4c]" />
              <h2 className="font-serif font-bold text-base text-[#000000]">
                Your Order ({cartItems.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#8c7a6c] hover:text-[#000000] hover:bg-[#f8f1e5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#8c7a6c] mx-auto" />
                <h3 className="font-serif font-bold text-lg text-[#000000]">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#5c4b3f] max-w-xs mx-auto">
                  Explore our open-kitchen menu and add your favorite coffee, pizzas, or barbecue platters.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-[#000000] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#000000] transition-colors"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="space-y-3">
                  {cartItems.map((ci) => {
                    const price = ci.selectedOption ? ci.selectedOption.price : ci.item.price;
                    return (
                      <div
                        key={ci.id}
                        className="bg-white p-3 rounded-xl border border-[#e6d3c2] flex items-center gap-3"
                      >
                        {/* Item Image Thumbnail */}
                        {ci.item.image && (
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#f8f1e5] shrink-0 flex items-center justify-center">
                            <img
                              src={ci.item.image}
                              alt={ci.item.name}
                              className="max-w-[80%] max-h-[80%] object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-bold text-xs sm:text-sm text-[#000000] truncate">
                            {ci.item.name}
                          </h4>
                          {ci.selectedOption && (
                            <span className="text-[10px] font-semibold text-[#8c7a6c] bg-[#f8f1e5] px-1.5 py-0.2 rounded-sm inline-block mt-0.5">
                              {ci.selectedOption.name}
                            </span>
                          )}
                          <p className="font-mono font-bold text-xs text-[#000000] mt-1">
                            KSh {(price * ci.quantity).toLocaleString()}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-[#fdfaf3] p-1 rounded-lg border border-[#e6d3c2]">
                          <button
                            onClick={() => onUpdateQuantity(ci.id, -1)}
                            className="p-1 rounded-md text-[#000000] hover:bg-[#f8f1e5] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono font-bold text-xs text-[#000000] w-4 text-center">
                            {ci.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(ci.id, 1)}
                            className="p-1 rounded-md text-[#000000] hover:bg-[#f8f1e5] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(ci.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Order Type Selector */}
                <div className="pt-3 border-t border-[#e6d3c2]">
                  <label className="block text-xs font-bold text-[#000000] mb-1.5">
                    Order Type
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 bg-[#f8f1e5] p-1 rounded-xl">
                    {(['dine-in', 'takeaway', 'delivery'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setOrderType(type)}
                        className={`text-[11px] font-bold py-1.5 rounded-lg transition-all capitalize ${
                          orderType === type
                            ? 'bg-[#000000] text-white shadow-sm'
                            : 'text-[#000000] hover:bg-white'
                        }`}
                      >
                        {type === 'dine-in' ? 'Dine-in' : type === 'takeaway' ? 'Takeaway' : 'Delivery'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-2.5 pt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-white border border-[#e6d3c2] focus:border-[#000000] text-xs text-[#000000] rounded-xl px-3 py-2.5 outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-white border border-[#e6d3c2] focus:border-[#000000] text-xs text-[#000000] rounded-xl px-3 py-2.5 outline-none"
                    />
                  </div>

                  {orderType === 'dine-in' && (
                    <input
                      type="text"
                      placeholder="Table Number (Optional)"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full bg-white border border-[#e6d3c2] focus:border-[#000000] text-xs text-[#000000] rounded-xl px-3 py-2.5 outline-none"
                    />
                  )}

                  {orderType === 'delivery' && (
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8c7a6c]" />
                      <input
                        type="text"
                        placeholder="Nakuru Delivery Address"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full bg-white border border-[#e6d3c2] focus:border-[#000000] text-xs text-[#000000] rounded-xl pl-8 pr-3 py-2.5 outline-none"
                      />
                    </div>
                  )}

                  <input
                    type="text"
                    placeholder="Special Instructions / Allergies..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full bg-white border border-[#e6d3c2] focus:border-[#000000] text-xs text-[#000000] rounded-xl px-3 py-2.5 outline-none"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer Totals & WhatsApp Button */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-white border-t border-[#e6d3c2] space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[#000000]">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold">KSh {subtotal.toLocaleString()}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-[#000000]">
                    <span>Delivery Fee (Nakuru Town)</span>
                    <span className="font-mono font-bold">KSh {deliveryFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#000000] font-bold text-sm pt-1 border-t border-[#f3e8d8]">
                  <span>Total Amount</span>
                  <span className="font-mono text-[#000000] text-base">
                    KSh {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full bg-[#000000] hover:bg-[#000000] text-white font-bold text-sm py-3 rounded-full transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#d97a4c]" />
                <span>Review Ticket & Order</span>
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Order Ticket Modal */}
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
  );
};