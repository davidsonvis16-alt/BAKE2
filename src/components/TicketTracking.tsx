import React, { useState, useEffect, useMemo } from 'react';
import { Search, Ticket, Calendar, Clock, MapPin, User, Phone, X, ChevronRight } from 'lucide-react';
import { PastOrder } from '../types';

interface TicketTrackingProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TicketTracking: React.FC<TicketTrackingProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<PastOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => {
        try {
          const stored = localStorage.getItem('bakemart_recent_orders');
          setOrders(stored ? JSON.parse(stored) : []);
        } catch {
          setOrders([]);
        }
        setLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const filteredOrders = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return orders.filter((o) =>
      o.id.toLowerCase().includes(q) ||
      o.items.some((item) => item.name.toLowerCase().includes(q))
    );
  }, [orders, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col animate-in">
        {/* Header */}
        <div className="p-5 border-b border-[#EADECB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#000000] flex items-center justify-center">
              <Ticket className="w-5 h-5 text-orange-300" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-[#000000] leading-tight">Ticket Tracking</h2>
              <p className="text-[10px] text-[#000000]/50">Search your order history</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#000000]/40 hover:text-[#000000] hover:bg-[#FAF3E7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-[#EADECB]">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#000000]/40" />
            <input
              type="text"
              placeholder="Search by order ID or item name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF3E7] border border-[#EADECB] focus:border-[#000000] text-sm text-[#000000] placeholder-[#000000]/40 rounded-xl pl-9 pr-4 py-2.5 outline-none transition-colors"
              autoFocus
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-[#FAF3E7] rounded-xl p-4 space-y-2 animate-pulse">
                  <div className="h-4 bg-[#E6D8C5] rounded w-1/3" />
                  <div className="h-3 bg-[#E6D8C5] rounded w-2/3" />
                  <div className="h-3 bg-[#E6D8C5] rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : !searchQuery.trim() ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#FAF3E7] flex items-center justify-center mx-auto">
                <Search className="w-6 h-6 text-[#000000]/30" />
              </div>
              <h3 className="font-display font-bold text-sm text-[#000000]">Start typing to search</h3>
              <p className="text-xs text-[#000000]/50 max-w-[200px] mx-auto">
                Enter an order ID or item name to find your past orders
              </p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#FAF3E7] flex items-center justify-center mx-auto">
                <Ticket className="w-6 h-6 text-[#000000]/30" />
              </div>
              <h3 className="font-display font-bold text-sm text-[#000000]">No tickets found</h3>
              <p className="text-xs text-[#000000]/50 max-w-[200px] mx-auto">
                We couldn't find any orders matching "{searchQuery}"
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-[#EADECB] rounded-xl p-4 shadow-2xs hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#000000] text-white px-2 py-0.5 rounded-full">
                        {order.status}
                      </span>
                      <span className="text-[10px] font-mono text-[#000000]/50">#{order.id.split('-').pop()}</span>
                    </div>
                    <span className="text-[10px] text-[#000000]/40 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {order.date}
                    </span>
                  </div>

                  <div className="space-y-1.5 mb-3">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-[#000000] truncate flex-1">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-mono text-[#000000]/60 ml-2">
                          KSh {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-[10px] text-[#000000]/40">+{order.items.length - 3} more items</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#F3E8D8]">
                    <div className="flex items-center gap-3 text-[10px] text-[#000000]/50">
                      {order.tableNumber && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {order.tableNumber}
                        </span>
                      )}
                      {order.deliveryAddress && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Delivery
                        </span>
                      )}
                    </div>
                    <span className="font-mono font-bold text-sm text-[#000000]">
                      KSh {order.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
