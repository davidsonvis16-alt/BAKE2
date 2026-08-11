import React, { useState, useEffect } from 'react';
import { Send, Printer, X, Utensils } from 'lucide-react';
import { MenuItem, MenuItemOption, CartItem } from '../types';
import { generateSecureOrderId } from '../utils/ids';

interface OrderTicketProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  orderType: 'pickup' | 'delivery';
  deliveryFee: number;
  orderNotes: string;
  customerName: string;
  customerPhone: string;
  onConfirmSend?: () => void;
  onCancelOrder?: () => void;
  sentStatus?: 'idle' | 'sent';
}

const generateOrderId = () => {
  return generateSecureOrderId();
};

export const OrderTicket: React.FC<OrderTicketProps> = ({
  isOpen,
  onClose,
  cartItems,
  orderType,
  deliveryFee,
  orderNotes,
  customerName,
  customerPhone,
  onConfirmSend,
  onCancelOrder,
  sentStatus = 'idle',
}) => {
  const [orderId, setOrderId] = useState('');
  const [orderTime, setOrderTime] = useState('');

  useEffect(() => {
    if (isOpen) {
      setOrderId(generateOrderId());
      setOrderTime(new Date().toLocaleString('en-KE', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Africa/Nairobi',
      }));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, ci) => {
    const price = ci.selectedOption ? ci.selectedOption.price : ci.item.price;
    return sum + price * ci.quantity;
  }, 0);
  const grandTotal = subtotal + (orderType === 'delivery' ? deliveryFee : 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="order-ticket-root" className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full max-h-[90vh] overflow-y-auto">
        {/* Ticket Header */}
        <div className="bg-[#000000] text-white p-5 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#d97a4c] shrink-0">
              <img src="/logo.jpeg" alt="BakeMart Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg leading-tight tracking-tight">Order Ticket</h2>
              <p className="text-[11px] text-[#d97a4c] font-mono leading-tight mt-0.5">{orderId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#d97a4c] hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ticket Body */}
        <div className="p-5 space-y-5">
          {/* Store Info */}
          <div className="text-center space-y-1 pb-4 border-b-2 border-[#e6d3c2]">
            <h3 className="font-serif font-bold text-base text-[#000000] tracking-tight">BakeMart Coffee House</h3>
            <p className="text-[11px] text-[#5c4b3f]">Tropical House, Moi Road, Nakuru</p>
            <p className="text-[11px] text-[#5c4b3f]">Tel: 0725 009708</p>
            <p className="text-[11px] text-[#5c4b3f]">{orderTime}</p>
          </div>

          {/* Order Type & Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                orderType === 'delivery' ? 'bg-blue-50 text-blue-700' : 'bg-[#f8f1e5] text-[#000000]'
              }`}>
                {orderType === 'delivery' ? 'Delivery' : 'Pickup'}
              </span>
              {sentStatus === 'sent' && (
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#000000] text-white flex items-center gap-1.5">
                  Sent
                </span>
              )}
            </div>
            <span className="text-[11px] font-bold text-[#8c7a6c] font-mono">#{orderId.split('-').pop()}</span>
          </div>

          {/* Customer Info */}
          {(customerName || customerPhone) && (
            <div className="bg-[#fdfaf3] rounded-xl p-3 space-y-1.5 border border-[#e6d3c2]">
              {customerName && (
                <p className="text-[11px] text-[#000000]">
                  <span className="font-bold">Customer:</span> {customerName}
                </p>
              )}
              {customerPhone && (
                <p className="text-[11px] text-[#000000]">
                  <span className="font-bold">Phone:</span> {customerPhone}
                </p>
              )}
            </div>
          )}

          {/* Items */}
          <div className="space-y-3">
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-[#8c7a6c] pb-2 border-b border-[#e6d3c2]">
              <span>Item</span>
              <span className="text-right">Qty / Total</span>
            </div>
            {cartItems.map((ci) => {
              const price = ci.selectedOption ? ci.selectedOption.price : ci.item.price;
              const itemTotal = price * ci.quantity;
              return (
                <div key={ci.id} className="flex items-center gap-3">
                  {ci.item.image && (
                    <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#f8f1e5] shrink-0">
                      <img
                        src={ci.item.image}
                        alt={ci.item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#000000] truncate">{ci.item.name}</p>
                    {ci.selectedOption && (
                      <p className="text-[11px] text-[#8c7a6c]">{ci.selectedOption.name}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm text-[#000000] font-mono font-medium">x{ci.quantity}</span>
                    <span className="text-sm font-bold text-[#000000] font-mono w-20 text-right">
                      KSh {itemTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Totals */}
          <div className="border-t-2 border-[#e6d3c2] pt-4 space-y-2">
            <div className="flex justify-between text-sm text-[#000000]">
              <span>Subtotal</span>
              <span className="font-mono font-bold">KSh {subtotal.toLocaleString()}</span>
            </div>
            {orderType === 'delivery' && (
              <div className="flex justify-between text-sm text-[#000000]">
                <span>Delivery Fee</span>
                <span className="font-mono font-bold">KSh {deliveryFee.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-[#000000] pt-2 border-t border-[#e6d3c2]">
              <span>TOTAL</span>
              <span className="font-mono text-lg">KSh {grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Notes */}
          {orderNotes && (
            <div className="bg-[#fdfaf3] rounded-xl p-3 border border-[#e6d3c2]">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#8c7a6c] mb-1">Notes</p>
              <p className="text-sm text-[#000000]">{orderNotes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="text-center pt-4 border-t border-[#e6d3c2] space-y-1.5">
            <p className="text-[11px] text-[#5c4b3f]">Thank you for your order!</p>
            <p className="text-[11px] text-[#8c7a6c]">Present this ticket at pickup or keep for reference</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5 pt-2">
            {onConfirmSend && (
              <button
                onClick={onConfirmSend}
                className="w-full bg-[#000000] hover:bg-[#000000] text-white text-sm font-bold py-3 rounded-full transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#d97a4c]" />
                Confirm & Send to WhatsApp
              </button>
            )}
            {onCancelOrder && (
              <button
                onClick={onCancelOrder}
                className="w-full bg-white hover:bg-red-50 text-red-600 border-2 border-red-200 text-sm font-bold py-3 rounded-full transition-all flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel Order
              </button>
            )}
            <div className="flex gap-2.5">
              <button
                onClick={handlePrint}
                className="flex-1 bg-[#000000] hover:bg-[#000000] text-white text-sm font-bold py-3 rounded-full transition-all flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-white hover:bg-[#f8f1e5] text-[#000000] border-2 border-[#e6d3c2] text-sm font-bold py-3 rounded-full transition-all"
              >
                Close
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #order-ticket-root, #order-ticket-root * { visibility: visible; }
          #order-ticket-root {
            position: absolute;
            inset: 0;
            background: white !important;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
          }
          #order-ticket-root > div {
            box-shadow: none !important;
            max-width: 320px;
            border-radius: 0;
          }
          #order-ticket-root button { display: none !important; }
          #order-ticket-root .bg-black\\/70 { background: white !important; }
        }
      `}</style>
    </div>
  );
};
