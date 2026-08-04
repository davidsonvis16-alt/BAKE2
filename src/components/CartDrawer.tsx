import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MapPin, Send, Coffee } from 'lucide-react';
import { CartItem } from '../types';

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

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.selectedOption ? item.selectedOption.price : item.item.price;
    return acc + price * item.quantity;
  }, 0);

  const deliveryFee = orderType === 'delivery' ? 150 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckoutWhatsApp = () => {
    if (cartItems.length === 0) return;

    // Save order to local storage for Recent Orders profile view
    try {
      const newOrder = {
        id: `BM-${Math.floor(1000 + Math.random() * 9000)}`,
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
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity drawer-overlay"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-full max-w-md h-full bg-[#FAF3E7] text-[#000000] shadow-2xl flex flex-col justify-between border-l border-[#EADECB] drawer-content">
          
          {/* Header */}
          <div className="p-4 bg-[#000000] text-white flex items-center justify-between border-b border-neutral-700/40 safe-top">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-500" />
              <h2 className="font-display font-bold text-base text-[#FAF3E7]">
                Your BakeMart Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-orange-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Coffee className="w-12 h-12 text-[#000000] mx-auto opacity-40" />
                <h3 className="font-display font-bold text-lg text-[#000000]">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#000000] max-w-xs mx-auto">
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
                        className="bg-white p-3 rounded-xl border border-[#EADECB] shadow-2xs flex items-center justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-bold text-xs sm:text-sm text-[#000000] truncate">
                            {ci.item.name}
                          </h4>
                          {ci.selectedOption && (
                            <span className="text-[10px] font-semibold text-[#000000] bg-orange-50 px-1.5 py-0.2 rounded-sm inline-block mt-0.5">
                              {ci.selectedOption.name}
                            </span>
                          )}
                          <p className="font-mono font-bold text-xs text-[#000000] mt-1">
                            KSh {(price * ci.quantity).toLocaleString()}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-[#FAF3E7] p-1 rounded-lg border border-[#EADECB]">
                          <button
                            onClick={() => onUpdateQuantity(ci.id, -1)}
                            className="p-1 rounded-md text-[#000000] hover:bg-[#EADECB] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono font-bold text-xs text-[#000000] w-4 text-center">
                            {ci.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(ci.id, 1)}
                            className="p-1 rounded-md text-[#000000] hover:bg-[#EADECB] transition-colors"
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
                <div className="pt-3 border-t border-[#EADECB]">
                  <label className="block text-xs font-bold text-[#000000] mb-1.5">
                    Order Type
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 bg-[#EADECB] p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setOrderType('dine-in')}
                      className={`text-xs font-bold py-1.5 rounded-lg transition-all ${
                        orderType === 'dine-in'
                          ? 'bg-[#000000] text-white shadow-xs'
                          : 'text-[#000000] hover:bg-[#FAF3E7]'
                      }`}
                    >
                      Dine-in
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('takeaway')}
                      className={`text-xs font-bold py-1.5 rounded-lg transition-all ${
                        orderType === 'takeaway'
                          ? 'bg-[#000000] text-white shadow-xs'
                          : 'text-[#000000] hover:bg-[#FAF3E7]'
                      }`}
                    >
                      Takeaway
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`text-xs font-bold py-1.5 rounded-lg transition-all ${
                        orderType === 'delivery'
                          ? 'bg-[#000000] text-white shadow-xs'
                          : 'text-[#000000] hover:bg-[#FAF3E7]'
                      }`}
                    >
                      Delivery
                    </button>
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
                      className="w-full bg-white border border-[#D8C7B0] focus:border-[#000000] text-xs text-[#000000] rounded-xl px-3 py-2 outline-hidden"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-white border border-[#D8C7B0] focus:border-[#000000] text-xs text-[#000000] rounded-xl px-3 py-2 outline-hidden"
                    />
                  </div>

                  {orderType === 'dine-in' && (
                    <input
                      type="text"
                      placeholder="Table Number (Optional)"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full bg-white border border-[#D8C7B0] focus:border-[#000000] text-xs text-[#000000] rounded-xl px-3 py-2 outline-hidden"
                    />
                  )}

                  {orderType === 'delivery' && (
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#000000]" />
                      <input
                        type="text"
                        placeholder="Nakuru Delivery Address"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full bg-white border border-[#D8C7B0] focus:border-[#000000] text-xs text-[#000000] rounded-xl pl-8 pr-3 py-2 outline-hidden"
                      />
                    </div>
                  )}

                  <input
                    type="text"
                    placeholder="Special Instructions / Allergies..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full bg-white border border-[#D8C7B0] focus:border-[#000000] text-xs text-[#000000] rounded-xl px-3 py-2 outline-hidden"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer Totals & WhatsApp Button */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-white border-t border-[#EADECB] space-y-3 safe-bottom">
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
                <div className="flex justify-between text-[#000000] font-bold text-sm pt-1 border-t border-[#F0E5D5]">
                  <span>Total Amount</span>
                  <span className="font-mono text-[#000000] text-base">
                    KSh {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full bg-[#000000] hover:bg-[#000000] text-white font-bold text-sm py-3 rounded-full shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Order to WhatsApp (0725 009708)</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
