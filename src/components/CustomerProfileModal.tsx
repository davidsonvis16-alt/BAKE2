import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, LogOut, Save, Ticket, Heart } from 'lucide-react';
import { useAuth } from './AuthContext';

interface CustomerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerProfileModal: React.FC<CustomerProfileModalProps> = ({ isOpen, onClose }) => {
  const { session, logout, updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen && session?.user) {
      setName(session.user.user_metadata?.name || session.user.email?.split('@')[0] || '');
      setPhone(session.user.user_metadata?.phone || '');
      setMessage('');
    }
  }, [isOpen, session]);

  if (!isOpen || !session) return null;

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    const { error } = await updateProfile({ name, phone });
    setSaving(false);
    if (error) {
      setMessage('Failed to update profile');
    } else {
      setMessage('Profile updated');
    }
  };

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-[#000000]/40 hover:text-[#000000] hover:bg-[#FAF3E7] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-[#000000] flex items-center justify-center mx-auto mb-3">
            <User className="w-7 h-7 text-orange-300" />
          </div>
          <h2 className="font-display font-bold text-xl text-[#000000]">My Profile</h2>
          <p className="text-xs text-[#000000]/60 mt-1">Manage your account</p>
        </div>

        {message && (
          <div className={`text-sm px-3 py-2 rounded-lg ${message.includes('Failed') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {message}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#000000] mb-1.5 uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5 inline mr-1.5" />
              Email
            </label>
            <input
              type="email"
              value={session.user?.email || ''}
              disabled
              className="w-full bg-[#FAF3E7] border border-[#EADECB] rounded-xl px-4 py-2.5 text-sm text-[#000000]/60 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#000000] mb-1.5 uppercase tracking-wider">
              <User className="w-3.5 h-3.5 inline mr-1.5" />
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[#000000]/20 rounded-xl px-4 py-2.5 text-sm text-[#000000] placeholder-[#000000]/40 focus:outline-none focus:ring-2 focus:ring-[#000000] transition-all"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#000000] mb-1.5 uppercase tracking-wider">
              <Phone className="w-3.5 h-3.5 inline mr-1.5" />
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-[#000000]/20 rounded-xl px-4 py-2.5 text-sm text-[#000000] placeholder-[#000000]/40 focus:outline-none focus:ring-2 focus:ring-[#000000] transition-all"
              placeholder="07XX XXX XXX"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-[#000000] hover:bg-neutral-800 text-white font-bold text-sm py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Profile'}
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-white hover:bg-red-50 text-red-600 border-2 border-red-200 hover:border-red-300 font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <p className="text-[10px] text-[#000000]/40 text-center">
          Your orders and wishlist are saved to this account
        </p>
      </div>
    </div>
  );
};
